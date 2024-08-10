import moment from "moment";
import { createLogger, format, transports } from 'winston';
const { combine, timestamp, json, colorize } = format;

// Custom format for console logging with colors
const consoleLogFormat = format.combine(
  format.colorize(),
  format.printf(({ level, message, timestamp }) => {
    timestamp = moment(timestamp).format('DD-MM-YYYY HH:mm:ss');
    return `${level}: ${timestamp} ${message}`;
  })
);

// Custom format for console logging with colors
const fileLogFormat = format.combine(
    format.printf(({ level, message, timestamp }) => {
      timestamp = moment(timestamp).format('DD-MM-YYYY HH:mm:ss');
      return `${level}: ${timestamp} ${message}`;
    })
);


// Create a Winston logger for file and console
const logger = createLogger({
  level: 'verbose',
  transports: [
    // add logs to console
    new transports.Console({
      format: consoleLogFormat
    }),

    // add logs to a file
    new transports.File({
      filename: 'src/logs/app.log',
      format: fileLogFormat
    })
  ],
});

const fileLogger = createLogger({
  level: 'verbose',
  transports: [
    new transports.File({
      filename: 'src/logs/app.log',
      format: fileLogFormat
    })
  ],
});

const consoleLogger = createLogger({
  level: 'verbose',
  transports: [
    new transports.Console({
      format: consoleLogFormat
    }),
  ],
});


export {logger, fileLogger, consoleLogger};