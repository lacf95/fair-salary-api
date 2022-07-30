import { Router } from 'itty-router';

import * as salaryAdjustment from './controllers/salary-adjustment.js';
// now let's create a router (note the lack of "new")
const router = Router();

// 404 for everything else
router
  .post('/api/salary-adjustment', salaryAdjustment.calculate)
  .all('*', () => new Response('Not Found.', { status: 404 }));

export default router.handle;
