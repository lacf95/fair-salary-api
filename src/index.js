import * as R from 'ramda';

import sha256 from './misc/sha-256.js';
import composeAsync from './misc/compose-async.js';
import { errorResponse } from './misc/json-response.js';

import routerHandle from './router.js';

const checkCacheBeforeRespond = async (event) => {
  const hash = await composeAsync([sha256, R.invoker(0, 'text'), R.invoker(0, 'clone')])(event.request);
  const cacheUrl = new URL(event.request.url);

  cacheUrl.pathname = '/posts' + cacheUrl.pathname + hash;

  const cacheKey = new Request(cacheUrl.toString(), {
    headers: event.request.headers,
    method: 'GET',
  });

  const cache = caches.default;

  const cachedResponse = await cache.match(cacheKey);

  if (cachedResponse) {
    console.log(`Cached request [${cacheUrl.toString()}]`);
    return cachedResponse;
  }

  console.log(`Processing non-cached request [${cacheUrl.toString()}]`);
  try {
    const response = await routerHandle(event.request);
    event.waitUntil(cache.put(cacheKey, response.clone()));
    return response;
  } catch(err) {
    console.log(`Something went wrong with request [${cacheUrl.toString()}]`);
    console.log(err);
    return errorResponse(err);
  }
};

addEventListener('fetch', event => event.respondWith(checkCacheBeforeRespond(event)));
