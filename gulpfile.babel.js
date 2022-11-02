//  --------------------------------------------------------------------------------
//   * Главный конфигурационный файл gulpfile.babel.js
//   * В проекте используется Webpack + Babel + Gulp
//   * Конфигурационный файл и все раннеры используют синтаксис ES6+
//   * больше информации о Babel    (https://babeljs.io/docs/en/)
//   * больше информации о Webpack  (https://webpack.js.org/concepts/)
//   * примеры конфигурации Webpack (https://webpack.js.org/configuration/)
//   *  --------
//   *  --------
//   * Это главный конфигурационный файл проекта, тут описываем пути и задачи по запуску и сборке проекта.
//   * Gulp-раннер разделён на модули, каждый модуль отвечает за что-то одно.
//   * Модули-раннеры находятся в папке         -> /runners
//   * Каталог в котором работаем с исходниками -> /source
//   * Каталог в котором собирается проект      -> /build
//   *  Copyright (c) 2022 NИ
//  --------------------------------------------------------------------------------

'use strict';

import gulp from 'gulp';
import './runners/notify';

const requireDir = require('require-dir'),
  paths = {
    html: {
      source: './source/html/index.html',
      build: ['./build/'],
      watch: ['./source/index.html', './source/html/**/*.html'],
    },
    styles: {
      source: './source/styles/main.scss',
      build: './build/styles/',
      watch: ['./source/styles/**/*.{scss,sass}'],
    },
    scripts: {
      source: './source/js/main.js',
      build: './build/js/',
      watch: ['./source/js/**/*.js'],
    },
    images: {
      source: ['./source/img/**/*.{jpg,jpeg,png,gif,tiff,svg}'],
      build: './build/img/',
      watch: './source/img/**/*.{jpg,jpeg,png,gif,svg,tiff}',
    },
    fonts: {
      source: './source/fonts/**/*.{woff,woff2,ttf}',
      build: './build/fonts/',
      watch: './source/fonts/**/*.{woff,woff2,ttf}',
    },
    vendorStyles: {
      source: './node_modules/normalize.css/normalize.css',
      build: './build/styles/vendor/',
    },
  };

requireDir('./runners/');

export { paths };

export const development = gulp.series(
  'clean',
  gulp.parallel(['html', 'vendor-styles', 'styles', 'scripts', 'images', 'webp', 'fonts']),
  gulp.parallel('server', 'say:hello'),
);

export const production = gulp.series(
  'clean',
  gulp.parallel(['html', 'vendor-styles', 'styles', 'scripts', 'images', 'webp', 'fonts']),
  'say:build',
);

export default development;
