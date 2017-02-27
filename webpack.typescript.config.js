var path = require('path');
var webpack = require('webpack');
var validate = require('webpack-validator');

var nodeModulesPath = path.resolve(__dirname, 'node_modules');

module.exports = validate({
    devtool: 'cheap-module-eval-source-map',
    resolve: {
        root: [
            path.resolve('./src/type_script/'),
        ],

        extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },
    entry: [
        './src/type_script/index.ts'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'typescript_bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                loaders: ['babel-loader', 'ts-loader'],
                exclude: [/node_modules/, nodeModulesPath]
            },

            {
                test: /\.js$/,
                include: [
                    path.resolve(__dirname, "src"),
                ],

                exclude: [/node_modules/, nodeModulesPath],
                loaders: ['babel']
            }
        ]
    }
});
