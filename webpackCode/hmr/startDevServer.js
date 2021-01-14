const webpack = require('webpack')

const config = require('./webpack.config')

const Server = require('./lib/server')

function startDevServer(complier, config) {
  const devServer = config.devServer || {}
  const server = new Server(complier, devServer)
  const { port = 8080, host = '0.0.0.0' } = devServer
  server.listen(port, host, (err) => {
    console.log('run')
  })
}

const complier = webpack(config)

startDevServer(complier, config)

module.exports = startDevServer
