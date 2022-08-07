import { Router } from 'itty-router';

import * as salaryAdjustment from './controllers/salary-adjustment.js';
import * as monthlyInflation from './controllers/monthly-inflation.js';
import { notFoundResponse } from './misc/json-response.js';

const router = Router();

router
  .post('/salary-adjustments', salaryAdjustment.calculate)
  .get('/monthly-inflations/last', monthlyInflation.lastRate)
  .all('*', notFoundResponse);

export default router.handle;
