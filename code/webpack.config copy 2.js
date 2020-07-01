const webpack = require('webpack')


module.exports = {
    mode: 'none',
    // entry: './src/main.js', 
    entry: {
        index: './src/main.js',
        about: './src/about.js',
    }, 
    output: {  
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', { modules: false }]
                        ]
                    }
                },
                exclude: /node_modules/
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'index',
            template: './src/index.html',
            filename: 'index.html',
            chunks: ['index']
        }),
        new HtmlWebpackPlugin({
            title: 'about',
            template: './src/about.html',
            filename: 'about.html',
            chunks: ['about']

        })
    ],
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    }
}