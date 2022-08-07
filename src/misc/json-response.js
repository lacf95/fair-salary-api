import * as R from 'ramda';

import errorToJson from '../misc/error-to-json.js';

const allowedOrigins = ALLOWED_ORIGINS.split(', ');

const jsonResponse = (req, res, status = 200) => {
  return new Response(JSON.stringify(res), {
    status, headers: {
      'Access-Control-Allow-Headers': 'Content-type, Origin',
      'Access-Control-Allow-Origin': R.compose(
        R.ifElse(
          R.includes(R.__, allowedOrigins),
          R.identity,
          R.always("")
        ),
        R.invoker(1, 'get')('origin'),
        R.prop('headers')
      )(req),
      'Access-Control-Allow-Methods': 'GET,HEAD,POST,OPTIONS',
      'Content-type': 'application/json'
    }
  });
};
const errorResponse = (req, err = {}) => jsonResponse(req, { message: 'Error.', ...errorToJson(err) }, 500);

const notFoundResponse = req => jsonResponse(req, { message: 'Not found.' }, 404);

const okResponse = (req, res = {}) => jsonResponse(req, { message: 'Ok.', ...res }, 200);

export { jsonResponse as default, errorResponse, notFoundResponse, okResponse };
