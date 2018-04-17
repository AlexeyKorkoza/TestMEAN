/* Copy all views */
const fs = require('fs-extra');

const source = 'app/views';
const destination = 'dist/views';

fs.copy(source, destination);
