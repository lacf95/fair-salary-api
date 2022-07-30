import { Router } from 'itty-router';

import * as salaryAdjustment from './controllers/salary-adjustment.js';
import { notFoundResponse } from './misc/json-response.js';

const router = Router();

router
  .post('/salary-adjustment', salaryAdjustment.calculate)
  .all('*', notFoundResponse);

export default router.handle;
