import cacheResponseHandler from './handlers/cache-response.js';
import routerHandle from './router.js';

const responder = cacheResponseHandler(routerHandle);

addEventListener('fetch', event => event.respondWith(responder(event)));
