const webpack = require('webpack');
const ExtractTextPlugin = require ('extract-text-webpack-plugin');
const path = require('path');

module.exports = {
    entry: './public/app/app.module.js',
    output: {
        path: path.join(__dirname, '/public/build'),
        filename: 'bundle.js',
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            Selectize: 'selectize'
        }),
        new ExtractTextPlugin({
            filename: '/public/build/bundle.css',
            allChunks: true,
        }),
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ["es2015", "es2017"]
                }
            },
            {
                test: /\.html$/,
                loader: 'html-loader',
                exclude: /(node_modules|bower_components)/,
            },
            {
                test: /\.css$/,
                loader: 'css-loader'
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                loader: 'file-loader?name=assets/[name].[hash].[ext]'
            },
        ]
    },
};
