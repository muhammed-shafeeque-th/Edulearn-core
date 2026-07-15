import {
  Span,
  Attributes,
  SpanStatusCode,
  Context,
  trace,
  context,
  Tracer,
  SpanStatus,
} from "@opentelemetry/api";
import { ITraceService } from "./trace.interface";

export const TRACER_TOKEN = Symbol.for("Tracer");

export class TracerService implements ITraceService {
  constructor(private readonly tracer: Tracer) {}

  async startActiveSpan<T>(
    name: string,
    fn: () => Promise<T>,
    attributes?: Attributes,
  ): Promise<T> {
    return this.tracer.startActiveSpan(name, async (span) => {
      if (attributes) {
        span.setAttributes(attributes);
      }

      try {
        const result = await fn();
        span.setStatus({ code: SpanStatusCode.OK });
        return result;
      } catch (error: unknown) {
        this.recordError(span, error);
        throw error;
      } finally {
        span.end();
      }
    });
  }

  startSpan(
    name: string,
    attributes?: Attributes,
    contextOverride?: Context,
  ): Span {
    const ctx = contextOverride || context.active();
    return this.tracer.startSpan(name, { attributes }, ctx);
  }

  endSpan(span: Span): void {
    span.end();
  }

  recordError(span: Span, error: unknown): void {
    span.recordException(error as Error);
    span.setStatus({
      code: SpanStatusCode.ERROR,
      message: (error as Error)?.message || "Operation failed",
    });
  }

  setStatus(span: Span, code: SpanStatusCode, message?: string): void {
    span.setStatus({ code, message });
  }

  setAttribute(span: Span, key: string, value: unknown): void {
    span.setAttribute(key, value as any);
  }

  getCurrentSpan(): Span | undefined {
    return trace.getSpan(context.active());
  }

  getTraceId(): string | undefined {
    return this.getCurrentSpan()?.spanContext().traceId;
  }

  getSpanId(): string | undefined {
    return this.getCurrentSpan()?.spanContext().spanId;
  }

  addEvent(name: string, attributes?: Attributes): void {
    this.getCurrentSpan()?.addEvent(name, attributes);
  }
}
