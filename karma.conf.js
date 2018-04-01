const webpack = require('webpack');

module.exports = config => {
    config.set({
        basePath: '',

        browsers: ['Chrome'],
        frameworks: ['jasmine'],
        reporters: ['mocha'],

        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        singleRun: false,
        concurrency: Infinity,

        exclude: [],
        preprocessors: {
            'webpack.karma.context.js': ['webpack'],
        },
        files: ['webpack.karma.context.js'],

        webpack: {
            module: {
                loaders: [
                    {
                        test: /\.html$/,
                        loader: 'html-loader',
                        exclude: /(node_modules|bower_components)/,
                    },
                    {
                        test: /\.js/,
                        exclude: /node_modules/,
                        loader: 'babel-loader'
                    },
                    {
                        test: /\.css$/,
                        loader: 'style-loader!css-loader'
                    },
                    {
                        test: /\.scss$/,
                        loader: 'css-loader!sass-loader',
                    },
                    {
                        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                        loader: 'file-loader?name=assets/[name].[hash].[ext]'
                    },
                ]
            },
            watch: true
        },
    });
};
