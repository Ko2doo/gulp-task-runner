/*
 * Таск-раннер для отслеживания js скриптов
 *
 */

'use strict';

import { paths } from '../gulpfile.babel';
import webpack from 'webpack';
import webpackStream from 'webpack-stream';
import gulp from 'gulp';
import gulpif from 'gulp-if';
import concat from 'gulp-concat';
import rename from 'gulp-rename';
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
    .pipe(webpackStream(webpackConfig), webpack)
    .pipe(gulpif(production, concat('index.js')))
    .pipe(
      gulpif(
        production,
        rename({
          suffix: '.min',
        }),
      ),
    )
    .pipe(gulp.dest(paths.scripts.build))
    .pipe(
      debug({
        title: 'JS files',
      }),
    )
    .pipe(browsersync.stream());
});
