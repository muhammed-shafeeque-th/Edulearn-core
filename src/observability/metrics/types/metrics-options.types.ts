import {
  CounterConfiguration,
  GaugeConfiguration,
  HistogramConfiguration,
  SummaryConfiguration,
} from "prom-client";

export type HistogramOptions = HistogramConfiguration<string>;
export type SummaryOptions = SummaryConfiguration<string>;
export type CounterOptions = CounterConfiguration<string>;
export type GaugeOptions = GaugeConfiguration<string>;