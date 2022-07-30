import { Router } from 'itty-router';

import * as salaryAdjustment from './controllers/salary-adjustment.js';
// now let's create a router (note the lack of "new")
const router = Router();

// 404 for everything else
router
  .post('/salary-adjustment', salaryAdjustment.calculate)
  .all('*', () => new Response(null, { status: 404, headers: { 'Content-type': 'application/json' } }));

export default router.handle;
