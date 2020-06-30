const createError = require('http-errors');
const express = require('express');
const morgan = require('morgan');

const indexRouter = require('./routes/index');
const teasRouter = require('./routes/teas');

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/teas', teasRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => next(createError(404)));

// error handler
app.use((err, req, res) => {
  const errCode = err.status || 500;
  res.status(errCode);

  if (errCode >= 500) {
    res.send('Internal server error');
  } else {
    res.send(err.message);
  }
});

module.exports = app;
