const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')

const webpack = require('webpack')

class MyPlugin {
    apply (compiler) {
        console.log('MyPlugin start')

        compiler.hooks.emit.tap('MyPlugin', compilation => {
            // compilation =? 可以理解为此次打包的上下文
            for (const key in compilation.assets) {
                if (key.endsWith('.js')) {
                    const contents = compilation.assets[key].source()
                    const withoutComments = contents.replace(/\/\*\*+\*\//g, '')
                    compilation.assets[key] = {
                        source: () => withoutComments,
                        size: () => withoutComments.length
                    }
                }
            }
        })
    }
}

module.exports = {
    mode: 'none',
    entry: './src/main.js', //打包入口路径 相对路径的'./'不能忽略
    output: {   //输出路径
        filename: 'bundle.js',  //输出文件名
        path: path.join(__dirname, 'output'),  //输出路径
        // publicPath: 'output/',  //网站的根目录
    },
    devtool: 'source-map',
    devServer: {
        hot: true,
        contentBase: './public',
        proxy: {
            '/api': {
                // http://localhost:8080/api/users -> https://api.github.com/api/users
                target: 'https://api.github.com',
                // http://localhost:8080/api/users -> https://api.github.com/users
                pathRewrite: {
                    '^api': ''
                },
                // 不能使用 localhost:8080 作为请求 Github 的主机名
                changeOrigin: true
            }
        }
    },
    module: {
        rules: [
            {
                test: /.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                },
                exclude: /node_modules/
            },
            {
                test: /.js$/,
                use:  'eslint-loader',
                exclude: /node_modules/,
                enforce: 'pre'
            },
            {
                test: /.css$/,
                use: [                  // use为数组的话则从后向前依次使用
                    // 'style-loader',
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            // {
            //     test: /.png$/,
            //     use: 'file-loader'
            // },
            {
                test: /.png$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10 * 1024 // 10KB
                    }
                }
            },
            // {
            //     test: /.html$/,
            //     use: {
            //         loader: 'html-loader',
            //         options: {
            //             attrs: ['img:src', 'a:href']
            //         }
            //     }
            // },
            {
                test: /.md$/,
                use: [
                    'html-loader',
                    './markdown-loader'
                ]
            },
        ],
    },
    optimization: {
        minimizer: [
            new TerserWebpackPlugin(),
            new OptimizeCssAssetsWebpackPlugin()
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        // 用于生成index.html文件
        new HtmlWebpackPlugin({
            title: 'Webpack Plugin Sample',
            meta: {
                viewport: 'width=device-width'
            },
            template: './src/index.html'
        }),
        // 用于生成about.html文件
        new HtmlWebpackPlugin({
           filename: 'about.html'
        }),
        // 开发阶段最好不要使用这个插件 会增加开销
        new CopyWebpackPlugin({
            patterns: [
                { from: 'public' },
            ],
        }),
        new webpack.HotModuleReplacementPlugin(),
        new MiniCssExtractPlugin()
        // new OptimizeCssAssetsWebpackPlugin()
        // new MyPlugin()
    ]
}