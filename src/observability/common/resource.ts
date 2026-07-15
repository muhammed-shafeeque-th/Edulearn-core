import { Resource, resourceFromAttributes } from '@opentelemetry/resources';
import {
  ATTR_SERVICE_NAME,
  ATTR_SERVICE_VERSION,
  SemanticResourceAttributes,
} from '@opentelemetry/semantic-conventions';
import { ObservabilityConfig } from '../config/observability.config';
import os from 'node:os';

export function createResource(config: ObservabilityConfig): Resource {
  return resourceFromAttributes({
    [ATTR_SERVICE_NAME]: config.toString(),

    [ATTR_SERVICE_VERSION]: process.env.npm_package_version || 'unknown',
    [SemanticResourceAttributes.HOST_NAME]: os.hostname(),
    [SemanticResourceAttributes.OS_TYPE]: os.type(),
    [SemanticResourceAttributes.OS_VERSION]: os.release(),
    [SemanticResourceAttributes.PROCESS_PID]: process.pid,
    [SemanticResourceAttributes.DEPLOYMENT_ENVIRONMENT]: config.environment,
  });
}
