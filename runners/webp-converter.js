//  -------------------------------------------------------------
//    Таск для конвертации изображений в формат .webp
//  -------------------------------------------------------------

'use strict';

import { paths } from '../gulpfile.babel';
import gulp from 'gulp';
import gulpif from 'gulp-if';
import imageminWebp from 'imagemin-webp';
import webp from 'gulp-webp';
import newer from 'gulp-newer';
import debug from 'gulp-debug';
import browsersync from 'browser-sync';
import yargs from 'yargs';

const argv = yargs.argv,
  production = !!argv.production;

gulp.task('webp', () => {
  return gulp
    .src(paths.images.source)
    .pipe(newer(paths.images.build))
    .pipe(
      webp(
        gulpif(
          production,
          imageminWebp({
            lossless: true,
            quality: 100,
            alphaQuality: 100,
          }),
        ),
      ),
    )
    .pipe(gulp.dest(paths.images.build))
    .pipe(
      debug({
        title: 'Images',
      }),
    )
    .on('end', browsersync.reload);
});
