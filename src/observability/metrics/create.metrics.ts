import { MetricsConfigs } from "./metrics.config";
import { MetricsEngine } from "./register/metrics.engine";

let instance: MetricsEngine | undefined;

export function createMetrics(config: MetricsConfigs = {}): MetricsEngine {
  if (!instance) {
    instance = new MetricsEngine(config);
  }

  return instance;
}

export function getMetrics(): MetricsEngine {
  if (!instance) {
    throw new Error("MetricsEngine has not been initialized.");
  }

  return instance;
}

export async function shutdownMetrics() {
  if (instance) {
    await instance.shutdown();

    instance = undefined;
  }
}
