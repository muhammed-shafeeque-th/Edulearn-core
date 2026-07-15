import winston, { format, transports } from 'winston';
import { ObservabilityConfig } from '../config/observability.config';
import { createCorrelationEnricher } from './correlation';
import { createFormatter } from './formatter';
import { createTransports } from './transports';

export function createLogger(config: Partial<ObservabilityConfig> = {}): winston.Logger {
  const finalConfig = { ...config.defaults, ...config };

  const logger = winston.createLogger({
    level: finalConfig.logLevel,
    format: winston.format.combine(
      winston.format.timestamp(),
      createCorrelationEnricher(),
      createFormatter(finalConfig)
    ),
    transports: createTransports(finalConfig),
    exitOnError: false,
  });

  return logger;
}
