import winston from 'winston';
import { ILogger } from './logger.interface';
import { ObservabilityConfig } from '../config/observability.config';
import { getCurrentTraceContext } from '../common/context';

export class LoggerService implements ILogger {
  private logger: winston.Logger;

  constructor(config: ObservabilityConfig) {
    this.logger = winston.createLogger({
      level: config.logging.level,
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
      defaultMeta: { service: config.serviceName },
    });

    if (config.logging.enableConsole) {
      this.logger.add(new winston.transports.Console());
    }
  }

  private enrichMeta(meta?: any) {
    const traceCtx = getCurrentTraceContext();
    return { ...meta, ...traceCtx };
  }

  info(message: string, meta?: any): void {
    this.logger.info(message, this.enrichMeta(meta));
  }

  error(message: string, meta?: any): void {
    this.logger.error(message, this.enrichMeta(meta));
  }

  warn(message: string, meta?: any): void {
    this.logger.warn(message, this.enrichMeta(meta));
  }

  debug(message: string, meta?: any): void {
    this.logger.debug(message, this.enrichMeta(meta));
  }
}
