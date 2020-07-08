'use strict'
const path = require('path')
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

// 生成相对于根目录的绝对路径
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  // 指定项目的入口文件
  entry: {
    app: './src/main.js'
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/[name].js",
    publicPath: "./",
  },
  module: {
    rules: [
      { test: /\.vue$/, use: ["vue-loader"] },
      {
        test: /\.js?$/,
        loader: ["babel-loader"],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["vue-style-loader", "css-loader"],
      },
      {
        test: /\.less$/,
        use: ["vue-style-loader", "css-loader", "less-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          esModule: false
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      BASE_URL: '"./"'
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'public/index.html'),
      inject: 'body',
      title: 'vue app base',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      }
    }),
  ]
}
