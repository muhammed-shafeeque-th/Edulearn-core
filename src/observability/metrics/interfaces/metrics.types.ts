import { Counter, Gauge, Histogram, Summary } from "prom-client";

export type CounterMetric = Counter;
export type GaugeMetric = Gauge;
export type SummaryMetric = Summary;
export type HistogramMetric = Histogram;
