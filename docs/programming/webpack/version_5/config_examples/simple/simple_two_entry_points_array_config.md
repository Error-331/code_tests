# Simplest config

## Command

`"test-build": "webpack --config webpack.config.test.js --mode=development"`

## Preparation

### Config

```javascript

const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    entry: [
        './src/index.js',
        './src/main.js'
    ],

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

One chunk (`build.js`) which combines `index.js` and `main.js` which are executed sequentially.


