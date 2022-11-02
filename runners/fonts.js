/*
 * Таск-раннер для работы со шрифтами
 *
 */

'use strict';

import { paths } from '../gulpfile.babel';
import gulp from 'gulp';
import debug from 'gulp-debug';

gulp.task('fonts', () => {
  return gulp
    .src(paths.fonts.source)
    .pipe(gulp.dest(paths.fonts.build))
    .pipe(
      debug({
        title: 'Fonts',
      }),
    );
});
