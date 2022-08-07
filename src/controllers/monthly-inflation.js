import * as R from 'ramda';

import composeAsync from '../misc/compose-async.js';
import { okResponse } from '../misc/json-response.js';
import { secondsToMiliseconds } from '../misc/date-time.js';

import * as monthlyInflationRates from '../models/monthly-inflation-rate.js';

const formatDate = R.compose(R.invoker(2, 'slice')(0, 10), R.invoker(0, 'toISOString'), R.constructN(1, Date), secondsToMiliseconds);

const lastRate = async req => {
  const res = R.compose(
    R.assoc('monthlyInflationRate', R.__, {}),
    R.evolve({ date: formatDate }),
    monthlyInflationRates.last
  )();

  return okResponse(req, res);
};

export { lastRate };

