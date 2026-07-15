import { PgInstrumentation } from '@opentelemetry/instrumentation-pg';
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';
import { KafkaJsInstrumentation } from '@opentelemetry/instrumentation-kafkajs';
import { IORedisInstrumentation } from '@opentelemetry/instrumentation-ioredis';
import { GrpcInstrumentation } from '@opentelemetry/instrumentation-grpc';
import { TracerConfig } from '../trace.config';

export function getInstrumentations(config: TracerConfig) {
  return [
    new HttpInstrumentation({
      // Example hooks - customize as needed
      requestHook: (span, request: any) => {
        if (request.headers?.['user-agent']) {
          span.setAttribute('http.user_agent', request.headers['user-agent']);
        }
      },
    }),
    new PgInstrumentation({
      // Add query sanitization or hooks if needed
    }),
    new KafkaJsInstrumentation({
      // Consumer/producer hooks
    }),
    new IORedisInstrumentation(),
    new GrpcInstrumentation(),
  ];
}