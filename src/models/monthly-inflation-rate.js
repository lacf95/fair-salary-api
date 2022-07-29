const R = require('ramda');
const fs = require('fs').promises;

const composeAsync = require('../misc/compose-async.js');
const storeJson = require('../misc/store-json.js')(process.env.MONTHLY_INFLATION_RATES_FILE);
const readJson = require('../misc/read-json.js')(process.env.MONTHLY_INFLATION_RATES_FILE);
const { secondsToMiliseconds } = require('../misc/date-time.js');

const toJsTime = R.compose(a => new Date(a), secondsToMiliseconds);
const sortDesc = R.sort((a, b) => a.date - b.date);
const sortAsc = R.sort((a, b) => b.date - a.date);
const rateProp = R.prop('rate');

const monthsSincePreviousRate = async date => composeAsync([R.length, sortAsc, R.filter(a => a.date >= date), readJson])();

const previousRate = async date => composeAsync([rateProp, R.last, sortAsc, R.filter(a => a.date >= date), readJson])();

const latestRate = composeAsync([rateProp, R.last, sortDesc, readJson]);

const calculateInflationRate = async (a, b, c) => ((await a / await b) ** (1 / await c) - 1) * 100;

const inflationRateSince = R.converge(calculateInflationRate, [latestRate, previousRate, monthsSincePreviousRate]);

const store = storeJson;

module.exports = { inflationRateSince, store };
