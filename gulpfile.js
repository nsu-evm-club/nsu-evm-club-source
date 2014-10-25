var gulp = require('gulp');
var connect = require('gulp-connect');
var jade = require('gulp-jade');
var rename = require('gulp-rename');
var less = require('gulp-less');
var minifyCSS = require('gulp-minify-css');
var path = require('path');

var lib = require('./lib');

gulp.task('styles', function () {
  gulp.src('./src/less/main.less')
    .pipe(less())
    .pipe(minifyCSS())
    .pipe(gulp.dest('./dest/css/'));
});

gulp.task('pages', function () {
  var dataConfig = require('./data/config');
  var pages = lib.preparePages(dataConfig);
  pages.forEach(function (page) {
    gulp.src(page.src)
      .pipe(jade({
        locals: page.options
      }))
      .pipe(rename({
        basename: 'index'
      }))
      .pipe(gulp.dest(page.dest));
  });
});

gulp.task('static', function () {
  gulp.src('./data/static/**/*').pipe(gulp.dest('./dest/'));
});

gulp.task('default', ['styles', 'pages', 'static']);

gulp.task('watch', function () {
  gulp.watch(['./src/less/main.less'], ['styles']);
  gulp.watch(['./src/template/**/*.jade', './data/**/*.md', './data/config.json'], ['pages']);
  gulp.watch(['./data/static/**/*'], ['static']);
});

gulp.task('serve', ['default', 'watch'], function () {
  connect.server({
    root: './dest'
  });
});