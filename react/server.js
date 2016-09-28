let WebpackDevServer = require('webpack-dev-server')
let webpack = require('webpack')

const Config = require('./webpack.config.js')
const PORT = 3000
const PUBLIC_PATH = 'dist'

Config.output.publicPath = `http://localhost:${PORT}/${PUBLIC_PATH}`
Config.plugins.push(new webpack.HotModuleReplacementPlugin())
Config.debug = true
// Config.proxy = {
//     '/dist/*': {
//         target: `http://localhost:${PORT}`
//     }
// }

Config.entry.app.unshift(
  `webpack-dev-server/client?http://localhost:${PORT}`, // WebpackDevServer host and port
  // 'webpack/hot/dev-server'
  )
console.log(Config);

var compiler = webpack(Config)

new WebpackDevServer(compiler, {
    hot: true,
    publicPath: Config.output.publicPath,
    stats: {
        color: true
    }
}).listen(PORT);

