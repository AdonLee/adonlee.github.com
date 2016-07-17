
var webpack = require('webpack');
module.exports = {
    // The standard entry point and output config
    entry: "./src/index.js",
    output: {
        path: "dist",
        filename: "app.js"
    },
    resolve: {
        modulesDirectories: ['node_modules', 'dep', 'bower_components']
    },
    module: {
        loaders: [
            // Extract css files
            {
                test: /\.css$/,
                loader: "style!css"
                // loader: ExtractTextPlugin.extract("style-loader", "css-loader")
            },
            // Optionally extract less files
            // or any other compile-to-css language
            {
                test: /\.less$/,
                loader: "style!css!autoprefixer!less"
                // loader: ExtractTextPlugin.extract("style", "css!autoprefixer!less")
            },
            {
                test: /\.scss$/,
                // loader: ExtractTextPlugin.extract("style", "css!autoprefixer!sass")
                loader: "style!css!autoprefixer!sass"
            },
            {
                test: /\.(png|jpg)$/, loader: "url?limit=8192"
            },
            {
                test: /\.html$/, loader: "html?attrs=link:href"
            },
            {
                test: /\.js/, loader: "babel"
            }
            // You could also use other loaders the same way. I. e. the autoprefixer-loader
        ]
    },
    // devtool: 'source-map',
    // Use the plugin to specify the resulting filename (and add needed behavior to the compiler)
    plugins: [
        new webpack.DefinePlugin({
            IS_DEV: false,
            VERSION: JSON.stringify("5fa3b9"),
            BROWSER_SUPPORTS_HTML5: true,
            TWO: "1+1",
            "typeof window": JSON.stringify("object")
        })

        // ,new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false
        //     }
        // })
    ]
};

