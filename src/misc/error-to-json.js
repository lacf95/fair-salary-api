import * as R from 'ramda';

const stringifyWithOwnProperties = obj => JSON.stringify(obj, Object.getOwnPropertyNames(obj));
const errorToJson = R.compose(JSON.parse, stringifyWithOwnProperties);

export default errorToJson;
