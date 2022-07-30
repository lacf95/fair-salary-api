import routerHandle from './router.js';

addEventListener('fetch', event => event.respondWith(routerHandle(event.request)));
