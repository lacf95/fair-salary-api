import * as R from 'ramda';

import composeAsync from '../misc/compose-async.js';
import { milisecondsToSeconds } from '../misc/date-time.js';
import { okResponse } from '../misc/json-response.js';

import { calculate as calculateSalaryAdjustment } from '../models/salary-adjustment.js';
import { inflationRateSince } from '../models/monthly-inflation-rate.js';

const toUnixTime = R.compose(milisecondsToSeconds, Date.parse);

const calculate = async req => {
  const res = await composeAsync([
    R.assoc('salaryAdjustment', R.__, {}),
    R.converge(
      calculateSalaryAdjustment, [
        R.compose(R.prop('salary')),
        R.compose(inflationRateSince, toUnixTime, R.prop('date'))
      ]
    ),
    R.invoker(0, 'json')
  ])(req);

  return okResponse(req, res);
};

export { calculate };
