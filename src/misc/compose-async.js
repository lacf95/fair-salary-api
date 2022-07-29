const R = require('ramda');

const handleAsync = async (fn, res) => res && res.then ? res.then(fn) : fn(res);

module.exports = composeAsync = R.composeWith(handleAsync);
