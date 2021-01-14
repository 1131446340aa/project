const webpack = require('../webpack/lib/webpack')
const webpackOptions = require('./webpack.config')

const complier = webpack(webpackOptions)

complier.run((err, stats) => {
  // console.log(stats.toJSON())
})
