//  -------------------------------------------------------------
//    Таск-раннер для запуска локального сервера
//  -------------------------------------------------------------

'use strict';

import { paths } from '../gulpfile.babel';
import gulp from 'gulp';
import browsersync from 'browser-sync';

gulp.task('server', () => {
  browsersync.init({
    server: './build/',
    port: 3008,
    notify: false,
  });

  // watching for files
  gulp.watch(paths.html.watch, gulp.parallel('html'));
  gulp.watch(paths.styles.watch, gulp.parallel('styles'));
  gulp.watch(paths.scripts.watch, gulp.parallel('scripts'));
  gulp.watch(paths.images.watch, gulp.parallel('images'));
  gulp.watch(paths.fonts.watch, gulp.parallel('fonts'));
});
