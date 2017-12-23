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
            },
            { test: /\.html$/, loader: "html" },
            { test: /\.css$/, loader: "style!css" }
        ]
    },
    devtool: "#inline-source-map"
}