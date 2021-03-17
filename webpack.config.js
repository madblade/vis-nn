const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = function(env) {
    return {
        entry: './src/main.js',
        target: 'web',

        plugins: [
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                template: './src/index.html',
                favicon: './img/favicon.ico',
                baseUrl: env.development ?
                    '/' : 'https://madblade.github.io/nn-vis/'
            }),
            new webpack.HotModuleReplacementPlugin()
        ],

        output: {
            path: path.resolve(__dirname, './dist'),
            publicPath: './',
            filename: '[name].[hash].js'
        },

        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader'
                    }
                },
                {
                    // GLSL LOADER
                    // Reference
                    // Loads .glsl files as strings
                    test: /\.glsl$/,
                    loader: 'raw-loader'
                },
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader']
                },
                {
                    test: /\.(png|svg|jpg|gif|fbx|glb)$/,
                    use: ['file-loader'
                    ],
                },
            ]
        },

        devServer: {
            // host: '0.0.0.0',
            // contentBase: './dist',
            contentBase: 'http://localhost:8080/dist',
            port: 8080,
            hot: true,
            disableHostCheck: true
        },

        optimization: {
            runtimeChunk: 'single',
            splitChunks: {
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        chunks: 'all'
                    }
                }
            }
        }
    };
};
