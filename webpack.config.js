const path = require('path');

module.exports = {
    entry: './public/app/app.module.js',
    output: {
        path: path.join(__dirname, '/public/build'),
        filename: 'bundle.js',
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ["es2015", "es2017"]
                }
            },
            {
                test: /\.html$/,
                loader: 'html-loader',
                exclude: /node_modules/,
            },
        ]
    },
};
