import winston from 'winston';
import { LoggerConfigs } from './types';

export function createFormatter(config: LoggerConfigs) {
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
