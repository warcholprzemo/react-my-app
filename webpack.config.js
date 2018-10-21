const HtmlWebPackPlugin = require("html-webpack-plugin");
const webpack = require('webpack');

const API_URLS = {
    production: JSON.stringify('https://shielded-beach-87349.herokuapp.com'),
    development: JSON.stringify('http://localhost:8000'),
}

const environment = process.env.NODE_ENV === 'production' ? 'production' : 'development';

module.exports = {
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.css$/,
                include: /node_modules/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [{
                    loader: 'file-loader',
                    options: {}
                }]
            },
            {
                test: /\.html$/,
                use: [{
                    loader: "html-loader"
                }]
            }
        ]
    },
    entry: "./src/index.js",
    output: {
        filename: "./static/index.js",
        publicPath: "/dist/"
    },
    devServer: {
        port: 3000,
        historyApiFallback: {
            index: 'prod-template/index.html',
        }
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./public/index.html",
            filename: "../prod-template/index.html"
        }),
        new webpack.DefinePlugin({
            API_URL: API_URLS[environment]
        })
    ]
};
