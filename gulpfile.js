const gulp = require('gulp')
const less = require('gulp-less')
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
  .pipe(less())
  .pipe(gulp.dest(path.styles.dest))
}

exports.clean = clean
exports.styles = styles