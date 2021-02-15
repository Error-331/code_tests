# Simplest config

## Command

`"test-build": "webpack --config webpack.config.test.js --mode=development"`

## Preparation

### Config

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        app: './src/index.js',
        mainApp: './src/main.js'
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

Two chunks (`build.js` and `main.js`) which are compiled into two separate files (two separate links will be inserted into HTML file).
