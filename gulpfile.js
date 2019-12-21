var gulp = require('gulp')
var cleanCss = require("gulp-clean-css")
var postCss = require('gulp-postcss')
var sourceMaps = require('gulp-sourcemaps')
var concat = require('gulp-concat')
var browserSync = require('browser-sync').create()
var imageMin = require('gulp-imagemin')


gulp.task("css", function () {
  return gulp.src([
    "src/css/base.css",
    "src/css/typography.css",
    "src/css/style.css",
    "src/css/responsive.css",
    "src/css/ball.css"
  ])
  .pipe(sourceMaps.init())
  .pipe(
    postCss([
      require("autoprefixer"),
      require("postcss-preset-env")({
        stage: 1,
        browsers: ["last 2 versions"]
      })
    ])
  )
  .pipe(concat("style.css"))
  .pipe(
    cleanCss({
      compatibility: 'ie8'
    })
  )
  .pipe(sourceMaps.write())
  .pipe(gulp.dest("dist"))
  .pipe(browserSync.stream())
})

gulp.task("html", function () {
  return gulp.src("src/*.html")
    .pipe(gulp.dest("dist"))
})

gulp.task("fonts", function () {
  return gulp.src("src/fonts/*")
    .pipe(gulp.dest("dist/fonts"))
})

gulp.task("images", function () {
  return gulp.src("src/images/*")
    .pipe(imageMin())
    .pipe(gulp.dest("dist/images"))
})

gulp.task("javascript", function () {
  return gulp.src("src/js/*")
    .pipe(gulp.dest("dist"))
})

gulp.task("watch", function () {

  browserSync.init({
    server: {
      baseDir: "dist"
    }
  })

  gulp.watch("src/*.html", ["html"]).on("change", browserSync.reload)
  gulp.watch("src/css/*.css", ["css"])
  gulp.watch("src/js/*.js", ["javascript"])
  gulp.watch("src/fonts/*", ["fonts"])
  gulp.watch("src/images/*", ["images"])
})

gulp.task('default', ["html", "fonts", "javascript", "images", "css", "watch"])
