import winston from 'winston';
import { ObservabilityConfig } from '../config/observability.config';

export function createFormatter(config: ObservabilityConfig) {
  if (config.environment === 'production') {
    return winston.format.json();
  }

  return winston.format.combine(
    winston.format.colorize(),
    winston.format.printf(({ timestamp, level, message, ...meta }) => {
      const metaStr = Object.keys(meta).length > 0 ? ` ${JSON.stringify(meta)}` : '';
      return `[${timestamp}] [${level.toUpperCase()}]: ${message}${metaStr}`;
    })
  );
}
