import { ParentBasedSampler, TraceIdRatioBasedSampler } from '@opentelemetry/sdk-trace-node';
import { TracerConfig } from '../trace.config';

export function createSampler(config: TracerConfig) {
  const { environment, samplingRatio = 0.1 } = config;
  return environment === 'production'
    ? new ParentBasedSampler({
        root: new TraceIdRatioBasedSampler(samplingRatio),
      })
    : new ParentBasedSampler({ root: new TraceIdRatioBasedSampler(1.0) });
}