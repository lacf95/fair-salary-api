const R = require('ramda');
const router = require('express').Router();
const composeAsync = require('../misc/compose-async.js');
const salaryInflation = require('../models/salary-inflation.js');
const monthlyInflationRate = require('../models/monthly-inflation-rate.js')
const { milisecondsToSeconds } = require('../misc/date-time.js');

const toUnixTime = R.compose(milisecondsToSeconds, Date.parse);

router.post('/', async ({ body }, res) => composeAsync([
  res.json.bind(res),
  salaryInflation.calculate(body.salary),
  monthlyInflationRate.inflationRateSince,
  toUnixTime
])(body.date));

module.exports = router;
