/* Copy all views */
const fs = require('fs-extra');

fs.copy('src/views', 'dist/views').then(() => console.log('Files were copying'));
