import * as R from 'ramda';
import { promises as fs } from 'fs';

const appendExport = content => `export default ${content};`;
const prettify = content => JSON.stringify(content, null, 2);

export default R.curry(
  async (file, content) => fs.writeFile(file, R.compose(appendExport, prettify)(content))
);
