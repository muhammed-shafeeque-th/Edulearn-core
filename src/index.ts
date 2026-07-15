import path from 'path';

// Absolute path to the central proto directory inside node_modules
export const PROTO_ROOT_DIR = path.resolve(__dirname, '../protos');

// Explicit type of supported service directories
export type ServiceName = 'user' | 'payment' | 'auth' | 'course' | 'notification';

/**
 * Resolves the absolute path to a specific service's .proto file.
 * @param service The name of the microservice directory (e.g., 'user')
 * @param fileName Optional file name override. Defaults to "[service]_service.proto"
 */
export function getProtoPath(service: ServiceName, fileName?: string): string {
  // Safe default pattern: e.g., 'user' -> 'user_service.proto'
  const finalFileName = fileName || `${service}_service.proto`;
  
  return path.join(PROTO_ROOT_DIR, service, finalFileName);
}

export * from './events';
export * from './redis';
export * from './utils/getEnv';
export * from './observability/logging';
export * from './observability/metrics';
export * from './observability/trace';

