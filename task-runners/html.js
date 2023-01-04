//  -------------------------------------------------------------
//    Таск-раннер для отслеживания html разметки
//  -------------------------------------------------------------

"use strict";

import { paths, configs } from "../gulpfile.babel";
import gulp from "gulp";
import include from "gulp-file-include";
import beautify from "gulp-beautify";
import gulpif from "gulp-if";
import replace from "gulp-replace";
import browsersync from "browser-sync";
import plumber from "gulp-plumber";

gulp.task("html", () => {
  return gulp
    .src(paths.html.source)
    .pipe(plumber(configs.plumber))
    .pipe(include(configs.fileInclude))
    .pipe(
      beautify.html({
        indent_size: 2,
        preserve_newlines: false,
      })
    )
    .pipe(gulpif(configs.production, replace(".css", ".min.css")))
    .pipe(gulpif(configs.production, replace(".js", ".min.js")))
    .pipe(plumber.stop())
    .pipe(gulp.dest(paths.html.build))
    .pipe(browsersync.stream());
});
