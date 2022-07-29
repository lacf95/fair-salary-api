const fs = require('fs').promises;

const composeAsync = require('../misc/compose-async.js');

module.exports = file => async () => composeAsync([
  JSON.parse,
  fs.readFile
])(file);
