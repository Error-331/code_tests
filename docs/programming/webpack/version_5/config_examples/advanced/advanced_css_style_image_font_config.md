# Simplest config

- [X] Approved

## Command

`"test-build": "webpack --config webpack.config.test.js --mode=development"`

## Preparation

### Package JSON

```json

{
  "name": "build-test",
  "version": "1.0.0",
  "scripts": {
    "test-build": "webpack --config webpack.config.test.js --mode=development"
  },
  "dependencies": {
    "font-awesome": "4.7.0"
  },
  "devDependencies": {
    "webpack": "5.23.0",
    "webpack-cli": "4.5.0",
    "html-webpack-plugin": "5.2.0",
    "style-loader": "2.0.0",
    "css-loader": "5.0.2",
    "raw-loader": "4.0.2"
  }
}

```

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
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
};

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

subTest1();

```

#### main.js

```javascript

const somePath = require('./sub1');
const Icon = require('./icon.png');

let testVar2 = 'test2 val';
testVar2 += '_add';

console.log(testVar2);
console.log(somePath);

// Add the image to our existing div.
const myIcon = new Image();
myIcon.src = Icon;

element.appendChild(myIcon);

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

### Raw files

#### Test1.txt

```text

One...Two...Three...

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
<script defer src="http://localhost:63342/build_test/dist/app.c6aa8c142566f612b0dd.js"></script><script defer src="http://localhost:63342/build_test/dist/main.c3d9a92929b8bae4fdc3.js"></script></head>
<body>

<div class="test_div">
    Test...
</div>

</body>
</html>

```
