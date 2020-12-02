const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const loggingMiddleware = require('./middlewares/logging');
const tokenMiddleware = require('./middlewares/token');

const indexRouter = require('./routes/index');
const teasRouter = require('./routes/teas');
const teaOffsetsRouter = require('./routes/teaOffsets');
const tankRouter = require('./routes/tanks');
const batchRouter = require('./routes/batchs');
const batchDataRouter = require('./routes/batchDatas');
const materialRouter = require('./routes/materials');
const tankDataRouter = require('./routes/tankDatas');
const notificationRouter = require('./routes/notifications');
const notificationTargetRouter = require('./routes/notificationTargets');
const authRouter = require('./routes/auth');

const error = require('./helpers/error');
const logger = require('./helpers/logger');

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, PATCH, POST, DELETE');
  next();
});

app.use(cookieParser());
app.use(tokenMiddleware);
app.use(loggingMiddleware());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/teas', teasRouter);
app.use('/tea-offsets', teaOffsetsRouter);
app.use('/tanks', tankRouter);
app.use('/notifications', notificationRouter);
app.use('/notification-targets', notificationTargetRouter);
app.use('/tank-datas', tankDataRouter);
app.use('/batchs', batchRouter);
app.use('/batch-data', batchDataRouter);
app.use('/materials', materialRouter);
app.use('/auth', authRouter);

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
