import { Attributes, Span, SpanStatusCode, Context } from "@opentelemetry/api";
import { NodeTracerProvider } from "@opentelemetry/sdk-trace-node";

export type TAttributes = Attributes;
export type TSpan = Span;
export type TSpanStatusCode = SpanStatusCode;
export type TContext = Context;

export type TNodeTracerProvider = NodeTracerProvider;
