module.exports = config => {
    config.set({
        basePath: '',

        frameworks: ['jasmine'],

        files: [],

        webpack: {
            module: {
                loaders: [
                    { test: /\.js/, exclude: /node_modules/, loader: 'babel-loader' }
                ]
            },
            watch: true
        },

        exclude: [],

        preprocessors: { 'webpack.karma.context.js': ['webpack'] },

        reporters: ['progress'],

        port: 9876,

        colors: true,

        logLevel: config.LOG_INFO,

        autoWatch: true,

        browsers: ['Chrome'],

        singleRun: false,

        concurrency: Infinity
    });
};