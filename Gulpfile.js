var gulp = require('gulp');
var del = require('del');
var sass = require('gulp-sass');

gulp.task('clean', function clean() {
  return del(['./build/']);
});

gulp.task('build:css', function buildCss() {
  return gulp
    .src('source/styles/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('build/chrome/css'))
    .pipe(gulp.dest('build/firefox/css'))
    .pipe(gulp.dest('build/safari/css'));
});

gulp.task('build:js', function buildJs() {
  return gulp
    .src('js/*.js')
    .pipe(gulp.dest('build/chrome/js'))
    .pipe(gulp.dest('build/firefox/js'))
    .pipe(gulp.dest('build/safari/js'));
});

gulp.task('build', ['build:css', 'build:js']);

gulp.task('default', ['build']);
