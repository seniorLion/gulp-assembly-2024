const gulp = require('gulp')
const less = require('gulp-less')
const rename = require('gulp-rename')
const cleanCss = require('gulp-clean-css')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')
const concat = require('gulp-concat')
const sourcemaps = require('gulp-sourcemaps')
const autoprefixer = require('gulp-autoprefixer')
const del = require('del')

const path = {
  styles: {
    src: 'src/styles/**/*.less',
    dest: 'dist/css'
  },
  scripts: {
    src: 'src/scripts/**/*.js',
    dest: 'dist/js'
  }
}

function clean() {
  return del(['dist'])
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
  .pipe(gulp.dest(path.scripts.dest))
}

function watch() {
  gulp.watch(path.styles.src, styles)
  gulp.watch(path.scripts.src, scripts)
}

const build = gulp.series(clean, gulp.parallel(styles, scripts), watch)

exports.clean = clean
exports.styles = styles
exports.scripts = scripts
exports.watch = watch
exports.build = build
exports.default = build