const createError = require('http-errors');
const express = require('express');
const morgan = require('morgan');

const indexRouter = require('./routes/index');
const teasRouter = require('./routes/teas');
const tankRouter = require('./routes/tanks');
const notificationRouter = require('./routes/notifications');

const error = require('./helpers/error');
const logger = require('./helpers/logger');

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/teas', teasRouter);
app.use('/tanks', tankRouter);
app.use('/notifications', notificationRouter);

app.set('json replacer', (key, value) => {
  // undefined values are set to `null`
  if (typeof value === 'undefined') return null;
  return value;
});

// catch 404 and forward to error handler
app.use((req, res, next) => next(createError(404)));

// error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const errObj = error.build(err);
  logger.error(errObj);
  res.status(errObj.code);
  res.json({ error: errObj.message });
});

module.exports = app;
