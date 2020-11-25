const morgan = require('morgan');
const format = require('date-fns/format');
const { koLocale } = require('date-fns/locale/ko');

function jsonFormat(tokens, req, res) {
  const localTime = format(Date.now(), "yyyy-MM-dd'T'HH:mm:ss.SSSxx", { locale: koLocale });

  return JSON.stringify({
    'remote-address': tokens['remote-addr'](req, res),
    time: localTime,
    method: tokens.method(req, res),
    url: tokens.url(req, res),
    'http-version': tokens['http-version'](req, res),
    'status-code': tokens.status(req, res),
    'content-length': tokens.res(req, res, 'content-length'),
    referrer: tokens.referrer(req, res),
    'user-agent': tokens['user-agent'](req, res),
  });
}

module.exports = function loggingMiddleware() {
  return morgan(jsonFormat);
};
