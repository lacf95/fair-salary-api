import * as R from 'ramda';

import composeAsync from '../misc/compose-async.js';
import rates from '../storage/inpc.js';
import { secondsToMiliseconds } from '../misc/date-time.js';

const sortDesc = R.sort((a, b) => a.date - b.date);
const rateProp = R.prop('rate');

const previousRate = date => R.compose(rateProp, R.last, sortDesc, R.filter(a => a.date < date))(rates);
const lastRate = () => R.compose(rateProp, R.last, sortDesc)(rates);
const lastMonthlyRate = () => R.compose(R.last, sortDesc)(rates);
const variation = R.curry((a, b) => (((b / a) - 1) * 100));

const inflationRateSince = R.converge(variation, [previousRate, lastRate]);

export { inflationRateSince, lastMonthlyRate as last };
