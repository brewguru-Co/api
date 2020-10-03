const createError = require('http-errors');

/*
 * Data Scale Function
 */

function oneDimensional(x1, x2, y1, y2) {
  const a = (y2 - y1) / (x2 - x1);
  const b = y1 - a * x1;
  return (x) => a * x + b;
}

/*
 * start, end - 15분 단위
 */

function build(start, end, factors, f) {
  const {
    phFrom,
    phTo,
    tempFrom,
    tempTo,
    doxFrom,
    doxTo,
    brixFrom,
    brixTo,
  } = factors;
  const FIFTEEN_MINUTES = 60 * 15;
  const count = Math.floor((end - start) / FIFTEEN_MINUTES) + 1;

  const phFn = f(0, count - 1, phFrom, phTo);
  const tempFn = f(0, count - 1, tempFrom, tempTo);
  const doxFn = f(0, count - 1, doxFrom, doxTo);
  const brixFn = f(0, count - 1, brixFrom, brixTo);

  const data = [];
  for (let i = 0; i < count; i++) {
    data.push({
      timestamp: start + i * FIFTEEN_MINUTES,
      ph: Number(phFn(i).toFixed(2)),
      temp: Number(tempFn(i).toFixed(2)),
      dox: Number(doxFn(i).toFixed(2)),
      brix: Number(brixFn(i).toFixed(2)),
    });
  }
  return data;
}

function buildData(start, end, factors) {
  return build(start, end, factors, oneDimensional);
}

function getFakeBatchData(start, end, id) {
  switch (id) {
    case 1:
      return buildData(start, end, {
        phFrom: 4.2,
        phTo: 2.4,
        tempFrom: 32,
        tempTo: 24,
        doxFrom: 10,
        doxTo: 5,
        brixFrom: 0.9,
        brixTo: 0.3,
      });
    case 2:
      return buildData(start, end, {
        phFrom: 3.9,
        phTo: 2.4,
        tempFrom: 31.5,
        tempTo: 24.5,
        doxFrom: 9,
        doxTo: 5.5,
        brixFrom: 0.89,
        brixTo: 0.32,
      });
    case 3:
      return buildData(start, end, {
        phFrom: 4.19,
        phTo: 2.45,
        tempFrom: 31.2,
        tempTo: 25,
        doxFrom: 9.9,
        doxTo: 5.2,
        brixFrom: 0.9,
        brixTo: 0.3,
      });
    default:
      return buildData(start, end, {
        phFrom: 3.5,
        phTo: 2.9,
        tempFrom: 29,
        tempTo: 23,
        doxFrom: 10,
        doxTo: 5,
        brixFrom: 0.9,
        brixTo: 0.3,
      });
  }
}

async function getData(req, res, next) {
  try {
    const { batchId } = req.params;
    const start = 1567296000;
    const end = 1601424000;
    return res.send(getFakeBatchData(start, end, batchId));
  } catch (e) {
    return next(createError(400, e.message));
  }
}

module.exports = {
  getData,
};
