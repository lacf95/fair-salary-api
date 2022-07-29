const fs = require('fs').promises;
const R = require('ramda');

const prettify = content => JSON.stringify(content, null, 2);

module.exports = R.curry(
  async (file, content) => fs.writeFile(file, prettify(content))
);
