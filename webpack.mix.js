
const mix = require("laravel-mix");

mix.setResourceRoot("");
require("laravel-mix-ejs")

mix.ts("./script/index.ts", "./dist/js/")
.sass("./sass/index.scss", "./dist/css/")
.ejs("./template/index.ejs", "./dist/")
.options({
  processCssUrls: false
})
.autoload({
  "jquery": ['$', 'window.jQuery'],
})
.browserSync({
  files: "./**/*",
  server: "./dist/",
  proxy: false
});
