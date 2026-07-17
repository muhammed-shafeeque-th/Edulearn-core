export interface IMetrics {
  counter(name: string, value?: number): void;
  histogram(name: string, value: number): void;
}

export interface IMetricService {
  recordGrpcRequest(method: string, statusCode?: number): void;
  recordGrpcError(method: string, statusCode?: number): void;
  recordDatabaseQuery(operation: string): void;
  measureGrpcRequest(method: string): () => void;
  measureDatabaseOperation(operation: string): () => void;
  getMetrics(): Promise<string>;
}

export interface MetricLabels {
  [key: string]: string | number;
}