const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const webpack = require('webpack');
const { VueLoaderPlugin } = require('vue-loader');

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
            new webpack.HotModuleReplacementPlugin(),
            new VueLoaderPlugin()
        ],

        output: {
            // eslint-disable-next-line no-undef
            path: path.resolve(__dirname, './dist'),
            publicPath: './',
            filename: '[name].[hash].js'
        },

        resolve: {
            alias: {
                vue$: 'vue/dist/vue.esm.js'
            },
            extensions: ['*', '.js', '.vue', '.json']
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
                    test: /\.sass$/,
                    exclude: /node_modules/,
                    use: [
                        // Creates `style` nodes from JS strings
                        // 'style-loader',
                        'vue-style-loader',
                        // Translates CSS into CommonJS
                        'css-loader',
                        // Compiles Sass to CSS
                        // 'sass-loader',
                        {
                            loader: 'sass-loader',
                            options: {
                                sassOptions: {
                                    indentedSyntax: true
                                }
                            }
                        }
                    ],
                },
                {
                    test: /\.(png|svg|jpg|gif|fbx|glb)$/,
                    use: ['file-loader'],
                },
                {
                    test: /\.vue$/,
                    loader: 'vue-loader'
                },
                {
                    test: /\.pug$/,
                    loader: 'pug-plain-loader'
                }
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
