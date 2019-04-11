const {
  watch,
  series,
  dest,
  src,
} = require('gulp');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const clean = require('gulp-clean');
const newer = require('gulp-newer');
const svgSymbols = require('gulp-svg-symbols');
const browserSync = require("browser-sync").create();
const webpack = require("webpack");
const webpackConfig = require("./webpack.config.js");
const webpackStream = require("webpack-stream");
const plumber = require('gulp-plumber');

const SRC_FOLDER = './frontend';
const SRC_CSS_FOLDER = './frontend/styles';
const SRC_IMAGES_FOLDER = './frontend/images';
const SRC_ASSETS_FOLDER = './frontend/assets';

const DEST_FOLDER = './public';
const DEST_ASSETS_FOLDER = './public/assets';
const DEST_IMAGES_FOLDER = './public/images';
const DEST_JS_FOLDER = './public/js';

const isProdEnv = process.env.NODE_ENV === 'production';

const browserSyncInit = (done) => {
  browserSync.init({
    server: {
      baseDir: DEST_FOLDER
    },
    port: 6699
  });
  done();
};

const browserSyncReload = (done) => {
  browserSync.reload();
  done();
};

const compressCss = () => {
  const stream = src(`${SRC_CSS_FOLDER}/*.css`)
    .pipe(concat('index.css'));

  if (isProdEnv) {
    stream
      .pipe(cleanCSS())
  } else {
    stream
      .pipe(sourcemaps.init())
      .pipe(cleanCSS())
      .pipe(sourcemaps.write())
  }

  return stream
    .pipe(dest(DEST_FOLDER));
};

const cleanDist = () => {
  return src(DEST_FOLDER, {
    read: false,
    allowEmpty: true
  })
    .pipe(clean());
};

const assets = () => {
  return src(`${SRC_ASSETS_FOLDER}/**/*`)
    .pipe(newer(DEST_ASSETS_FOLDER))
    .pipe(dest(DEST_ASSETS_FOLDER))
};

const images = () => {
  return src(SRC_IMAGES_FOLDER, {allowEmpty: true})
    .pipe(svgSymbols())
    .pipe(dest(DEST_IMAGES_FOLDER));
};

function watchFiles() {
  watch(SRC_CSS_FOLDER, compressCss);
  watch(SRC_ASSETS_FOLDER, assets);
  watch(SRC_IMAGES_FOLDER, images);
}

function watchDestFolder() {
  watch(DEST_FOLDER, browserSyncReload);
}

const js = () => {
  return src([`${SRC_FOLDER}/**/*.js`])
    .pipe(plumber())
    .pipe(webpackStream(webpackConfig, webpack))
    .pipe(dest(DEST_JS_FOLDER))
    .pipe(browserSync.stream())
};

const build = series(cleanDist, images, compressCss, assets);
const serve = series(browserSyncInit, watchDestFolder);
const dev = series(build, watch, serve);

exports.styles = compressCss;
exports.clean = cleanDist;
exports.assets = assets;
exports.images = images;
exports.watch = watchFiles;
exports.js = js;
exports.build = build;
exports.serve = serve;
exports.dev = dev;
