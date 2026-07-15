export interface LogContext {
  [key: string]: any;
  userId?: string;
  correlationId?: string;
  requestId?: string;
}

export interface ILogger {
  info(message: string, context?: LogContext): void;
  warn(message: string, context?: LogContext): void;
  error(message: string, error?: Error | unknown, context?: LogContext): void;
  debug(message: string, context?: LogContext): void;
}

export type LoggerConfigs = {
  serviceName: string;
  version: string;
  environment: string;
  level: string;
  enableConsole: boolean;
};
