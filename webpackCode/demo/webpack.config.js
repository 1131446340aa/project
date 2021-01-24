const path = require('path')

module.exports = {
  mode: 'development',
  context: process.cwd(),
  devtool: false,
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
    chunkFilename:[name].js
  },
}
