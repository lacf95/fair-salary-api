import * as R from 'ramda';

import errorToJson from '../misc/error-to-json.js';

const jsonResponse = R.curry((res, status = 200) => new Response(JSON.stringify(res), {
  status, headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-type': 'application/json'
  }
}));

const errorResponse = (err = {}) => jsonResponse({ message: 'Error.', ...errorToJson(err) }, 500);

const notFoundResponse = () => jsonResponse({ message: 'Not found.' }, 404);

const okResponse = (res = {}) => jsonResponse({ message: 'Ok.', ...res }, 200);

export { jsonResponse as default, errorResponse, notFoundResponse, okResponse };
