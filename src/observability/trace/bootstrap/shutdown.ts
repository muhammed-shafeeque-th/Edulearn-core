import { NodeTracerProvider } from '@opentelemetry/sdk-trace-node';

export function shutdownTracer(provider: NodeTracerProvider) {
  const shutdown = async () => {
    console.log('Shutting down OpenTelemetry tracer...');
    await provider.shutdown();
    console.log('Tracer shutdown complete.');
  };

  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);
}

export const registerShutdown = shutdownTracer;