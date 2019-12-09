const gulp = require('gulp'),
  fs = require('fs'),
  json = JSON.parse(fs.readFileSync('./package.json')),
  gulpwatch = require('gulp-watch'),
  babel = require('gulp-babel'),
  plumber = require('gulp-plumber'),
  rename = require("gulp-rename"),
  browserSync = require('browser-sync'),
  postcss = require("gulp-postcss"),
  sass = require('gulp-sass'),
  autoprefixer = require("autoprefixer"),
  htmlbeautify = require('gulp-html-beautify'),
  concat  = require('gulp-concat'),
  del = require('del'),
  cssComb = require('gulp-csscomb'),
  cmq = require('gulp-merge-media-queries'),
  ejs = require('gulp-ejs'),
  replace = require('gulp-replace'),
  SRC_JS = ["./js/[^main]*.js", "./js/main.js"],
  SRC_IMG = ['./img/*'],
  SRC_SCSS = ["./style/[^index]*.scss", "./style/index.scss"];

//if node version is lower than v.0.1.2
require('es6-promise').polyfill();

// clean dist
gulp.task('clean:dist', (done, cb) => {
  del(['./dist/*'], cb);
  done();
});

// browser-sync
gulp.task('browser-sync', (done) => {
  browserSync.init({
    server: {
      baseDir: "./dist",
      index: "index.html"
    }
  });
  done();
});

gulp.task('bs-reload', (done) => {
  browserSync.reload();
  done();
});

// js
gulp.task('js', (done) => {
  gulp.src(SRC_JS)
    .pipe(plumber({
      handleError: (err) => {
        console.log(err);
        this.emit('end');
      }
    }))
    .pipe(concat('index.js'))
    .pipe(babel({
      presets: ['@babel/preset-env']
    }))
    .pipe(gulp.dest('./dist'));
  done();
});

//style
gulp.task('css', (done) => {
  gulp.src('./style/*.css')
    .pipe(plumber({
      handleError: (err) => {
        console.log(err);
        this.emit('end');
      }
    }))
    .pipe(concat('module.css'))
    .pipe(gulp.dest('./dist'));
  done();
});

gulp.task('sass', (done) => {
  gulp.src(SRC_SCSS)
    .pipe(plumber({
      handleError: (err) => {
        console.log(err);
        this.emit('end');
      }
    }))
    .pipe(sass({
      outputStyle: 'expanded',
      indentType: 'space'
    }))
    .pipe(concat('index.css'))
    .pipe(cmq({
      log: true
    }))
    .pipe(cssComb())
    .pipe(postcss([
      autoprefixer({
        cascade: false
      })
    ]))
    .pipe(gulp.dest('./dist'));
  done();
});

// ejs
gulp.task('ejs', (done) => {
  gulp.src(["./template/*.ejs", '!' + "./template/_*.ejs"]).pipe(ejs())
    .pipe(rename({
      extname: ".html"
    }))
    .pipe(htmlbeautify({
      "indent_size": 2,
      "preserve_newlines": false,
      "indent_inner_html": true,
      "unformatted": ["head"]
    }))
    .pipe(gulp.dest("dist/"));
  done();
});

// img
gulp.task('img', (done) => {
  gulp.src(SRC_IMG).pipe(gulp.dest("dist/"));
  done();
});

// main routine
gulp.task('watch', (done) => {
  
  // reload image when delete
  gulpwatch(SRC_IMG, (file) => {
    if(file.event === 'unlink'){
      del('./dist/' + file.relative);
    }
  });
  
  // watch files
  gulp.watch(SRC_JS, gulp.parallel('js', 'bs-reload'));
  gulp.watch(['./style/_*.css'], gulp.parallel('css', 'bs-reload'));
  gulp.watch(SRC_SCSS, gulp.parallel('sass', 'bs-reload'));
  gulp.watch(["./template/*.ejs", "./template/_*.ejs"], gulp.parallel('ejs', 'bs-reload'));
  gulp.watch(SRC_IMG, gulp.parallel('img', 'bs-reload'));
});
gulp.task('default', gulp.series(gulp.parallel('browser-sync', 'watch', 'js', 'css', 'sass', 'ejs', 'img', 'clean:dist')));