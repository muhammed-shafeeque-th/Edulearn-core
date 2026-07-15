export const DEFAULT_LOGGER_CONFIG = {
  serviceName: "edulearn-service",
  version: "1.0.0",
  environment: "development",
  level: "info",
  enableConsole: true,
};
export const DEFAULT_OBSERVABILITY_CONFIG = {
  serviceName: "edulearn-service",
  version: "1.0.0",
  environment: "development",
  logging: {
    level: "info",
    enableConsole: true,
  },
  tracing: {
    enabled: true,
    samplerRatio: 1.0,
    exporterEndpoint: "http://localhost:4318/v1/traces",
  },
  metrics: {
    enabled: true,
    exporterEndpoint: "http://localhost:4318/v1/metrics",
    collectDefault: true,
  },
};
