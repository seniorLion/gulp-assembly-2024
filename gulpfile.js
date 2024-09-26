const gulp = require('gulp')
const less = require('gulp-less')
const rename = require('gulp-rename')
const cleanCss = require('gulp-clean-css')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')
const concat = require('gulp-concat')
const sourcemaps = require('gulp-sourcemaps')
const autoprefixer = require('gulp-autoprefixer')
const imagemin = require('gulp-imagemin')
const htmlmin = require('gulp-htmlmin');
const size = require('gulp-size')
const newer = require('gulp-newer');
const del = require('del')

const path = {
  html: {
    src: 'src/*.html',
    dest: 'dist'
  },
  styles: {
    src: 'src/styles/**/*.less',
    dest: 'dist/css'
  },
  scripts: {
    src: 'src/scripts/**/*.js',
    dest: 'dist/js'
  },
  images: {
    src: 'src/img/*',
    dest: 'dist/img'
  }
}

function clean() {
  return del(['dist/*', '!dist/img'])
}

function html() {
  return gulp.src(path.html.src)
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(size({
      showFiles: true
    }))
    .pipe(gulp.dest(path.html.dest));
}

function styles() {
  return gulp.src(path.styles.src)
  .pipe(sourcemaps.init())
  .pipe(less())
  .pipe(autoprefixer({
    cascade: false
  }))
  .pipe(cleanCss({
    level: 2
  }))
  .pipe(rename({
    basename: 'main',
    suffix: '.min'
  }))
  .pipe(sourcemaps.write('.'))
  .pipe(size({
    showFiles: true
  }))
  .pipe(gulp.dest(path.styles.dest))
}

function scripts() {
  return gulp.src(path.scripts.src)
  .pipe(sourcemaps.init())
  .pipe(babel({
    presets: ['@babel/env']
  }))
  .pipe(uglify())
  .pipe(concat('main.min.js'))
  .pipe(sourcemaps.write('.'))
  .pipe(size({
    showFiles: true
  }))
  .pipe(gulp.dest(path.scripts.dest))
}

function img() {
  return gulp.src(path.images.src, {
    encoding: false
})
  .pipe(newer(path.images.dest))
  .pipe(imagemin())
  .pipe(size({
    showFiles: true
  }))
  .pipe(gulp.dest(path.images.dest))
}

function watch() {
  gulp.watch(path.styles.src, styles)
  gulp.watch(path.scripts.src, scripts)
}

const build = gulp.series(clean, html, gulp.parallel(styles, scripts, img), watch)

exports.clean = clean
exports.img = img
exports.html = html
exports.styles = styles
exports.scripts = scripts
exports.watch = watch
exports.build = build
exports.default = build