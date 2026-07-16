import winston from "winston";
import { ILogger } from "./logger.interface";
import { ObservabilityConfig } from "../config/observability.config";
import { getCurrentTraceContext } from "../common/context";

export class LoggerService implements ILogger {
  constructor(protected readonly logger: winston.Logger) {}

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
