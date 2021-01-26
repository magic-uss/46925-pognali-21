const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const less = require("gulp-less");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const sync = require("browser-sync").create();

const csso = require("postcss-csso");
const webp = require("gulp-webp");
const svgstore = require("gulp-svgstore");
const uglify = require("gulp-uglify");
const del = require("del");
const imagemin = require("gulp-imagemin");
const htmlmin = require("gulp-htmlmin");
const rename = require("gulp-rename");

// Styles

const styles = () => {
  return gulp.src("source/less/styles.less")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(less())
    .pipe(gulp.dest("build/css"))
    .pipe(postcss([
      autoprefixer(),
      csso()
    ]))
    .pipe(rename("styles.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(sync.stream());
}

exports.styles = styles;

// Images

const images = () => {
  return gulp.src("source/img/*.{jpg,png,svg}")
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.mozjpeg({progressive: true}),
      imagemin.svgo(),
    ]))
    .pipe(gulp.dest("build/img"));
}

exports.images = images;

// Webp

const createWebp = () => {
  return gulp.src("source/img/*.{jpg,png}")
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest("build/img"));
}

exports.createWebp = createWebp;

/*
// Sprite

const sprite = () => {
  return gulp.src("source/img/icons/*.svg")
    .pipe(imagemin([
      imagemin.svgo({
        plugins: [
          {removeAttrs: {attrs: "(fill|opacity)"}},
        ]
      }),
    ]))
    .pipe(svgstore())
    .pipe(rename("sprites.svg"))
    .pipe(gulp.dest("build/img"));
}

exports.sprite = sprite;
*/

// HTML

const html = () => {
  return gulp.src("source/*.html")
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest("build"));
}

exports.html = html;

// Scripts

const scripts = () => {
  return gulp.src("source/js/scripts.js")
    .pipe(uglify())
    .pipe(rename("scripts.min.js"))
    .pipe(gulp.dest("build/js"))
    .pipe(sync.stream());
}

exports.scripts = scripts;

// Copy

const copy = (done) => {
  gulp.src([
    "source/fonts/*.{woff2,woff}",
    "source/*.ico",
    "source/img/*.{jpg,png,svg}",
  ],
    {
      base: "source"
    })
    .pipe(gulp.dest("build"))
  done();
}

exports.copy = copy;

// Clean

const clean = () => {
  return del("build");
}

exports.clean = clean;

// Server

const server = (done) => {
  sync.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

exports.server = server;

// Reload

const reload = (done) => {
  sync.reload();
  done();
}

// Watcher

const watcher = () => {
  gulp.watch("source/less/**/*.less", gulp.series(styles));
  gulp.watch("source/js/scripts.js", gulp.series(scripts));
  gulp.watch("source/*.html", gulp.series(html, reload));
}

// Default

exports.default = gulp.series(
  clean,
  gulp.parallel(
    styles,
    html,
    scripts,
    copy,
    createWebp
  ),
  gulp.series(
    server,
    watcher
  )
);

// Build

const build = gulp.series(
  clean,
  gulp.parallel(
    styles,
    html,
    scripts,
    copy,
    images,
    createWebp
  )
);

exports.build = build;
