import * as R from 'ramda';

import composeAsync from '../misc/compose-async.js';
import { milisecondsToSeconds } from '../misc/date-time.js';

import * as salaryAdjustment from '../models/salary-adjustment.js';
import * as monthlyInflationRate from '../models/monthly-inflation-rate.js';

const toUnixTime = R.compose(milisecondsToSeconds, Date.parse);

const calculate = async request => {
  const { date, salary } = await composeAsync([R.evolve({ date: toUnixTime }), R.invoker(0, 'json')])(request);
  const inflationRate = monthlyInflationRate.inflationRateSince(date);
  const result = salaryAdjustment.calculate(salary, inflationRate);

  return new Response(JSON.stringify(result), { status: 200, headers: { 'Content-type': 'application/json' } });
};

export { calculate };
