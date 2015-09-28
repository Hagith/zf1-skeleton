var gulp = require('gulp');
var sequence = require('gulp-sequence');

gulp.task('build', sequence(
    'clean',
    ['sprites', 'fonts'],
    ['minify-css', 'uglify-js'],
    'version'
));
