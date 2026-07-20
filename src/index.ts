import path from "path";

/** Absolute path to the central proto directory inside node_modules */
export const PROTO_ROOT_DIR = path.resolve(__dirname, "../protos");

/**  EduLearn service types */
export type ServiceName =
  | "user"
  | "payment"
  | "auth"
  | "course"
  | "notification"
  | "order"
  | "chat";

/**
 * Resolves the absolute path to a specific service's .proto file.
 * @param service The name of the microservice directory (e.g., 'user')
 * @param fileName Optional file name override. Defaults to "[service]_service.proto"
 */
export function getProtoPath(service: ServiceName, fileName?: string): string {
  const finalFileName = fileName || `${service}_service.proto`;

  return path.join(PROTO_ROOT_DIR, service, finalFileName);
}

export * from "./events";
export * from "./cache";
export * from "./health";
export * from "./utils/getEnv";
export * from "./utils/get-metadata";
export * from "./utils/retryable";
export * from "./observability/logging";
export * from "./observability/metrics";
export * from "./observability/trace";
