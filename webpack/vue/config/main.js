const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const path = require('path')
const cssnano = require('cssnano')
module.exports = {
  entry: path.resolve(__dirname, '../app.tsx'),
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'app.js',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader',
          },
        ],
      },
      {
        test: /.(js|ts)x?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              // 逆序执行
              presets: [
                '@babel/preset-env',
                '@babel/preset-react',
                '@babel/preset-typescript',
              ],
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(css|less)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
      },
      {
        test: /\.(png|jpeg)$/,
        loader: 'file-loader',
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new FriendlyErrorsWebpackPlugin(),
    new MiniCssExtractPlugin(),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      // inlineSource: '.css$',
      template: path.join(path.resolve(__dirname, '../index.html')),
    }),
    new OptimizeCSSAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: cssnano,
    }),
  ],
  devServer: {
    host: '127.0.0.1', // 允许外部ip访问
    port: 8083, // 端口
    open: false, // 启动后是否自动打开浏览器
    https: false, // 是否启用https
    compress: true, // 对devServer 所有服务启用 gzip 压缩
  },
  devtool: 'cheap-source-map',
  mode: 'development',
}
