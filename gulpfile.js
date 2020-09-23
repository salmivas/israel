'use strict';

var gulp = require('gulp');
var plumber = require('gulp-plumber');
var sourcemap = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var server = require('browser-sync').create();
var csso = require('gulp-csso');
var rename = require('gulp-rename');
var imagemin = require('gulp-imagemin');
var webp = require('gulp-webp');
var svgstore = require('gulp-svgstore');
var posthtml = require('gulp-posthtml');
var include = require('posthtml-include');
var del = require('del');
var concat = require('gulp-concat');
var minify = require('gulp-minify');
var flatten = require('gulp-flatten');

gulp.task('css', function () {
  return gulp
    .src('source/sass/style.scss')
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([autoprefixer()]))
    .pipe(csso())
    .pipe(rename('style.min.css'))
    .pipe(sourcemap.write('.'))
    .pipe(gulp.dest('docs/css'))
    .pipe(server.stream());
});

gulp.task('css-full', function () {
  return gulp
    .src('source/sass/style.scss')
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([autoprefixer()]))
    .pipe(gulp.dest('docs/css'))
    .pipe(server.stream());
});

gulp.task('server', function () {
  server.init({
    server: 'docs/',
    notify: false,
    open: false,
    cors: true,
    ui: false,
  });

  gulp.watch('source/sass/**/*.{scss,sass}', gulp.series('css'));
  gulp.watch('source/img/icon-*.svg', gulp.series('sprite', 'html', 'refresh'));
  gulp.watch('source/*.html', gulp.series('html', 'refresh'));
});

gulp.task('refresh', function (done) {
  server.reload();
  done();
});

gulp.task('images', function () {
  return gulp
    .src('source/img/**/*.{png,jpg,svg}')
    .pipe(
      imagemin([
        imagemin.optipng({
          optimizationLevel: 3,
        }),
        imagemin.jpegtran({
          progressive: true,
        }),
        imagemin.svgo(),
      ])
    )
    .pipe(gulp.dest('source/img'));
});

gulp.task('webp', function () {
  return gulp
    .src('source/img/**/*.{png,jpg}')
    .pipe(webp({ quality: 90 }))
    .pipe(gulp.dest('source/img'));
});

gulp.task('sprite', function () {
  return gulp
    .src('source/img/svg-sprite/*.svg')
    .pipe(
      svgstore({
        inlineSvg: true,
      })
    )
    .pipe(rename('sprite_auto.svg'))
    .pipe(gulp.dest('docs/img'));
});

gulp.task('html', function () {
  return gulp
    .src('source/*.html')
    .pipe(posthtml([include()]))
    .pipe(gulp.dest('docs'));
});

gulp.task('main-js', function () {
  return gulp
    .src('source/js/*.js')
    .pipe(concat('main.js'))
    .pipe(
      minify({
        ext: {
          min: '.js',
        },
        noSource: true,
      })
    )
    .pipe(gulp.dest('docs/js'));
});

gulp.task('vendor-js', function () {
  return gulp
    .src('source/js/vendor/*.js')
    .pipe(concat('vendor.js'))
    .pipe(
      minify({
        ext: {
          min: '.js',
        },
        noSource: true,
      })
    )
    .pipe(gulp.dest('docs/js'));
});

gulp.task('img-copy', function () {
  return gulp.src(['source/img/webp/**', 'source/img/blocks/**']).pipe(flatten()).pipe(gulp.dest('docs/img'));
});

gulp.task('copy', function () {
  return gulp
    .src(['source/fonts/**/*.{woff,woff2}', 'source//*.ico'], {
      base: 'source',
    })
    .pipe(gulp.dest('docs'));
});

gulp.task('clean', function () {
  return del('docs');
});

gulp.task('js', gulp.series('main-js', 'vendor-js'));
gulp.task('docs', gulp.series('clean', 'copy', 'img-copy', 'css', 'css-full', 'sprite', 'html', 'js'));
gulp.task('start', gulp.series('docs', 'server'));
