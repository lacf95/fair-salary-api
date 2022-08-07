import * as R from 'ramda';

import logger from '../misc/logger.js';
import sha256 from '../misc/sha-256.js';
import composeAsync from '../misc/compose-async.js';
import { errorResponse, okResponse } from '../misc/json-response.js';

const cacheKey = (url, hash) => {
  const cacheUrl = new URL(url);
  cacheUrl.pathname = `/posts${cacheUrl.pathname}${hash}`;

  return cacheUrl.toString();
};

const cacheResponseHandler = handler => async (event) => {
  const log = logger(event);
  const cache = caches.default;

  if (event.request.method === 'OPTIONS') {
    return okResponse(event.request);
  }

  const hash = await composeAsync([sha256, R.invoker(0, 'text'), R.invoker(0, 'clone')])(event.request);
  const key = cacheKey(event.request.url, hash);
  const requestKey = new Request(key, { headers: event.request.headers, method: 'GET' });

  const cachedResponse = await cache.match(requestKey);

  if (cachedResponse) {
    log.message(`Cached request - ${key}`);
    return cachedResponse;
  }

  try {
    log.message(`Non-cached request - ${key}`);
    const response = await handler(event.request);
    event.waitUntil(cache.put(requestKey, response.clone()));
    return response;
  } catch(err) {
    log.error(err);
    return errorResponse(event.request, err);
  }
};

export default cacheResponseHandler;
