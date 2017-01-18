import gulp from "gulp";
import webpack from "webpack-stream";

export default function webapp(appPath) {
  gulp.task('client', function () {
    var task = gulp.src(appPath)
      .pipe(webpack({
        watch: true,
        module: {
          loaders: [
            { test: /\.js$/, loader: 'babel-loader' },
          ],
        },
        output: {
          filename: "client.js"
        },
      }))
      .pipe(gulp.dest('build/'));
      ;
    return task;
  });
  gulp.start('client');
};
