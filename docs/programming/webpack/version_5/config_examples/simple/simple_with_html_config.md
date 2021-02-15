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

    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
};

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


