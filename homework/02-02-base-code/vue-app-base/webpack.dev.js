'use strict'
const webpack = require('webpack')
const path = require('path')
const { merge } = require('webpack-merge')
const baseWebpackConfig = require('./webpack.common.js')

// 开发环境的完整的配置文件
module.exports = merge(baseWebpackConfig, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',

  devServer: {
    contentBase: "./dist",
    hot: true,
    host: '0.0.0.0',
    // 指定要监听请求的端口号
    port: 8080,
    // 是否自动打开浏览器
    open: 'http://localhost:8080',
    proxy: {}
  },
  plugins: [
    // 启用热替换模块,不要再生产环境中使用hmr
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),

    // new HtmlWebpackPlugin({
    //   template: path.join(__dirname, 'public/index.html'),
    //   inject: 'body',
    //   title: 'vue app base'
    // }),
   
  ]
})
