/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */

const gulp = require('gulp');
const del = require('del');
const bower = require('gulp-bower');
const mocha = require('gulp-mocha');
const sass = require('gulp-sass');
const browserify = require('gulp-browserify');
const shell = require('gulp-shell');

const eslint = require('gulp-eslint');
const scsslint = require('gulp-scss-lint');

gulp.task('clean', () => del(['./build/', './vendor/']));

gulp.task('bower:install', () => bower());

gulp.task('bower:build-zepto', ['bower:install'], shell.task('npm install && npm run dist', {
  cwd: 'vendor/zeptojs',
}));

gulp.task('build:add-vendor-js', ['bower:build-zepto'], () => gulp
  .src('vendor/**/*.min.js')
  .pipe(gulp.dest('build/chrome/js/vendor'))
  .pipe(gulp.dest('build/firefox/js/vendor')));

gulp.task('build:js', () => gulp
  .src('source/js/*.js')
  .pipe(browserify({
    insertGlobals: true,
    debug: !gulp.env.production,
  }))
  .pipe(gulp.dest('build/chrome/js'))
  .pipe(gulp.dest('build/firefox/js')));

gulp.task('build:main', () => gulp
  .src('source/*.*')
  .pipe(gulp.dest('build/chrome'))
  .pipe(gulp.dest('build/firefox')));

gulp.task('build:images', () => gulp
  .src('source/images/**')
  .pipe(gulp.dest('build/chrome/images'))
  .pipe(gulp.dest('build/firefox/images')));

gulp.task('build:scss', () => gulp
  .src('source/styles/*.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest('build/chrome/css'))
  .pipe(gulp.dest('build/firefox/css')));

gulp.task('lint:js', () => gulp
  .src('source/js/*.js')
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError()));

gulp.task('lint:scss', () => gulp
  .src('source/**/*.scss')
  .pipe(scsslint())
  .pipe(scsslint.failReporter()));

gulp.task('test:unit', () => gulp
  .src('test/unit/**/*.spec.js')
  .pipe(mocha()));

gulp.task('dev:tdd', () => {
  const files = [
    'lib/*.js',
    'lib/**/*.js',
    'test/**/*spec.js',
  ];

  return gulp
    .watch(files, ['test:unit']);
});

gulp.task('build', ['build:scss', 'build:js', 'build:main', 'build:images', 'build:add-vendor-js']);
gulp.task('lint', ['lint:js', 'lint:scss']);

gulp.task('default', ['build']);
