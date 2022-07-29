const R = require('ramda');
const composeAsync = require('../misc/compose-async.js');
const renameKeys = require('../misc/rename-keys.js');
const { milisecondsToSeconds, toISODateString } = require('../misc/date-time.js');

const toJson = R.invoker(0, 'json');
const toNumber = x => parseFloat(x) || 0;
const toUnixTime = R.compose(milisecondsToSeconds, Date.parse, toISODateString);

const baseOptions = {
  headers: {
    'Accept': 'application/json',
    'Bmx-Token': process.env.BANXICO_TOKEN
  }
};
const mergeOptions = R.mergeDeepWith(R.concat, baseOptions);

const callAPI = async (action, options = {}) => fetch(`${process.env.BANXICO_URL}/${action}`, mergeOptions(options));

// Monthly Inflation Rate
const monthlyInflationPathResolve = R.path(['bmx', 'series', 0, 'datos']);
const monthlyInflationDigest = R.map(R.compose(
  R.evolve({ rate: toNumber, date: toUnixTime }),
  renameKeys({ dato: 'rate', fecha: 'date' })
));

const monthlyInflationRates = async () => (composeAsync([
  monthlyInflationDigest,
  monthlyInflationPathResolve,
  toJson,
  callAPI
])(process.env.BANXICO_MONTHLY_INFLATION_ACTION));

module.exports = { monthlyInflationRates };
