var gulp = require('gulp');
var path = require('path');
var livereload = require('gulp-livereload');
var config = require('../config');

gulp.task('watch', ['watchify'], function() {
  livereload.listen();

  // sprites
  var sprites = config.sprites;
  gulp.watch(config.sprites.src, ['sprites']);
  gulp.watch(path.join(sprites.dest.css, sprites.options.cssName), ['sass']);
  gulp.watch(path.join(sprites.dest.image, sprites.options.imgName), livereload.changed);

  // sass
  gulp.watch(config.paths.src + '/**/*.{scss,sass}', ['sass']);
  gulp.watch(config.paths.build + '/**/*.css', livereload.changed);

  // scripts
  gulp.watch(config.paths.build + '/**/*.js', livereload.changed);

  // views
  gulp.watch(config.paths.views + '/**/*.phtml', livereload.changed);
});
