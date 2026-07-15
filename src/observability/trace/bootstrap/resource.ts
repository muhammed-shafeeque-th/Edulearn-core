import { resourceFromAttributes } from "@opentelemetry/resources";
import {
  ATTR_SERVICE_NAME,
  ATTR_SERVICE_VERSION,
  SemanticResourceAttributes,
} from "@opentelemetry/semantic-conventions";
import os from "os";
import { TracerConfig } from "../trace.config";

export function createResource(config: TracerConfig) {
  const {
    serviceName,
    version = process.env.npm_package_version || "unknown",
    environment,
  } = config;

  return resourceFromAttributes({
    [ATTR_SERVICE_NAME]: serviceName,
    [ATTR_SERVICE_VERSION]: version,
    [SemanticResourceAttributes.DEPLOYMENT_ENVIRONMENT]: environment,
    [SemanticResourceAttributes.SERVICE_NAMESPACE]: "edulearn",
    [SemanticResourceAttributes.SERVICE_INSTANCE_ID]: `${os.hostname()}-${process.pid}`,
    [SemanticResourceAttributes.HOST_NAME]: os.hostname(),
    [SemanticResourceAttributes.OS_TYPE]: os.type(),
    [SemanticResourceAttributes.OS_VERSION]: os.release(),
    [SemanticResourceAttributes.PROCESS_PID]: process.pid,
  });
}
