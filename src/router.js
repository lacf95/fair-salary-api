import { Router } from 'itty-router';

import * as salaryAdjustment from './controllers/salary-adjustment.js';
import * as monthlyInflation from './controllers/monthly-inflation.js';
import { notFoundResponse } from './misc/json-response.js';

const router = Router();

router
  .post('/salary-adjustment', salaryAdjustment.calculate)
  .get('/monthly-inflation/last', monthlyInflation.lastRate)
  .all('*', notFoundResponse);

export default router.handle;
