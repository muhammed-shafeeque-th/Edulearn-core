import Redis, { ChainableCommander } from "ioredis";
import { ICacheService } from "./cache.interface";
import { RedisConfig } from "./redis.config";

export class RedisClient implements ICacheService {
  private readonly client: Redis;

  constructor(config: RedisConfig) {
    const { port, host, ...redisOptions } = config;
    this.client = new Redis(port, host, {
      ...redisOptions,
      enableOfflineQueue: false,
      retryStrategy: (retries: number) => {
        if (retries > 5) return null;
        return Math.max(retries * 100, 3000);
      },
    });

    this.setupEventListeners();
  }

  private setupEventListeners(): void {
    this.client.on("error", (err) => {
      console.error("Redis Client Error:", err);
    });

    this.client.on("connect", () => {
      console.info(
        `Redis connected to ${this.client.options.host}:${this.client.options.port}`,
      );
    });

    this.client.on("ready", () => {
      console.info("Redis is ready");
    });
  }

  getClient(): Redis {
    return this.client;
  }

  async connect(): Promise<void> {
    if (this.client.status !== "ready") {
      await this.client.connect();
    }
  }

  async disconnect(): Promise<void> {
    if (this.client.status !== "end") {
      await this.client.quit();
    }
  }

  async ping(): Promise<number> {
    const start = Date.now();
    await this.client.ping();
    return Date.now() - start;
  }

  async get<T>(key: string): Promise<T | null> {
    const value = await this.client.get(key);
    if (!value) return null;

    try {
      return JSON.parse(value) as T;
    } catch {
      return null;
    }
  }

  async set<T>(key: string, value: T, ttl?: number): Promise<void> {
    const stringValue =
      typeof value === "string" ? value : JSON.stringify(value);

    if (ttl !== undefined) {
      await this.client.setex(key, ttl, stringValue);
    } else {
      await this.client.set(key, stringValue);
    }
  }

  async delete(key: string): Promise<void> {
    await this.client.del(key);
  }

  async exists(key: string): Promise<boolean> {
    const result = await this.client.exists(key);
    return !!result;
  }

  async getMultiple<T>(keys: string[]): Promise<(T | null)[]> {
    if (keys.length === 0) return [];
    const values = await this.client.mget(keys);
    return values.map((val) => {
      if (!val) return null;
      try {
        return JSON.parse(val) as T;
      } catch {
        return null;
      }
    });
  }

  async setMultiple<T>(
    entries: { key: string; value: T }[],
    ttl?: number,
  ): Promise<void> {
    if (!entries?.length) return;

    const pipeline: ChainableCommander = this.client.pipeline();

    for (const { key, value } of entries) {
      if (typeof key !== "string" || value === undefined) continue;
      const stringValue = JSON.stringify(value);
      if (ttl !== undefined && ttl > 0) {
        pipeline.setex(key, ttl, stringValue);
      } else {
        pipeline.set(key, stringValue);
      }
    }

    await pipeline.exec();
  }

  async incrBy(key: string, amount = 1): Promise<number> {
    return this.client.incrby(key, amount);
  }

  async decrBy(key: string, amount = 1): Promise<number> {
    return this.client.decrby(key, amount);
  }

  async getTTL(key: string): Promise<number> {
    return this.client.ttl(key);
  }

  async expire(key: string, seconds: number): Promise<boolean> {
    const result = await this.client.expire(key, seconds);
    return !!result;
  }

  async deleteByPattern(pattern: string): Promise<number> {
    const keys = await this.client.keys(pattern);
    if (keys.length === 0) return 0;

    const pipeline = this.client.pipeline();
    keys.forEach((key) => pipeline.del(key));
    await pipeline.exec();

    return keys.length;
  }

  async flush(): Promise<void> {
    await this.client.flushdb();
  }

  async publish(channel: string, message: string): Promise<number> {
    return this.client.publish(channel, message);
  }

  async subscribe(
    channel: string,
    onMessage: (channel: string, message: string) => void,
  ): Promise<() => Promise<void>> {
    const subscriber = this.client.duplicate();
    await subscriber.connect();

    await subscriber.subscribe(channel);
    subscriber.on("message", onMessage);

    return async () => {
      try {
        await subscriber.unsubscribe(channel);
        await subscriber.quit();
      } catch (err) {
        console.error("Error during unsubscribe:", err);
      }
    };
  }
}
