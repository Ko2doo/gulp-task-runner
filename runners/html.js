/*
 * Таск-раннер для отслеживания html разметки
 *
 */

'use strict';

import { paths, production } from '../gulpfile.babel';
import gulp from 'gulp';
import gulpif from 'gulp-if';
import include from 'gulp-file-include';
import browsersync from 'browser-sync';
import notify from 'gulp-notify';
import plumber from 'gulp-plumber';
import sourcemaps from 'gulp-sourcemaps';

gulp.task('html', () => {
  return gulp
    .src(paths.html.source)
    .pipe(gulpif(!production, sourcemaps.init()))
    .pipe(
      include({
        prefix: '@@', // include syntax ++include('my_page.htnl')
        basepath: '@file',
      }),
    )
    .pipe(
      plumber({
        errorHandler: notify.onError(function (err) {
          return {
            title: 'HTML include',
            sound: 'Blow',
            message: err.message,
          };
        }),
      }),
    )
    .pipe(plumber.stop())
    .pipe(gulpif(!production, sourcemaps.write('./sourcemaps/')))
    .pipe(gulp.dest(paths.html.build))
    .pipe(browsersync.stream());
});
