export interface TracerConfig {
  serviceName: string;
  version?: string;
  samplingRatio?: number;
  collectorUrl?: string;
  environment: string;
}