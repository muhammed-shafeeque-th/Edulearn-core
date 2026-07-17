import {
  CounterMetric,
  GaugeMetric,
  HistogramMetric,
  SummaryMetric,
} from "../types/metrics.types";
import {
  GaugeOptions,
  CounterOptions,
  HistogramOptions,
  SummaryOptions,
} from "../types";
import { MetricsConfigs } from "../metrics.config";
import { MetricsServer } from "../server/metrics.server";
import { MetricFactory } from "./metric.factory";
import { MetricService } from "./prom-metric.service";
import { MetricRegistry } from "./registry";

export class MetricsEngine {
  private readonly registry: MetricRegistry;

  private readonly factory: MetricFactory;

  private readonly service: MetricService;

  private readonly server: MetricsServer;

  constructor(private readonly config: MetricsConfigs = {}) {
    this.registry = new MetricRegistry(config);

    this.factory = new MetricFactory(this.registry, config);

    this.service = new MetricService(this.factory, this.registry);

    this.server = new MetricsServer(this.service);
  }

  /**
   * Initializes the metrics engine.
   * Reserved for future runtime bootstrap.
   */
  async initialize(): Promise<void> {
    // future:
    // runtime.initialize()
    this.server.start();
    // exporters.initialize()
  }

  async shutdown(): Promise<void> {
    this.registry.clear();
  }

  counter(options: CounterOptions): CounterMetric {
    return this.factory.counter(options);
  }

  gauge(options: GaugeOptions): GaugeMetric {
    return this.factory.gauge(options);
  }

  histogram(options: HistogramOptions): HistogramMetric {
    return this.factory.histogram(options);
  }

  summary(options: SummaryOptions): SummaryMetric {
    return this.factory.summary(options);
  }

  metrics(): Promise<string> {
    return this.registry.metrics();
  }

  contentType(): string {
    return this.registry.contentType();
  }

  clear(): void {
    this.registry.clear();
  }

  /**
   * Advanced API.
   * Intended only for integrations (NestJS, Express, etc.)
   */
  getRegistry(): MetricRegistry {
    return this.registry;
  }
}
