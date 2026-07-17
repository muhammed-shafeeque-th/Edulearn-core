import { TLoggerOptions } from "./types/logger.types";

export type LoggerConfigs = {
  serviceName: string;
  version?: string;
  environment: string;
  level: string;
  enableConsole?: boolean;
  loggerOptions?: TLoggerOptions;
};