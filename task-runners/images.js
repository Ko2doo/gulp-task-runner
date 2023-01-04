//  -------------------------------------------------------------
//    Таск-раннер для отслеживания, сжатия изображений
//  -------------------------------------------------------------

"use strict";

import { paths, configs } from "../gulpfile.babel";
import gulp from "gulp";
import gulpif from "gulp-if";
import imagemin from "gulp-imagemin";
import imageminPngquant from "imagemin-pngquant";
import imageminZopfli from "imagemin-zopfli";
import imageminMozjpeg from "imagemin-mozjpeg";
import imageminGiflossy from "imagemin-giflossy";
import newer from "gulp-newer";
import debug from "gulp-debug";
import browsersync from "browser-sync";

gulp.task("images", () => {
  return gulp
    .src(paths.images.source)
    .pipe(newer(paths.images.build))
    .pipe(
      gulpif(
        configs.production,
        imagemin([
          imageminGiflossy({
            optimizationLevel: 3,
            optimize: 3,
            lossy: 2,
          }),
          imageminPngquant({
            speed: 5,
            quality: [0.6, 0.8],
          }),
          imageminZopfli({
            more: true,
          }),
          imageminMozjpeg({
            progressive: true,
            quality: 90,
          }),
          imagemin.svgo({
            plugins: [
              { removeViewBox: false },
              { removeUnusedNS: false },
              { removeUselessStrokeAndFill: false },
              { cleanupIDs: false },
              { removeComments: true },
              { removeEmptyAttrs: true },
              { removeEmptyText: true },
              { collapseGroups: true },
            ],
          }),
        ])
      )
    )
    .pipe(gulp.dest(paths.images.build))
    .pipe(
      debug({
        title: "Images",
      })
    )
    .pipe(browsersync.stream());
});
