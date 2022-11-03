//  -------------------------------------------------------------
//    Таск-раннер для отслеживания js скриптов
//  -------------------------------------------------------------

'use strict';

import { paths } from '../gulpfile.babel';
import webpack from 'webpack';
import webpackStream from 'webpack-stream';
import gulp from 'gulp';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import browsersync from 'browser-sync';
import debug from 'gulp-debug';
import yargs from 'yargs';

const webpackConfig = require('../webpack.config.js'),
  argv = yargs.argv,
  production = !!argv.production;

webpackConfig.mode = production ? 'production' : 'development';
webpackConfig.devtool = production ? false : 'source-map';

gulp.task('scripts', () => {
  return gulp
    .src(paths.scripts.source)
    .pipe(
      plumber({
        errorHandler: notify.onError(function (error) {
          return {
            title: 'Scripts',
            sound: false,
            message: error.message,
          };
        }),
      }),
    )
    .pipe(webpackStream(webpackConfig), webpack)
    .pipe(plumber.stop())
    .pipe(gulp.dest(paths.scripts.build))
    .pipe(
      debug({
        title: 'JS files',
      }),
    )
    .pipe(browsersync.stream());
});
