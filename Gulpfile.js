'use strict';

var gulp = require('gulp');
var del = require('del');
var bower = require('gulp-bower');
var mocha = require('gulp-mocha');
var sass = require('gulp-sass');
var browserify = require('gulp-browserify');
var shell = require('gulp-shell');

var eslint = require('gulp-eslint');
var scsslint = require('gulp-scss-lint');

gulp.task('clean', function clean() {
  return del(['./build/', './vendor/']);
});

gulp.task('bower:install', function bowerInstall() {
  return bower();
});

gulp.task('bower:build-zepto', ['bower:install'], shell.task('npm install && npm run dist', {
  cwd: 'vendor/zeptojs'
}));

gulp.task('build:add-vendor-js', ['bower:build-zepto'], function vendorDeps() {
  return gulp
    .src('vendor/**/*.min.js')
    .pipe(gulp.dest('build/chrome/js/vendor'))
    .pipe(gulp.dest('build/firefox/js/vendor'));
});

gulp.task('build:js', function buildJs() {
  return gulp
    .src('source/js/*.js')
    .pipe(browserify({
      insertGlobals: true,
      debug: !gulp.env.production
    }))
    .pipe(gulp.dest('build/chrome/js'))
    .pipe(gulp.dest('build/firefox/js'));
});

gulp.task('build:main', function buildMain() {
  return gulp
    .src('source/*.*')
    .pipe(gulp.dest('build/chrome'))
    .pipe(gulp.dest('build/firefox'));
});

gulp.task('build:images', function buildImages() {
  return gulp
    .src('source/images/**')
    .pipe(gulp.dest('build/chrome/images'))
    .pipe(gulp.dest('build/firefox/images'));
});

gulp.task('build:scss', function buildCss() {
  return gulp
    .src('source/styles/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('build/chrome/css'))
    .pipe(gulp.dest('build/firefox/css'));
});

gulp.task('lint:js', function lintJs() {
  return gulp
    .src('source/js/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('lint:scss', function lintScss() {
  return gulp
    .src('source/**/*.scss')
    .pipe(scsslint())
    .pipe(scsslint.failReporter());
});

gulp.task('test:unit', function testUnit() {
  return gulp
    .src('test/unit/**/*.spec.js')
    .pipe(mocha());
});

gulp.task('dev:tdd', function devTdd() {
  var files = [
    'lib/*.js',
    'lib/**/*.js',
    'test/**/*spec.js'
  ];

  return gulp
    .watch(files, ['test:unit']);
});

gulp.task('build', ['build:scss', 'build:js', 'build:main', 'build:images', 'build:add-vendor-js']);
gulp.task('lint', ['lint:js', 'lint:scss']);

gulp.task('default', ['build']);
