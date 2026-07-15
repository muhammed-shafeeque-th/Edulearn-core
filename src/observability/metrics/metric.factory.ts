import { Counter, Histogram, Gauge } from 'prom-client';
import { globalRegistry } from './registry';

export function createCounter(name: string, help: string, labelNames: string[] = []) {
  return new Counter({ name, help, labelNames, registers: [globalRegistry] });
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