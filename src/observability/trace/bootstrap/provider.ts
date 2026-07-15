import { BatchSpanProcessor, NodeTracerProvider, SimpleSpanProcessor } from "@opentelemetry/sdk-trace-node";
import { registerInstrumentations } from "@opentelemetry/instrumentation";
import { W3CTraceContextPropagator } from "@opentelemetry/core";
import { createResource } from "./resource";
import { createExporter } from "../exporter/otlp";
import { createSampler } from "./sampler";
import { getInstrumentations } from "./instrumentations";
import { registerShutdown } from "./shutdown";
import { TracerConfig } from "../trace.config";

export function initializeTracer(config: TracerConfig) {
  const provider = createTracerProvider(config);
  registerInstrumentations({ instrumentations: getInstrumentations(config) });
  provider.register({
    propagator: new W3CTraceContextPropagator(),
  });
  registerShutdown(provider);
  return provider;
}

export function createTracerProvider(config: TracerConfig) {
  const resource = createResource(config);
  const sampler = createSampler(config);
  const exporter = createExporter(config);
  const processor =
    config.environment === "production"
      ? new BatchSpanProcessor(exporter)
      : new SimpleSpanProcessor(exporter);

  const provider = new NodeTracerProvider({
    resource,
    sampler,
    spanProcessors: [processor],
  });

  return provider;
}
