
const mix = require("laravel-mix");


mix.setResourceRoot("");
require("laravel-mix-ejs")

switch (process.env.NODE_ENV) {
  case "dev":
    mix.ts("./script/index.ts", "./docs/js/")
    .sass("./sass/index.scss", "./docs/css/")
    .ejs("./template/index.ejs", "./docs/")
    .options({
      processCssUrls: false
    })
    .autoload({
      "jquery": ['$', 'window.jQuery'],
    })
    .browserSync({
      files: "./**/*",
      server: "./docs/",
      proxy: false
    });
    break;
  case "demo":
    mix.ts("./script/index.ts", "./docs/js/")
    .sass("./sass/index.scss", "./docs/css/")
    .ejs("./template/index.ejs", "./docs/")
    .options({
      processCssUrls: false
    })
    .autoload({
      "jquery": ['$', 'window.jQuery'],
    });
    break;
  case "prod":
    mix.ts("./index.ts", "./dist/index.js");
    break;
};
