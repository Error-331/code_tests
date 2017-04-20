var path = require('path');
var webpack = require('webpack');
var validate = require('webpack-validator');

module.exports = validate({
    devtool: 'cheap-module-eval-source-map',
    resolve: {
        root: [
            path.resolve('./src/vendor_library_tests')
        ]
    },
    entry: [
        'babel-polyfill',
        './src/vendor_library_tests/index'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'vendor_library_tests_bundle.js'
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
