const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')


module.exports = (env, argv) => {
    const config = {
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
                    test: /.css$/,
                    use: [                  // use为数组的话则从后向前依次使用
                        'style-loader',
                        'css-loader'
                    ]
                },
                {
                    test: /.png$/,
                    use: {
                        loader: 'url-loader',
                        options: {
                            limit: 10 * 1024 // 10KB
                        }
                    }
                },
            ],
        },
        plugins: [
            new HtmlWebpackPlugin({
                title: 'Webpack Plugin Sample',
                meta: {
                    viewport: 'width=device-width'
                },
                template: './src/index.html'
            })
        ]
    }

    if (env === 'production') {
        config.mode = 'production'
        config.devtool = false
        config.plugins = [
            ...config.plugins,
            new CleanWebpackPlugin(),
            new CopyWebpackPlugin({
                patterns: [
                    { from: 'public' },
                ],
            }),
        ]

        return config
    }
}