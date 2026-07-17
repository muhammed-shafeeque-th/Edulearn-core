import { Logger, LoggerOptions } from "winston";

export interface LogContext {
  [key: string]: any;
  userId?: string;
  correlationId?: string;
  requestId?: string;
}


export type TLoggerOptions = LoggerOptions;
export type TLogger = Logger;



