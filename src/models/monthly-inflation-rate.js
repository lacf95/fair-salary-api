import * as R from 'ramda';

import composeAsync from '../misc/compose-async.js';
import rates from '../storage/monthly-inflation-rates.js';
import { secondsToMiliseconds } from '../misc/date-time.js';

const toJsTime = R.compose(a => new Date(a), secondsToMiliseconds);
const sortDesc = R.sort((a, b) => a.date - b.date);
const sortAsc = R.sort((a, b) => b.date - a.date);
const rateProp = R.prop('rate');

const monthsSincePreviousRate = date => R.compose(R.length, sortAsc, R.filter(a => a.date >= date))(rates);

const previousRate = date => R.compose(rateProp, R.last, sortAsc, R.filter(a => a.date >= date))(rates);

const latestRate = () => R.compose(rateProp, R.last, sortDesc)(rates);

const calculateInflationRate = (a, b, c) => ((a / b) ** (1 / c) - 1) * 100;

const inflationRateSince = R.converge(calculateInflationRate, [latestRate, previousRate, monthsSincePreviousRate]);

export { inflationRateSince };
