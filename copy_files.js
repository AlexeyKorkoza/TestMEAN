/* Copy all views */
const fs = require('fs-extra');

fs.copy('app/views', 'app/dist/views').then(() => console.log('Files were copying'));
