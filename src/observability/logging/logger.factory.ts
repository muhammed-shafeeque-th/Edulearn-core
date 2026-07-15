import winston, { format, transports } from 'winston';
import { createCorrelationEnricher } from './correlation';
import { createFormatter } from './formatter';
import { createTransports } from './transports';
import { DEFAULT_LOGGER_CONFIG,  } from '../config/defaults';
import { LoggerConfigs } from './types';

export function createLogger(config: Partial<LoggerConfigs> = {}): winston.Logger {
  const finalConfig = { ...DEFAULT_LOGGER_CONFIG, ...config };

  const logger = winston.createLogger({
    level: finalConfig.level,
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
