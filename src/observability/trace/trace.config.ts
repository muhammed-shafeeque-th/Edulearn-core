import { TInstrumentation } from "./types/instrumentation.type";

export interface TracerConfig {
  serviceName: string;
  version?: string;
  samplingRatio?: number;
  collectorUrl?: string;
  environment: string;
  instrumentations?: TInstrumentation[];
}