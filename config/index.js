import nconf from 'nconf';
import path from 'path';

nconf.argv()
  .env()
  .file({file: path.join(__dirname, 'config.json')});

export default nconf;