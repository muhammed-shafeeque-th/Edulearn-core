import {
  Counter,
  Gauge,
  Histogram,
  Summary,
  Registry,
  collectDefaultMetrics,
  CounterConfiguration,
  GaugeConfiguration,
  HistogramConfiguration,
  SummaryConfiguration,
} from "prom-client";

import { MetricsConfigs } from "../metrics.config";

export class MetricRegistry {
  private readonly registry = new Registry();

  private readonly counters = new Map<string, Counter>();

  private readonly gauges = new Map<string, Gauge>();

  private readonly histograms = new Map<string, Histogram>();

  private readonly summaries = new Map<string, Summary>();

  constructor(private readonly config: MetricsConfigs = {}) {
    this.initialize();
  }

  private initialize(): void {
    if (this.config.defaultLabels) {
      this.registry.setDefaultLabels(this.config.defaultLabels);
    }

    if (this.config.defaultMetrics?.enabled !== false) {
      collectDefaultMetrics({
        register: this.registry,
        ...this.config.defaultMetrics?.config,
      });
    }
  }

  getRegistry(): Registry {
    return this.registry;
  }

  metrics(): Promise<string> {
    return this.registry.metrics();
  }

  contentType(): string {
    return this.registry.contentType;
  }

  counter(options: CounterConfiguration<string>): Counter {
    const existing = this.counters.get(options.name);

    if (existing) {
      return existing;
    }

    const counter = new Counter({
      ...options,
      name: this._sanitizeMetricName(options.name),
      registers: [this.registry],
    });

    this.counters.set(options.name, counter);

    return counter;
  }

  gauge(options: GaugeConfiguration<string>): Gauge {
    const existing = this.gauges.get(options.name);

    if (existing) {
      return existing;
    }

    const gauge = new Gauge({
      ...options,
      name: this._sanitizeMetricName(options.name),

      registers: [this.registry],
    });

    this.gauges.set(options.name, gauge);

    return gauge;
  }

  histogram(options: HistogramConfiguration<string>): Histogram {
    const existing = this.histograms.get(options.name);

    if (existing) {
      return existing;
    }

    const histogram = new Histogram({
      ...options,
      name: this._sanitizeMetricName(options.name),

      registers: [this.registry],
    });

    this.histograms.set(options.name, histogram);

    return histogram;
  }

  summary(options: SummaryConfiguration<string>): Summary {
    const existing = this.summaries.get(options.name);

    if (existing) {
      return existing;
    }

    const summary = new Summary({
      ...options,
      name: this._sanitizeMetricName(options.name),

      registers: [this.registry],
    });

    this.summaries.set(options.name, summary);

    return summary;
  }

  clear(): void {
    this.registry.clear();

    this.counters.clear();

    this.gauges.clear();

    this.histograms.clear();

    this.summaries.clear();
  }

  _sanitizeMetricName(value: string): string {
    return value
      .replace(/-/g, "_")
      .replace(/\./g, "_")
      .replace(/\s+/g, "_")
      .replace(/[^a-zA-Z0-9_:]/g, "_");
  }
}

// export const globalRegistry = MetricsRegistry.getInstance();
