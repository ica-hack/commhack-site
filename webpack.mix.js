//==========  Laravel Mix  ==========//

const mix = require('laravel-mix')
const path = require('path')
require('laravel-mix-purgecss')

// Run Mix
mix
    // cleaner aliases for js module imports (optional)
    .webpackConfig({
        resolve: {
            alias: {
                '@utilities': path.resolve(__dirname, 'resources/js/utilities'),
                '@modules': path.resolve(__dirname, 'resources/js/modules')
            }
        }
    })
    .setPublicPath('public')

    // Compile Javascript
    .js('resources/js/main.js', 'public/js/')

    // Compile SCSS
    .sass('resources/scss/main.scss', 'public/css/')
    .options({ processCssUrls: false })

// Production only
if (mix.inProduction()) {
    mix.purgeCss({
            content: ['site/**/*.njk'],
            safelist: ['menu-visible', 'loaded', 'expanded', /^type-/, /^page-/, /[data-src]/],
            extractorPattern: [/[^<>"'`\s]*[^<>"'`\s:]/g]
        })
        .minify('public/css/main.css')
        .minify('public/js/main.js')
}


