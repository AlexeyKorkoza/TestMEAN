'use strict';

const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const cssmin = require('gulp-minify-css');
const livereload = require('gulp-livereload');
const concat = require('gulp-concat');
const csslint = require('gulp-csslint');
const nodemon = require('gulp-nodemon');

const js = [
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/angular/angular.min.js',
    'node_modules/angular-ui-router/release/angular-ui-router.min.js',
    'node_modules/selectize/dist/js/standalone/selectize.min.js',
    'node_modules/angular-loading-bar/build/loading-bar.min.js',
    'node_modules/ng-file-upload/dist/ng-file-upload.min.js',
    'node_modules/ng-file-upload/dist/ng-file-upload-shim.min.js',
    'node_modules/leaflet/dist/leaflet.js',
    'node_modules/bootstrap/dist/js/bootstrap.min.js',
    'node_modules/angular-selectize2/dist/selectize.js',
    'node_modules/sweetalert/dist/sweetalert.min.js',
    'node_modules/angular-simple-logger/dist/angular-simple-logger.js',
    'node_modules/ui-leaflet/dist/ui-leaflet.min.js',
    'node_modules/leaflet.markercluster/dist/leaflet.markercluster.js',
    './app/assets/js/*.js',
    './app/app.module.js',
    './app/app.routes.js',
    './app/jwt.factory.js',
    './app/services/*.js',
    './app/directives/**/*.js',
    './app/signIn/*.js',
    './app/map/*.js',
    './app/signUp/*.js',
    './app/place/*.js',
    './app/type/*.js',
    './app/profile/*.js'
];

const css = [
    'node_modules/bootstrap/dist/css/bootstrap.min.css',
    'node_modules/normalize.css/normalize.css',
    'node_modules/leaflet/dist/leaflet.css',
    'node_modules/selectize/dist/css/selectize.default.css',
    'node_modules/sweetalert/dist/sweetalert.css',
    'node_modules/angular-loading-bar/build/loading-bar.min.css',
    'node_modules/leaflet.markercluster/dist/*.css',
    './app/assets/css/style.css',
    './app/assets/css/fonts.css'
];

gulp.task('js', () => {
    return gulp
        .src(js)
        .pipe(concat('build.js'))
        .pipe(gulp.dest('./build/'))
        .pipe(livereload());
});

gulp.task('css', () => {
    return gulp
        .src(css)
        .pipe(
            autoprefixer({
                browsers: ['last 2 versions'],
                cascade: false
            })
        )
        .pipe(cssmin())
        .pipe(csslint())
        .pipe(concat('build.css'))
        .pipe(gulp.dest('./build/'))
        .pipe(livereload());
});

gulp.task('watch', ['js'], () => {
    gulp.watch('app/**/*.js', ['js']);
});

gulp.task('start', ['css', 'js', 'watch']);