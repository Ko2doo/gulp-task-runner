//  -------------------------------------------------------------
//    Таск-раннер для отслеживания html разметки
//  -------------------------------------------------------------

'use strict';

import { paths } from '../gulpfile.babel';
import gulp from 'gulp';
import include from 'gulp-file-include';
import beautify from 'gulp-beautify';
import browsersync from 'browser-sync';
import notify from 'gulp-notify';
import plumber from 'gulp-plumber';

gulp.task('html', () => {
  return gulp
    .src(paths.html.source)
    .pipe(
      plumber({
        errorHandler: notify.onError(function (error) {
          return {
            title: 'HTML include',
            sound: false,
            message: error.message,
          };
        }),
      }),
    )
    .pipe(
      include({
        prefix: '@@', // include syntax ++include('my_page.htnl')
        basepath: '@file',
      }),
    )
    .pipe(
      beautify.html({
        indent_size: 2,
        preserve_newlines: false,
      }),
    )
    .pipe(plumber.stop())
    .pipe(gulp.dest(paths.html.build))
    .pipe(browsersync.stream());
});
