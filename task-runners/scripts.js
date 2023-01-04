//  -------------------------------------------------------------
//    Таск-раннер для отслеживания js скриптов
//  -------------------------------------------------------------

"use strict";

import gulp from "gulp";
import gulpif from "gulp-if";
import rename from "gulp-rename";
import plumber from "gulp-plumber";

import webpack from "webpack";
import webpackStream from "webpack-stream";
import webpackConfig from "../webpack.config.js";
import browsersync from "browser-sync";
import debug from "gulp-debug";
import { paths, configs } from "../gulpfile.babel";

gulp.task("scripts:webpack", () => {
  webpackConfig.mode = configs.production ? "production" : "development";
  webpackConfig.devtool = configs.production ? false : "source-map";

  return gulp
    .src(paths.scripts.source)
    .pipe(plumber(configs.plumber))
    .pipe(webpackStream(webpackConfig), webpack)
    .pipe(
      gulpif(
        configs.production,
        rename({
          suffix: ".min",
        })
      )
    )
    .pipe(plumber.stop())
    .pipe(gulp.dest(paths.scripts.build))
    .pipe(
      debug({
        title: "JS files",
      })
    )
    .pipe(browsersync.stream());
});

gulp.task("scripts", gulp.parallel("scripts:webpack"));
