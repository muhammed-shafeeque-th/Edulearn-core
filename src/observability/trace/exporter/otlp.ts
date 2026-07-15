import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { TracerConfig } from '../trace.config';

export function createExporter(config: TracerConfig) {
  const { collectorUrl = 'http://localhost:4318/v1/traces' } = config;
  return new OTLPTraceExporter({ url: collectorUrl });
}