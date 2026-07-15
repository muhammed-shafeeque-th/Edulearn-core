import { Attributes, Span, SpanStatusCode, Context } from '@opentelemetry/api';

export interface ITraceService {
  startActiveSpan<T>(
    name: string,
    fn: () => Promise<T>,
    attributes?: Attributes,
  ): Promise<T>;

  startSpan(
    name: string,
    attributes?: Attributes,
    contextOverride?: Context,
  ): Span;

  endSpan(span: Span): void;

  recordError(span: Span, error: unknown): void;

  setStatus(span: Span, code: SpanStatusCode, message?: string): void;

  setAttribute(span: Span, key: string, value: unknown): void;

  getCurrentSpan(): Span | undefined;

  getTraceId(): string | undefined;

  getSpanId(): string | undefined;

  addEvent(name: string, attributes?: Attributes): void;
}