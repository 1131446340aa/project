const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HotModuleReplacementPlugin = require('webpack/lib/HotModuleReplacementPlugin')
module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  devServer: {
    contentBase: resolve(__dirname, 'src'),
    port: 8080,
    hot: false,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    // new HotModuleReplacementPlugin(),
  ],
}
