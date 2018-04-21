import angular from 'angular';
import mocks from 'angular-mocks';

import * as app from './public/app/app.module';

let context = require.context('./public/backend', true, /\.spec\.js/);
context.keys().forEach(context);
