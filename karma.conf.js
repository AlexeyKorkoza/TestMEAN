module.exports = config => {
  config.set({
    basePath: "",

    frameworks: ["jasmine"],

    files: [
      "node_modules/jquery/dist/jquery.min.js",
      "node_modules/angular/angular.js",
      "node_modules/angular-mocks/angular-mocks.js",
      "node_modules/angular-route/angular-route.min.js",
      "node_modules/selectize/dist/js/standalone/selectize.min.js",
      "node_modules/angular-loading-bar/build/loading-bar.min.js",
      "node_modules/ng-file-upload/dist/ng-file-upload.min.js",
      "node_modules/ng-file-upload/dist/ng-file-upload-shim.min.js",
      "node_modules/angular-selectize2/dist/selectize.js",
      "node_modules/angular-simple-logger/dist/angular-simple-logger.js",
      "node_modules/ui-leaflet/dist/ui-leaflet.min.js",
      "app/assets/js/*.js",

      "app/*.js",
      "app/Main/main.controller.js",
      "app/Place/*.js",
      "app/SignIn/*.js",
      "app/SignUp/*.js",
      "app/Type/*.js",
      "app/services/*.js",
      "app/test/*.js"
    ],

    exclude: [],

    preprocessors: {},

    reporters: ["progress"],

    port: 9876,

    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: true,

    browsers: ["Chrome"],

    singleRun: false,

    concurrency: Infinity
  });
};