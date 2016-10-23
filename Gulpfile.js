var gulp = require('gulp');
var del = require('del');
var sass = require('gulp-sass');

var eslint = require('gulp-eslint');
var scsslint = require('gulp-scss-lint');

gulp.task('clean', function clean() {
  return del(['./build/']);
});

gulp.task('build:js', function buildJs() {
  return gulp
    .src('js/*.js')
    .pipe(gulp.dest('build/chrome/js'))
    .pipe(gulp.dest('build/firefox/js'))
    .pipe(gulp.dest('build/safari/js'));
});

gulp.task('build:scss', function buildCss() {
  return gulp
    .src('source/styles/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('build/chrome/css'))
    .pipe(gulp.dest('build/firefox/css'))
    .pipe(gulp.dest('build/safari/css'));
});

gulp.task('lint:js', function lintJs() {
  return gulp
    .src('js/*.js')
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

gulp.task('build', ['build:scss', 'build:js']);
gulp.task('lint', ['lint:js', 'lint:scss']);

gulp.task('default', ['build']);
