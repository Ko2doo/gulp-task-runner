//  -------------------------------------------------------------
//    Таск-раннер для отслеживания html разметки
//  -------------------------------------------------------------

"use strict";

import { paths, config } from "../gulpfile.babel";
import gulp from "gulp";
import include from "gulp-file-include";
import beautify from "gulp-beautify";
import gulpif from "gulp-if";
import replace from "gulp-replace";
import browsersync from "browser-sync";
// import notify from 'gulp-notify';
import plumber from "gulp-plumber";
// import yargs from 'yargs';

// const argv = yargs.argv,
//   production = !!argv.production;

gulp.task("html", () => {
  return gulp
    .src(paths.html.source)
    .pipe(plumber(config.plumber))
    .pipe(include(config.fileInclude))
    .pipe(
      beautify.html({
        indent_size: 2,
        preserve_newlines: false,
      })
    )
    .pipe(gulpif(config.production, replace(".css", ".min.css")))
    .pipe(gulpif(config.production, replace(".js", ".min.js")))
    .pipe(plumber.stop())
    .pipe(gulp.dest(paths.html.build))
    .pipe(browsersync.stream());
});
