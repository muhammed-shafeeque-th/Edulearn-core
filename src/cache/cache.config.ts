export interface CacheConfig {
  host: string;
  port: number;
  db: number;
  keyPrefix: string;
  password?: string;
  lazyConnect: boolean;
  maxRetriesPerRequest: number;
  //  retryStrategy: (retry :number) => void
}
