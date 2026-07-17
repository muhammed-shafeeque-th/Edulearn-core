import { MetricFactory } from "./metric.factory";
import {
  CounterConfiguration,
  GaugeConfiguration,
  HistogramConfiguration,
  SummaryConfiguration,
} from "prom-client";
import { MetricRegistry } from "./registry";

export class MetricService {
  constructor(
    private readonly _factory: MetricFactory,
    private readonly _registry : MetricRegistry,
  ) {}

  increment(
    options: CounterConfiguration<string>,
    value = 1,
    labels?: Record<string, string>,
  ): void {
    const counter =
      this._factory.counter(options);

    labels
      ? counter.inc(labels, value)
      : counter.inc(value);
  }

  decrement(
    options: GaugeConfiguration<string>,
    value = 1,
    labels?: Record<string, string>,
  ): void {
    const gauge =
      this._factory.gauge(options);

    labels
      ? gauge.dec(labels, value)
      : gauge.dec(value);
  }

  incrementGauge(
    options: GaugeConfiguration<string>,
    value = 1,
    labels?: Record<string, string>,
  ): void {
    const gauge =
      this._factory.gauge(options);

    labels
      ? gauge.inc(labels, value)
      : gauge.inc(value);
  }

  setGauge(
    options: GaugeConfiguration<string>,
    value: number,
    labels?: Record<string, string>,
  ): void {
    const gauge =
      this._factory.gauge(options);

    labels
      ? gauge.set(labels, value)
      : gauge.set(value);
  }

  observe(
    options: HistogramConfiguration<string>,
    value: number,
    labels?: Record<string, string>,
  ): void {
    const histogram =
      this._factory.histogram(options);

    labels
      ? histogram.observe(labels, value)
      : histogram.observe(value);
  }

  observeSummary(
    options: SummaryConfiguration<string>,
    value: number,
    labels?: Record<string, string>,
  ): void {
    const summary =
      this._factory.summary(options);

    labels
      ? summary.observe(labels, value)
      : summary.observe(value);
  }

  startTimer(
    options: HistogramConfiguration<string>,
    labels?: Record<string, string>,
  ): () => void {
    const histogram =
      this._factory.histogram(options);

    return histogram.startTimer(labels);
  }

  async measure<T>(
    options: HistogramConfiguration<string>,
    callback: () => Promise<T>,
    labels?: Record<string, string>,
  ): Promise<T> {
    const end =
      this.startTimer(options, labels);

    try {
      return await callback();
    } finally {
      end();
    }
  }

  registry() {
    return this._registry.getRegistry();
  }

  metrics() {
    return this._registry.metrics();
  }

  contentType() {
    return this._registry.contentType();
  }

  clear() {
    this._registry.clear();
  }
}