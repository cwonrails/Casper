var gulp = require('gulp')

// gulp plugins and utils
var gutil = require('gulp-util')
var livereload = require('gulp-livereload')
var nodemon = require('gulp-nodemon')
var postcss = require('gulp-postcss')

// postcss plugins
var autoprefixer = require('autoprefixer')
var colorFunction = require('postcss-color-function')
var cssnano = require('cssnano')
var customProperties = require('postcss-custom-properties')

var swallowError = function swallowError (error) {
  gutil.log(error.toString())
  gutil.beep()
  this.emit('end')
}

var nodemonServerInit = function () {
  livereload.listen(1234)
}

gulp.task('build', ['css'], function (/* cb */) {
  return nodemonServerInit()
})

gulp.task('css', function () {
  var processors = [
    customProperties,
    colorFunction(),
    autoprefixer({browsers: ['last 2 versions']}),
    cssnano()
  ]
  gulp.src('assets/css/screen.css')
        .on('error', swallowError)
        .pipe(postcss(processors))
        .pipe(gulp.dest('assets/built/'))
        .pipe(livereload())
})

gulp.task('watch', function () {
  gulp.watch('assets/css/screen.css', ['css'])
})

gulp.task('default', ['build'], function () {
  gulp.start('watch')
})
