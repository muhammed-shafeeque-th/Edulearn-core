import { createCounter, createHistogram } from "../metric.factory";

export const grpcMetrics = {
  requestsTotal: createCounter(
    "grpc_requests_total",
    "Total number of gRPC requests",
    ["method", "status_code"],
  ),
  errorsTotal: createCounter(
    "grpc_errors_total",
    "Total number of gRPC errors",
    ["method", "status_code"],
  ),
  requestDuration: createHistogram(
    "grpc_request_duration_seconds",
    "Latency of gRPC requests in seconds",
    ["method", "status_code"],
  ),
};
