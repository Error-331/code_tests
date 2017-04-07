var path = require('path');
var webpack = require('webpack');
var validate = require('webpack-validator');

module.exports = validate({
    devtool: 'cheap-module-eval-source-map',
    resolve: {
        root: [
            path.resolve('./src/vanilla_js')
        ]
    },
    entry: [
        'babel-polyfill',
        './src/vanilla_js/index'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js'
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
