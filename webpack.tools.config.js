var path = require('path');
var webpack = require('webpack');
var validate = require('webpack-validator');

module.exports = validate({
    devtool: 'cheap-module-eval-source-map',
    resolve: {
        root: [
            path.resolve('./src/tools')
        ]
    },
    entry: [
        'babel-polyfill',
        './src/tools/index'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'tools_bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                include: [
                    path.resolve(__dirname, 'src/')
                ],
                exclude: /(node_modules|bower_components)/,
                loaders: ['babel']
            }
        ]
    }
});
