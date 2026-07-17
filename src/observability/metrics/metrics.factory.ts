import { Counter, Histogram, Gauge, Summary } from 'prom-client';
import { globalRegistry } from './registry';

export function createCounter(name: string, help: string, labelNames: string[] = []) {
  return new Counter({ name, help, labelNames, registers: [globalRegistry] });
}

export function createGauge(name: string, help: string, labelNames: string[] = []) {
  return new Gauge({ name, help, labelNames, registers: [globalRegistry] });
}

export function createHistogram(name: string, help: string, labelNames: string[] = [], buckets?: number[]) {
  return new Histogram({
    name,
    help,
    labelNames,
    buckets: buckets || [0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1, 2.5, 5, 10],
    registers: [globalRegistry],
  });
}

export function createSummary(
  name: string,
  help: string,
  labelNames: string[] = [],
  percentiles?: number[],
  maxAgeSeconds?: number,
  ageBuckets?: number,
) {
  return new Summary({
    name,
    help,
    labelNames,
    percentiles: percentiles || [0.5, 0.9, 0.99],
    maxAgeSeconds: maxAgeSeconds || 600,
    ageBuckets: ageBuckets || 5,
    registers: [globalRegistry],
  });
}