import angular from 'angular';
import * as app from './public/app/app.module';

let context = require.context('./public/app', true, /\.spec\.js/);
context.keys().forEach(context);