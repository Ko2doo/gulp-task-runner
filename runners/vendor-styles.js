//  -------------------------------------------------------------
//    Таск-раннер для отслеживания стилей
//  -------------------------------------------------------------

'use strict';

// Импортируем необходимые gulp плагины для работы со стилями:
import { paths } from '../gulpfile.babel'; // настройки gulp.js
import gulp from 'gulp';
import rename from 'gulp-rename';
import mincss from 'gulp-clean-css';
import groupmedia from 'gulp-group-css-media-queries';
import debug from 'gulp-debug';

gulp.task('vendor-styles', () => {
  return gulp
    .src(paths.vendorStyles.source)
    .pipe(groupmedia())
    .pipe(
      mincss({
        compatibility: 'ie8',
        level: {
          1: {
            specialComments: 0,
            removeEmpty: true,
            removeWhitespace: true,
          },
          2: {
            mergeMedia: true,
            removeEmpty: true,
            removeDuplicateFontRules: true,
            removeDuplicateMediaBlocks: true,
            removeDuplicateRules: true,
            removeUnusedAtRules: false,
          },
        },
      }),
    )
    .pipe(
      rename({
        suffix: '.min',
      }),
    )
    .pipe(gulp.dest(paths.vendorStyles.build))
    .pipe(
      debug({
        title: 'Vendor styles files',
      }),
    );
});
