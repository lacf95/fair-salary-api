import composeAsync from '../misc/compose-async.js';
import fs from 'fs';

export default file => async () => composeAsync([
  JSON.parse,
  fs.readFile
])(file);
