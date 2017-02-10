let WebpackDevServer = require('webpack-dev-server')
let webpack = require('webpack')

const Config = require('../webpack.config.js')
const PORT = 3000

Config.output.publicPath = `http://localhost:${PORT}${Config.output.publicPath}`
Config.plugins.push(new webpack.HotModuleReplacementPlugin())
Config.debug = true
// Config.proxy = {
//     '/dist/*': {
//         target: `http://localhost:${PORT}`
//     }
// }

Object.keys(Config.entry).map(key => {
    if (!Config.entry[key].unshift) {
        Config.entry[key] = [Config.entry[key]]
    }
    Config.entry[key].unshift(`webpack-dev-server/client?http://localhost:${PORT}/`)
    Config.entry[key].unshift('webpack/hot/dev-server')
})

console.log(Config);

var compiler = webpack(Config)

new WebpackDevServer(compiler, {
    hot: true,
    publicPath: Config.output.publicPath,
    stats: {
        color: true
    }
}).listen(PORT);
