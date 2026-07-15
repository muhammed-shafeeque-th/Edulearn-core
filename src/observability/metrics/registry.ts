import { Registry, collectDefaultMetrics } from 'prom-client';

class MetricsRegistry {
  private static instance: Registry;

  static getInstance(): Registry {
    if (!MetricsRegistry.instance) {
      MetricsRegistry.instance = new Registry();
      collectDefaultMetrics({ register: MetricsRegistry.instance });
    }
    return MetricsRegistry.instance;
  }
}

export const globalRegistry = MetricsRegistry.getInstance();