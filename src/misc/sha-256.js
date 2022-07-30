import * as R from 'ramda';

import composeAsync from '../misc/compose-async.js';

const encodeToUTF8 = R.converge(R.invoker(1, 'encode'), [R.identity, R.constructN(0, TextEncoder)]);
const hashMessage = async message => crypto.subtle.digest('SHA-256', message);
const toUint8Array = R.constructN(1, Uint8Array);
const toHexString = R.compose(R.invoker(2, 'padStart')(2, '0'), R.invoker(1, 'toString')(16));
const join =R.invoker(1, 'join')('');

export default composeAsync([
  join,
  R.map(toHexString),
  Array.from,
  toUint8Array,
  hashMessage,
  encodeToUTF8
]);
