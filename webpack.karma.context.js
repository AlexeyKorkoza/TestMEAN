import angular from 'angular';
import mocks from 'angular-mocks';

import * as app from './public/app/app.module';

let context = require.context('./public/app', true, /\.spec\.js/);
context.keys().forEach(context);
