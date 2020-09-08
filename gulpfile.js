const cssnano = require('cssnano');
const gulp = require('gulp');
const postcss = require('gulp-postcss');
const less = require('gulp-less');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const LessAutoprefix = require('less-plugin-autoprefix');

const css = () => gulp
  .src('./assets/less/main.less')
  .pipe(sourcemaps.init())
  .pipe(less({
    plugins: [new LessAutoprefix()],
  }))
  .pipe(postcss([cssnano()]))
  .pipe(rename('style.css'))
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest('./assets/css'));

const watch = () => {
  gulp.watch('./assets/less/**/*.less', css);
};

exports.css = css;
exports.watch = watch;
exports.default = watch;
