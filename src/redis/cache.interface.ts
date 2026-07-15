import Redis from 'ioredis';

export interface ICacheService {
  getClient(): Redis;

  connect(): Promise<void>;
  disconnect(): Promise<void>;
  ping(): Promise<number>;

  get<T>(key: string): Promise<T | null>;
  set<T>(key: string, value: T, ttl?: number): Promise<void>;
  delete(key: string): Promise<void>;
  exists(key: string): Promise<boolean>;

  getMultiple<T>(keys: string[]): Promise<(T | null)[]>;
  setMultiple<T>(entries: { key: string; value: T }[], ttl?: number): Promise<void>;

  incrBy(key: string, amount?: number): Promise<number>;
  decrBy(key: string, amount?: number): Promise<number>;

  getTTL(key: string): Promise<number>;
  expire(key: string, seconds: number): Promise<boolean>;

  deleteByPattern(pattern: string): Promise<number>;
  flush(): Promise<void>;

  publish(channel: string, message: string): Promise<number>;
  subscribe(
    channel: string,
    onMessage: (channel: string, message: string) => void,
  ): Promise<() => Promise<void>>;
}