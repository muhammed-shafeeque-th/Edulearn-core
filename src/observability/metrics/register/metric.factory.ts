
import {
  Counter,
  Gauge,
  Histogram,
  Summary,
  CounterConfiguration,
  GaugeConfiguration,
  HistogramConfiguration,
  SummaryConfiguration,
} from "prom-client";

import { MetricRegistry } from "./registry";

import { MetricsConfigs } from "../metrics.config";


export class MetricFactory {

  constructor(
    private readonly registry: MetricRegistry,
    private readonly config: MetricsConfigs = {},
  ) {}

  counter(
    options: CounterConfiguration<string>,
  ): Counter {

    return this.registry.counter({

      ...options,

      name: this.metricName(options.name),

      labelNames: this.mergeLabels(
        options.labelNames,
      ),

    });

  }

  gauge(
    options: GaugeConfiguration<string>,
  ): Gauge {

    return this.registry.gauge({

      ...options,

      name: this.metricName(options.name),

      labelNames: this.mergeLabels(
        options.labelNames,
      ),

    });

  }

  histogram(
    options: HistogramConfiguration<string>,
  ): Histogram {

    return this.registry.histogram({

      ...options,

      name: this.metricName(options.name),

      buckets:
        options.buckets ??
        this.config.defaultHistogramBuckets,

      labelNames: this.mergeLabels(
        options.labelNames,
      ),

    });

  }

  summary(
    options: SummaryConfiguration<string>,
  ): Summary {

    return this.registry.summary({

      ...options,

      name: this.metricName(options.name),

      percentiles:
        options.percentiles ??
        this.config.defaultSummaryPercentiles,

      labelNames: this.mergeLabels(
        options.labelNames,
      ),

    });

  }

  private metricName(
    name: string,
  ): string {

    const parts = [

      this.config.namespace,

      this.config.subsystem,

      name,

    ].filter(Boolean);

    return parts.join("_");
  }

  private mergeLabels(
    labels?: readonly string[],
  ): string[] {

    const globalLabels = Object.keys(
      this.config.defaultLabels ?? {},
    );

    return Array.from(
      new Set([
        ...globalLabels,
        ...(labels ?? []),
      ]),
    );
  }
}