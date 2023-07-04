const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin= require('copy-webpack-plugin');
const Dotenv= require('dotenv-webpack');


module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname,'dist'),
        filename: '[name].[contenthash].js',
        assetModuleFilename: 'assets/images/[hash][ext][query]'
    },
    mode: 'development',
    watch: true,
    resolve: {
        extensions: ['.js'],
        alias: {
            '@utils': path.resolve(__dirname,'src/utils/'),
            '@templates': path.resolve(__dirname,'src/templates/'),
            '@styles': path.resolve(__dirname,'src/styles/'),
            '@images': path.resolve(__dirname,'src/assets/images/')
        }
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"

                }
            },
            {
                test: /\.css|.styl$/i,
                use: [MiniCssExtractPlugin.loader,
                    'css-loader',
                    'stylus-loader'],
            },
            {
                //Configuracion para que webpack pueda leer imagenes
                //Copiar archivos de imagenes pero mas livianos
                test: /\.png/,
                type: 'asset/resource'
            },
            {
                test: /\.(woff|woff2)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        //limit => limite de tamaño
                        limit: 10000,
                        //Mimetype => tipo de dato
                        mimetype: "application/font-woff",
                        //name => nombre de salida
                        name: "[name].[contenthash].[ext]",
                        //outputPath => donde se va a guardar en la carpeta final
                        outputPath: "./assets/fonts/",
                        //publicPath => donde se va a guardar en la carpeta final
                        publicPath: "../assets/fonts/",
                        //especifica el tipo de modulo
                        esModule: false
                    }
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: './public/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename:'assets/[name].[contenthash].css'
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname,'src','assets/images'),
                    to: 'assets/images'
                }
            ]
        }),
        new Dotenv(),
    ],
}