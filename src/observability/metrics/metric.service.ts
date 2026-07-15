import { IMetricService, MetricLabels } from './types';
import { grpcMetrics } from './definitions/grpc.metrics';
import { dbMetrics } from './definitions/database.metrics';

export class MetricService implements IMetricService {
  recordGrpcRequest(method: string, statusCode?: number): void {
    grpcMetrics.requestsTotal.inc({ method, status_code: statusCode?.toString() });
  }

  recordGrpcError(method: string, statusCode?: number): void {
    grpcMetrics.errorsTotal.inc({ method, status_code: statusCode?.toString() });
  }

  recordDatabaseQuery(operation: string): void {
    dbMetrics.queriesTotal.inc({ operation });
  }

  measureGrpcRequest(method: string): () => void {
    const end = grpcMetrics.requestDuration.startTimer({ method });
    return (statusCode?: number) => end({ status_code: statusCode?.toString() });
  }

  measureDatabaseOperation(operation: string): () => void {
    const end = dbMetrics.queryDuration.startTimer({ operation });
    return () => end();
  }

  async getMetrics(): Promise<string> {
    return (await import('prom-client')).register.metrics();
  }
}