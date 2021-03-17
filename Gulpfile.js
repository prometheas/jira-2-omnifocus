'use strict';

var gulp = require('gulp');
var del = require('del');
var mocha = require('gulp-mocha');
var sass = require('gulp-sass');
var browserify = require('gulp-browserify');
var shell = require('gulp-shell');

var eslint = require('gulp-eslint');
var scsslint = require('gulp-scss-lint');

gulp.task('clean', function clean(done) {
  del(['./build/', './vendor/']);
  done();
});

gulp.task('fetch-zepto', shell.task(
  'mkdir -p vendor/zeptojs && curl -s https://zeptojs.com/zepto.min.js > vendor/zeptojs/zepto.min.js'
));

gulp.task('fetch-turndown', shell.task(
  'mkdir -p vendor/turndown && curl -s https://unpkg.com/turndown@7.0.0/dist/turndown.js > vendor/turndown/turndown.js'
));

gulp.task('build:add-vendor-js', gulp.series(
  'fetch-zepto',
  'fetch-turndown',
  (done) => {
    gulp
      .src('./vendor/**/*.js')
      .pipe(gulp.dest('./build/chrome/js/vendor'))
      .pipe(gulp.dest('./build/firefox/js/vendor'));

      done();
  }
));

gulp.task('build:js', function buildJs(done) {
  gulp
    .src('source/js/*.js')
    .pipe(browserify({
      insertGlobals: true,
      // debug: !gulp.env.production
    }))
    .pipe(gulp.dest('build/chrome/js'))
    .pipe(gulp.dest('build/firefox/js'));

  done();
});

gulp.task('build:main', function buildMain(done) {
  gulp
    .src('source/*.*')
    .pipe(gulp.dest('build/chrome'))
    .pipe(gulp.dest('build/firefox'));

  done();
});

gulp.task('build:images', function buildImages(done) {
  gulp
    .src('source/images/**')
    .pipe(gulp.dest('build/chrome/images'))
    .pipe(gulp.dest('build/firefox/images'));

  done();
});

gulp.task('build:scss', function buildCss(done) {
  gulp
    .src('source/styles/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('build/chrome/css'))
    .pipe(gulp.dest('build/firefox/css'));

  done();
});

gulp.task('lint:js', function lintJs(done) {
  gulp
    .src('source/js/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());

  done();
});

gulp.task('lint:scss', function lintScss(done) {
  gulp
    .src('source/**/*.scss')
    .pipe(scsslint())
    .pipe(scsslint.failReporter());

  done();
});

gulp.task('test:unit', function testUnit(done) {
  gulp
    .src('test/unit/**/*.spec.js')
    .pipe(mocha());

  done();
});

gulp.task('dev:tdd', function devTdd(done) {
  var files = [
    'lib/*.js',
    'lib/**/*.js',
    'test/**/*spec.js'
  ];

  gulp.watch(files, gulp.series('test:unit'));

  done();
});

gulp.task('build', gulp.series('build:scss', 'build:js', 'build:main', 'build:images', 'build:add-vendor-js'));
gulp.task('lint', gulp.series('lint:js', 'lint:scss'));

gulp.task('default', gulp.series('build'));
