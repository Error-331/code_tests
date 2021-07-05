# Simplest config

- [X] Approved

## Command

`"test-build-dev-serve": "webpack serve --open --config webpack.config.test.js --mode=development"`

## Preparation

### Package JSON

```json

{
  "name": "build-test",
  "version": "1.0.0",
  "scripts": {
    "test-build-dev-serve": "webpack serve --open --config webpack.config.test.js --mode=development"
  },
  "dependencies": {},
  "devDependencies": {
    "webpack": "5.23.0",
    "webpack-cli": "4.5.0",
    "webpack-dev-server": "3.11.2",
    "html-webpack-plugin": "5.2.0",
    "clean-webpack-plugin": "3.0.0",
    "style-loader": "2.0.0",
    "css-loader": "5.0.2",
    "raw-loader": "4.0.2"
  }
}

```

### Config

```javascript

const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    target: 'web',
    devtool: 'inline-source-map',

    devServer: {
        contentBase: './dist',
    },

    entry: {
        app: './src/index.js',
        main: './src/main.js',
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',

        publicPath: '/'
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

console.log(subTest1());

```

#### sub1.js

```javascript

export function subTest1() {
    const testVar1 = 'test_val_1(sub1)';
    return testVar1;
}

```

#### main.js

```javascript

const somePath = require('./sub1');
const Icon = require('./icon.png');

let testVar2 = 'test2 val';
testVar2 += '_add';

console.log(testVar2);
console.log(somePath);

```

### CSS

#### style1.css

```css

@font-face {
    font-family: 'MyFont';
    src: url('./../Hanalei-Regular.ttf') format('truetype');
    font-weight: 600;
    font-style: normal;
}

html {
    margin: 0px;
    padding: 0px;
}

body {
    margin: 0px;
    padding: 0px;

    font-family: 'MyFont';

    background-color: green;
    background: url('./../icon.png');
}

```

#### style2.css

```css

div {
    background-color: 'gold';
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

### Raw files

#### Test1.txt

```text

One...Two...Three...

```

## Result

Dev server will be launched and additional browser tab will be opened which will point to dev server address. If changes are made to any of the source files - the dev server will immediately 
recompile all the files, and the browser tab will be refreshed.

