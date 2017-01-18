var gulp = require('gulp');
var webpack = require('webpack-stream');
var fs = require('fs');
var node_modules = fs.readdirSync('node_modules').filter(function(x) { return x !== '.bin' });

gulp.task('default', function() {
  return gulp.watch(['config/client.js', 'tool/**.js'], function () {
    gulp.src('config/client.js')
      .pipe(webpack({
        watch: true,
        module: {
          loaders: [
            { test: /\.js$/, loader: 'babel-loader' },
          ],
        },
        externals: function(context, request, cb) {
          if(node_modules.indexOf(request) !== -1) {
            cb(null, 'commonjs ' + request);
            return;
          }
          cb();
        },
        output: {
          filename: "client.js"
        },
      }))
      .pipe(gulp.dest('build/'));
    });
});
