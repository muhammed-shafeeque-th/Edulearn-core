import { trace, context } from '@opentelemetry/api';

export function getCurrentTraceContext() {
  const span = trace.getActiveSpan();
  return span
    ? {
        traceId: span.spanContext().traceId,
        spanId: span.spanContext().spanId,
      }
    : {};
}
