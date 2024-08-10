import moment from "moment";
import { createLogger, format, transports } from 'winston';
const { combine, timestamp, json, colorize } = format;

// Custom format for console logging with colors
const consoleLogFormat = format.combine(
  format.colorize(),
  format.printf(({ level, message, timestamp }) => {
    timestamp = moment(timestamp).format('DD-MM-YYYY hh:mm:ss A');
    return `${level}: ${timestamp} ${message}`;
  })
);

// Custom format for console logging with colors
const fileLogFormat = format.combine(
    format.printf(({ level, message, timestamp }) => {
      timestamp = moment(timestamp).format('DD-MM-YYYY hh:mm:ss A');
      return `${level}: ${timestamp} ${message}`;
    })
);

// Create a Winston logger
const logger = createLogger({
  level: 'verbose',
  transports: [
    new transports.Console({
      format: consoleLogFormat
    }),
    new transports.File({
        filename: 'src/logs/app.log',
        format: fileLogFormat
    })
  ],
});



export {logger};