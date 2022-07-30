import routerHandle from './router.js';
import sha256 from './misc/sha-256.js';

const checkCacheBeforeRespond = async (event) => {
  const body = await event.request.clone().text();
  const hashedBody = await sha256(body);
  const cacheUrl = new URL(event.request.url);

  cacheUrl.pathname = '/posts' + cacheUrl.pathname + hashedBody;

  const cacheKey = new Request(cacheUrl.toString(), {
    headers: event.request.headers,
    method: 'GET',
  });

  const cache = caches.default;
  console.log(await cache.match(cacheKey))

  let response = await cache.match(cacheKey);

  if (!response) {
    response = await routerHandle(event.request);
    event.waitUntil(cache.put(cacheKey, response.clone()));
  }
  return response;
};

addEventListener('fetch', event => event.respondWith(checkCacheBeforeRespond(event)));
