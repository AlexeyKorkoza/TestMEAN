require('dotenv').config();
const webpack = require('webpack');
const ExtractTextPlugin = require ('extract-text-webpack-plugin');
const rimraf = require('rimraf');
const path = require('path');

const plugins = [
    {
        apply: compiler => {
            rimraf.sync(compiler.options.output.path);
        },
    },

    new webpack.NoEmitOnErrorsPlugin(),

    new webpack.DefinePlugin({
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    }),
    new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
        Selectize: 'selectize'
    }),
    new ExtractTextPlugin("bundle.css")
];

if(process.env.NODE_ENV === 'production') {
    plugins.push(new webpack.optimize.UglifyJsPlugin({
        compressor: { warnings: false },
    }));
}

module.exports = {
    entry: './public/app/app.module.js',
    output: {
        path: path.join(__dirname, '/public/build'),
        filename: 'bundle.js',
    },
    plugins,
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ["env"]
                }
            },
            {
                test: /\.html$/,
                loader: 'html-loader',
                exclude: /(node_modules|bower_components)/,
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                loader: 'file-loader?name=assets/[name].[hash].[ext]'
            },
        ]
    },
};
