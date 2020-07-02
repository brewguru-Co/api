const createError = require('http-errors');
const express = require('express');
const morgan = require('morgan');

const indexRouter = require('./routes/index');
const teasRouter = require('./routes/teas');
const tankRouter = require('./routes/tanks');

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/teas', teasRouter);
app.use('/tanks', tankRouter);

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
  const errCode = err.status || 500;
  res.status(errCode);

  if (errCode >= 500) {
    res.send({ error: 'Internal server error' });
  } else {
    res.send({ error: err.message });
  }
});

module.exports = app;
