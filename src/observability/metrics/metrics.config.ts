import { DefaultMetricsCollectorConfiguration } from "prom-client";

export interface MetricsConfigs {
  port?: number;
  
  path?: string;

  enabled?: boolean;

  namespace?: string;

  subsystem?: string;

  defaultLabels?: Record<string, string>;

  defaultHistogramBuckets?: number[];

  defaultSummaryPercentiles?: number[];

  defaultMetrics?: {
    enabled?: boolean;

    config?: DefaultMetricsCollectorConfiguration<any>;
  };
}
