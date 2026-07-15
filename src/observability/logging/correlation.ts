import { format } from 'winston';
import { context, trace } from '@opentelemetry/api';

export function createCorrelationEnricher() {
  return format((info) => {
    const activeSpan = trace.getSpan(context.active());
    const spanContext = activeSpan?.spanContext();

    return {
      ...info,
      traceId: spanContext?.traceId,
      spanId: spanContext?.spanId,
      // Add more context as needed
    };
  })();
}
