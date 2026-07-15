import winston from 'winston';
// import DailyRotateFile from 'winston-daily-rotate-file';
import { LoggerConfigs } from './types';

export function createTransports(config: LoggerConfigs) {
  const transportsList: winston.transport[] = [
    new winston.transports.Console({
      handleExceptions: true,
    }),
  ];

  // transportsList.push(
  //   new DailyRotateFile({
  //     filename: `logs/${config.serviceName}-%DATE%-combined.log`,
  //     datePattern: 'YYYY-MM-DD',
  //     zippedArchive: true,
  //     maxSize: '20m',
  //     maxFiles: '14d',
  //     format: winston.format.json(),
  //   })
  // );

  return transportsList;
}
