const { createLogger, transports, format } = require('winston');

const {
  combine, timestamp, printf, colorize,
} = format;

const logFormat = printf(({ level, message, timestamp: ts }) => `${ts} ${level}: ${message}`);
const logger = createLogger({
  format: combine(timestamp(), colorize(), logFormat),
  transports: [
    new transports.Console({
      level: 'silly',
    }),
  ],
});

module.exports = logger;
