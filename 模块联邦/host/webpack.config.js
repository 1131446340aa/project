const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const path = require('path')
const cssnano = require('cssnano')
module.exports = {
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'app.js',
    chunkFilename:'[name].js',
    publicPath:'http://localhost:8080/'
  },
  cache:{
    type:'filesystem'
  },
  optimization:{
    // splitChunks: {
    //   chunks: 'all'
    // }
    chunkIds:'deterministic',
    moduleIds:'natural'
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    fallback:{
      'crypto':false,
    }
  },
  module: {
    rules: [
      {
        test: /.(js|ts)x?$/,
        // type: 'typescript/auto',
        
        use: [
          {
            loader: 'babel-loader',
            options: {
              // 逆序执行
              presets: [
                "@babel/preset-env",
                "@babel/preset-react",
                '@babel/preset-typescript'
              ],
            },
          }
        ],
        exclude: /node_modules/,
      },
      // {
      //   test: /\.(css|less)$/,
      //   use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader']
      // },
       {
        test: /\.(png|jpeg)$/,
        // loader: 'file-loader'
        type:'asset/resource'
      }

    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    // new FriendlyErrorsWebpackPlugin(),
    // new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      // inlineSource: '.css$',
      template: path.join(path.resolve(__dirname,'./public/index.html')),
    }),
    new ModuleFederationPlugin({
      name:'host',
      // filename:'remoteEntry.js',
      remotes:{
        remote:'remote@http://localhost:8081/remoteEntry.js'
      }
    })
    // new OptimizeCSSAssetsPlugin({
    //   assetNameRegExp: /\.css$/g,
    //   cssProcessor: cssnano,
    // })
  ],
  devServer: {
    // host: '127.0.0.1', // 允许外部ip访问
    port: 8080, // 端口
    // open: false, // 启动后是否自动打开浏览器
    // https: false, // 是否启用https
    // compress: true // 对devServer 所有服务启用 gzip 压缩
  },
  devtool: false,
  mode: 'development'
}
