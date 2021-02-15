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
        main: './src/index.js',
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

### test.txt

```text

One...Two...Three...

```

### index.js

const testTxt = require('./test.txt').default;

let testVar1 = 5;
testVar1 += 5;

console.log(testVar1);
console.log(testTxt);

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

### HTML

```html

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Test build app</title>
    <script defer src="build.js"></script></head>
<body>
    <div>
        Test...
    </div>
</body>
</html>

```

### Console output

```bash

10
One...Two...Three...

```


