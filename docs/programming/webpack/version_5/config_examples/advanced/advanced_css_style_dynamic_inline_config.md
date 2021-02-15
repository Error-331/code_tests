# Simplest config

## Command

`"test-build": "webpack --config webpack.config.test.js --mode=development"`

## Preparation

### Config

```javascript

const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    target: 'node',

    entry: {
        app: './src/index.js',
        main: './src/main.js',
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js',

        publicPath: 'http://localhost:63342/build_test/dist/',
    },

    module: {
        rules: [
            { test: /\.css$/, use: ['style-loader', 'css-loader'], },
            { test: /\.txt$/, use: 'raw-loader' }
        ],
    },

    plugins: [
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

let testVar1 = 5;
testVar1 += 5;

console.log(testVar1);
console.log(testTxt);


if (__DEV__) {
    console.log('development mode');
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

All styles that are imported inside js files will be dynamically inserted via `style` tags.

### HTML

#### Compiled

```html

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Test build app</title>
<script defer src="http://localhost:63342/build_test/dist/app.ff83c503f27ab5251e29.js"></script><script defer src="http://localhost:63342/build_test/dist/main.36d6251c3685e928ac16.js"></script></head>
<body>

    <div>
        Test...
    </div>

</body>
</html>

```

#### Browser

```html

<!DOCTYPE html>
<html lang="en"><head>
    <meta charset="UTF-8">
    <title>Test build app</title>
<script defer="" src="http://localhost:63342/build_test/dist/app.ff83c503f27ab5251e29.js"></script><script defer="" src="http://localhost:63342/build_test/dist/main.36d6251c3685e928ac16.js"></script><style>html {
    margin: 0px;
    padding: 0px;
}

body {
    margin: 0px;
    padding: 0px;

    background-color: green;
}
</style></head>
<body cz-shortcut-listen="true">

    <div>
        Test...
    </div>



</body></html>

```
