"use strict";

var gulp = require("gulp"),
  autoprefixer = require("gulp-autoprefixer"),
  cssmin = require("gulp-minify-css"),
  livereload = require("gulp-livereload"),
  concat = require("gulp-concat"),
  csslint = require("gulp-csslint"),
  nodemon = require("gulp-nodemon");

var js = [
  "node_modules/jquery/dist/jquery.min.js",
  "node_modules/angular/angular.min.js",
  "node_modules/angular-route/angular-route.min.js",
  "node_modules/selectize/dist/js/standalone/selectize.min.js",
  "node_modules/angular-loading-bar/build/loading-bar.min.js",
  "node_modules/ng-file-upload/dist/ng-file-upload.min.js",
  "node_modules/ng-file-upload/dist/ng-file-upload-shim.min.js",
  "node_modules/leaflet/dist/leaflet.js",
  "node_modules/bootstrap/dist/js/bootstrap.min.js",
  "node_modules/angular-selectize2/dist/selectize.js",
  "node_modules/sweetalert/dist/sweetalert.min.js",
  "node_modules/angular-simple-logger/dist/angular-simple-logger.js",
  "node_modules/ui-leaflet/dist/ui-leaflet.min.js",
  'node_modules/leaflet.markercluster/dist/leaflet.markercluster.js',
  "./app/assets/js/*.js",
  "./app/app.module.js",
  "./app/app.routes.js",
  "./app/jwt.factory.js",
  "./app/services/*.js",
  "./app/directivies/*.js",
  "./app/SignIn/*.js",
  "./app/Main/*.js",
  "./app/SignUp/*.js",
  "./app/Place/*.js",
  "./app/Type/*.js",
  "./app/User/*.js"
];

var css = [
  "node_modules/bootstrap/dist/css/bootstrap.min.css",
  "node_modules/normalize.css/normalize.css",
  "node_modules/leaflet/dist/leaflet.css",
  "node_modules/selectize/dist/css/selectize.default.css",
  "node_modules/sweetalert/dist/sweetalert.css",
  "node_modules/angular-loading-bar/build/loading-bar.min.css",
  'node_modules/leaflet.markercluster/dist/*.css',
  "./app/assets/css/style.css",
  "./app/assets/css/fonts.css"
];

gulp.task("js", function() {
  return gulp
    .src(js)
    .pipe(concat("build.js"))
    .pipe(gulp.dest("./build/"))
    .pipe(livereload());
});

gulp.task("css", function() {
  return gulp
    .src(css)
    .pipe(
      autoprefixer({
        browsers: ["last 2 versions"],
        cascade: false
      })
    )
    .pipe(cssmin())
    .pipe(csslint())
    .pipe(concat("build.css"))
    .pipe(gulp.dest("./build/"))
    .pipe(livereload());
});

gulp.task('watch', ['js'], function () {
  gulp.watch('app/**/*.js', ['js'])
});

gulp.task("server", function() {
  nodemon({
    script: "server.js",
    env: { NODE_ENV: "development" }
  });
});

gulp.task("start", ["server", "css", "js", "watch"]);