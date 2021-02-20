# Simplest config

## Command

`"test-build": "webpack --config webpack.config.test.js --mode=development"`

## Preparation

### Config

```javascript

const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    target: 'web',
    devtool: 'inline-source-map',
    mode: 'development',

    devServer: {
        contentBase: './dist',
        hot: true,
    },

    entry: {
        app: './src/index.js',
      //  main: './src/main.js',
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',

        publicPath: '/'
       // publicPath: 'http://localhost:63342/build_test/dist/',
    },

    module: {
        rules: [
            { test: /\.css$/, use: ['style-loader', 'css-loader'], },
            { test: /\.txt$/, use: 'raw-loader' },

            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },

            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
        ],


    },

    plugins: [
        new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
};


```

### JS

#### index.js

```javascript

const testTxt = require('./test.txt').default;
require('./css/style1.css');

import { subTest1 } from './sub1';

let testVar1 = 5;
testVar1 += 5;

console.log(testVar1);
console.log(testTxt);


if (module.hot) {
    module.hot.accept('./sub1.js', function() {
        console.log('Accepting the updated sub1 module!');
        console.log('from hot', subTest1());
    })
}

```

#### sub1.js

```javascript

export function subTest1() {
    const testVar1 = 'test_val_1(sub1)';
    return testVar1;
}

```

### HTML

```html

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Test build app</title>
</head>
<body>

    <div>
        Test...
    </div>

</body>
</html>

```

## Result

All specified `js` files and `css` files will be reloaded automatically upon update. Note `if (module.hot)` code. HTML file will not be reloaded automatically.

