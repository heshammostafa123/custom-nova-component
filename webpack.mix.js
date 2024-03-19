let mix = require("laravel-mix");
const path = require("path");

require("./nova.mix");

mix.setPublicPath("dist")
    .js("resources/js/tool.js", "js")
    .vue({ version: 3 })
    .css("resources/css/tool.css", "css")
    .nova("seoegypt/nova-custom-components")
    .webpackConfig({
        resolve: {
            alias: {
                "@/mixins": path.resolve(
                    __dirname,
                    "../../vendor/laravel/nova/resources/js/mixins"
                ),
                "@": path.resolve(
                    __dirname,
                    "../../vendor/laravel/nova/resources/js"
                ),
            },
            modules: [
                path.resolve(
                    __dirname,
                    "../../vendor/laravel/nova/node_modules/"
                ),
            ],
            symlinks: false,
        },
    });
