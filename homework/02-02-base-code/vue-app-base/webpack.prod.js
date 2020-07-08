'use strict'
// 引入path模块
const path = require('path')
// 引入webpack模块
const webpack = require('webpack')
// 引入webpack-merge模块
const { merge } = require('webpack-merge')
// 引入开发环境和生产环境公共的配置
const baseWebpackConfig = require('./webpack.common')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const webpackConfig = merge(baseWebpackConfig, {
  mode :'production',
  devtool: false,
  optimization: {
    usedExports: true, 
    minimize: true, 
    concatenateModules: true,
    splitChunks: {
      chunks: 'all',
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        enforce: 'pre'
      },
    ]
  },
  plugins: [
    new UglifyJsPlugin({
      uglifyOptions: {
      },
      sourceMap: false,
      parallel: true
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
        patterns: [
            {
               from: 'public'
            },
        ],
    }),
  ]
})


module.exports = webpackConfig
