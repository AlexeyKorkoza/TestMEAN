/* Copy all views */
const fs = require('fs-extra');

fs.copy('app/views', 'dist/views').then(() => console.log('Files were copying'));
