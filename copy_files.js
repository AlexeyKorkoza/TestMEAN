/* Copy all views */
const fs = require('fs-extra');

fs.copy('app/views', 'app/views').then(() => console.log('Files were copying'));
