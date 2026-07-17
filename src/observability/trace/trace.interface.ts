import { TAttributes, TContext, TSpan, TSpanStatusCode } from "./types/tracer.types";

export interface ITraceService {
  startActiveSpan<T>(
    name: string,
    fn: () => Promise<T>,
    attributes?: TAttributes,
  ): Promise<T>;

  startSpan(
    name: string,
    attributes?: TAttributes,
    contextOverride?: TContext,
  ): TSpan;

  endSpan(span: TSpan): void;

  recordError(span: TSpan, error: unknown): void;

  setStatus(span: TSpan, code: TSpanStatusCode, message?: string): void;

  setAttribute(span: TSpan, key: string, value: unknown): void;

  getCurrentSpan(): TSpan | undefined;

  getTraceId(): string | undefined;

  getSpanId(): string | undefined;

  addEvent(name: string, attributes?: TAttributes): void;
}