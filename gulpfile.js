const gulp = require('gulp')
const sass = require('gulp-sass')(require('sass'))

gulp.task('sass', (done) => {
  gulp
    .src('./sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./src/lib/components'))
  done()
})

gulp.task('sass:watch', () => {
  gulp.watch('./sass/**/*.scss', gulp.series('sass'))
})
