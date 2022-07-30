import * as R from 'ramda';

const jsonResponse = R.curry((res, status = 200) => new Response(JSON.stringify(res), {
  status, headers: { 'Content-type': 'application/json' } 
}));

const notFoundResponse = () => jsonResponse({ message: 'Not found.' }, 404);

const okResponse = (res = {}) => jsonResponse({ message: 'Ok.', ...res }, 200);

export { jsonResponse as default, notFoundResponse, okResponse };
