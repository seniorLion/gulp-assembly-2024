

const gulp = require('gulp')
const less = require('less')
const del = require('del')

function clean() {
  return del(['dist'])
}

exports.clean = clean