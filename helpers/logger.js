const { createLogger, transports, format } = require('winston');

const { combine, timestamp, json } = format;

const logger = createLogger({
  defaultMeta: { component: 'api-service' },
  format: combine(timestamp({ format: 'YYYY-MM-ddTHH:mm:ss.SSSZZ' }), json()),
  transports: [new transports.Console({ level: 'info' })],
  exceptionHandlers: [new transports.Console()],
});

module.exports = logger;
