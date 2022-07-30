import * as R from 'ramda';

const handleAsync = async (fn, res) => res && res.then ? res.then(fn) : fn(res);

export default R.composeWith(handleAsync);
