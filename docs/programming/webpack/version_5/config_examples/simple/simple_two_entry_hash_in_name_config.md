# Simplest config

## Command

`"test-build": "webpack --config webpack.config.test.js --mode=development"`

## Preparation

### Config

```javascript

const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    entry: {
        app: {
            import: './src/index.js',
            filename: '[name].[contenthash].build.js'
        },

        mainApp: {
            import: './src/main.js',
            filename:  '[name].[contenthash].main.js'
        }
    },

    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'build.js',
    },

    module: {
        rules: [{ test: /\.txt$/, use: 'raw-loader' }],
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
};

```

## Result

Two chunks (`build.js` and `main.js`) which are compiled into two separate files (two separate links will be inserted into HTML file). Names of the chunk files will contain hashes and if some 
of the files will be changed - new file with the new hash will be created in the build directory.
