import winston, { format, transports } from "winston";
import { createCorrelationEnricher } from "./correlation";
import { createFormatter } from "./formatter";
import { createTransports } from "./transports";
import { DEFAULT_LOGGER_CONFIG } from "../config/defaults";
import { LoggerConfigs } from "./types";

export function createLogger(
  config: Partial<LoggerConfigs> = {},
): winston.Logger {
  const finalConfig = { ...DEFAULT_LOGGER_CONFIG, ...config };

  const logger = winston.createLogger({
    level: finalConfig.level,
    format: winston.format.combine(
      winston.format.timestamp(),
      createCorrelationEnricher(),
      createFormatter(finalConfig),
    ),
    transports: createTransports(finalConfig),
    exitOnError: false,
    ...(config.loggerOptions, {}),
  });

  return logger;
}

// Graceful shutdown for transports (important for batching)
export const shutdownLogger = async (logger: winston.Logger) => {
  console.log('Flushing logs before shutdown...');
  // Allow time for batching transports to flush
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for batching to complete
  logger.end(() => {
    // Call end() on the logger instance to flush transports
    console.log('Logs flushed. Exiting.');
    process.exit(0);
  });
};

process.on('SIGINT', shutdownLogger);
process.on('SIGTERM', shutdownLogger);


