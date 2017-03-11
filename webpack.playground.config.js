var path = require('path');
var webpack = require('webpack');
var validate = require('webpack-validator');

module.exports = validate({
    devtool: 'cheap-module-eval-source-map',
    resolve: {
        root: [
            path.resolve('./src/playground')
        ]
    },
    entry: [
        'babel-polyfill',
        './src/playground/index'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'playground_bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                include: [
                    path.resolve(__dirname, "src/playground"),
                ],
                exclude: /(node_modules|bower_components)/,
                loaders: ['babel']
            },

            {
                test: /\.json$/,
                loader: 'json-loader'
            },
        ]
    }
});
