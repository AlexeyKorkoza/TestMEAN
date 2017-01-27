'use strict';

var gulp = require('gulp'),
  watch = require('gulp-watch'),
  autoprefixer = require('gulp-autoprefixer'),
  uglify = require('gulp-uglify'),
  cssmin = require('gulp-minify-css'),
  refresh = require('gulp-livereload'),
  concat = require('gulp-concat'),
  csslint = require('gulp-csslint'),
  jscpd = require('gulp-jscpd'),
  jshint = require('gulp-jshint');

gulp.task('jshint', function () {
  return gulp.src([
    './js/*.js',
    './js/Main/*.js',
    './js/SignIn/*.js',
    './js/SignUp/*.js',
    './js/Place/*.js',
    './js/directivies/*.js',
    './js/TypeOfPlace/*.js',
    './js/UserProfile/*.js'
  ])
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
});

gulp.task('scripts', function () {
  return gulp.src([
    'node_modules/angular/angular.min.js',
    'node_modules/angular-route/angular-route.min.js',
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/selectize/dist/js/standalone/selectize.min.js',
    'lib/angular-cookie.min.js',
    'node_modules/ng-token-auth/dist/ng-token-auth.min.js',
    'node_modules/angular-loading-bar/build/loading-bar.min.js',
    'lib/angular-animate.min.js',
    'lib/angular-responsive-tables.min.js',
    'node_modules/ng-file-upload/dist/ng-file-upload.min.js',
    'node_modules/ng-file-upload/dist/ng-file-upload-shim.min.js',
    'node_modules/leaflet/dist/leaflet.js',
    'node_modules/bootstrap/dist/js/bootstrap.min.js',
    'node_modules/angular-selectize2/dist/selectize.js',
    'node_modules/leaflet-routing-machine/dist/leaflet-routing-machine.min.js',
    'node_modules/sweetalert/dist/sweetalert.min.js',
    './app/js/*.js',
    './app/Main/*.js',
    './app/SignIn/*.js',
    './app/SignUp/*.js',
    './app/Place/*.js',
    './TypeOfPlace/*.js',
    './UserProfile/*.js',
    './services/*.js',
    './directivies/*.js'
  ])
    .on('error', console.log)
    .pipe(concat('build.js'))
    .pipe(jscpd())
    .pipe(gulp.dest('./build/'));
});

gulp.task('styles', function () {
  return gulp.src([
    'node_modules/bootstrap/dist/css/bootstrap.min.css',
    'node_modules/normalize.css/normalize.css',
    'app/css/*.css',
    'node_modules/leaflet/dist/leaflet.css',
    'node_modules/selectize/dist/css/selectize.default.css',
    'node_modules/leaflet-routing-machine/dist/leaflet-routing-machine.css',
    'node_modules/sweetalert/dist/sweetalert.css',
    'node_modules/angular-loading-bar/build/loading-bar.min.css',
    'node_modules/font-awesome/css/font-awesome.min.css',
    'lib/angular-responsive-tables.min.css'
  ])
    .on('error', console.log)
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(cssmin())
    .pipe(csslint())
    .pipe(concat('build.css'))
    .pipe(gulp.dest('./build/'));
});

gulp.task('watch', function () {
  gulp.watch(['css/*'], ['styles']);
  gulp.watch(['js/*'], ['scripts']);
  gulp.watch(['js/*.js', 'js/Main/*.js'], ['jshint']);
});

gulp.task('default', ['scripts', 'styles', 'watch', 'jshint']);