//  -------------------------------------------------------------
//    Таск-раннер для отслеживания стилей
//  -------------------------------------------------------------

"use strict";

// Импортируем необходимые gulp плагины для работы со стилями:
import { paths, configs } from "../gulpfile.babel"; // настройки gulp.js
import gulp from "gulp";
import gulpif from "gulp-if";
import rename from "gulp-rename";
import dartsass from "sass";
import gulpsass from "gulp-sass";
import mincss from "gulp-clean-css";
import groupmedia from "gulp-group-css-media-queries";
import autoprefixer from "gulp-autoprefixer";
import sourcemaps from "gulp-sourcemaps";
import plumber from "gulp-plumber";
import browsersync from "browser-sync";
import debug from "gulp-debug";

const sass = gulpsass(dartsass);

gulp.task("styles", () => {
  return gulp
    .src(paths.styles.source)
    .pipe(gulpif(!configs.production, sourcemaps.init()))
    .pipe(plumber(configs.plumber))
    .pipe(sass())
    .pipe(groupmedia())
    .pipe(
      gulpif(
        configs.production,
        autoprefixer({
          cascade: false,
          grid: true,
          overrideBrowserslist: ["last 4 versions"],
        })
      )
    )
    .pipe(
      gulpif(
        configs.production,
        mincss({
          compatibility: "ie8",
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
        })
      )
    )
    .pipe(
      gulpif(
        configs.production,
        rename({
          suffix: ".min",
        })
      )
    )
    .pipe(plumber.stop())
    .pipe(gulpif(!configs.production, sourcemaps.write("./maps/")))
    .pipe(gulp.dest(paths.styles.build))
    .pipe(
      debug({
        title: "CSS files",
      })
    )
    .on("end", browsersync.reload);
});
