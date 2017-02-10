const webpack = require('webpack');
var entry = require('glob').sync('./src/js/*.js', null).reduce((result, filename) => {
    var name = filename.split('/').pop().split('.')[0]
    result[name] = [filename]
    return result
}, {})

module.exports = {
    entry
    // : {
    //     vue: ['./src/js/vue.js'],
    //     react: ['./src/js/react.js']
    // }
    ,
    output: {
        path: require('path').resolve('./dist/js'),
        filename: '[name].js',
        publicPath: '/dist/js'
    },
    module: {
        loaders: [{
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_module/
            },
            // // Extract css files
            {
                test: /\.css$/,
                loader: "style!css"
                    // loader: ExtractTextPlugin.extract("style-loader", "css-loader")
            },
            {
                test: /\.vue$/,
                loader: "vue"
            }
            // // Optionally extract less files
            // // or any other compile-to-css language
            // {
            //     test: /\.less$/,
            //     loader: "style!css!autoprefixer!less"
            //     // loader: ExtractTextPlugin.extract("style", "css!autoprefixer!less")
            // },
            // {
            //     test: /\.scss$/,
            //     // loader: ExtractTextPlugin.extract("style", "css!autoprefixer!sass")
            //     loader: "style!css!autoprefixer!sass"
            // },
            // {
            //     test: /\.(png|jpg)$/, loader: "url?limit=8192"
            // },
            // {
            //     test: /\.html$/, loader: "html?attrs=link:href"
            // },
            // {
            //     test: /react.*\.js$/,
            //     loader: 'babel',
            //     exclude: /node_module/,
            //     query: {
            //         presets: [['es2015'], ['react'], ['stage-0']]
            //     }
            // },
        ]
    },
    devtool: 'sourcemap',
    plugins: [
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         drop_console: true,
        //         warnings: false
        //     },
        //     output: {
        //         comments: /^!|preserve|license|cc_on/i
        //     },
        //     // preserveComments: 'some',
        //     verbose: true,
        //     lint: true
        // })
    ]
}