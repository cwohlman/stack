var gulp = require('gulp');
var webpack = require('webpack-stream');
gulp.task('default', function() {
  return gulp.src('src/index.js')
    .pipe(webpack({
      watch: true,
      module: {
        loaders: [
          { test: /\.js$/, loader: 'babel-loader' },
        ],
      },
      output: {
        filename: "index.js"
      },
    }))
    .pipe(gulp.dest('dist/'));
});
