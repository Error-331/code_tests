# Simplest config (HTML plugin)

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
  "dependencies": {},
  "devDependencies": {
    "webpack": "5.23.0",
    "webpack-cli": "4.5.0",
    "html-webpack-plugin": "5.2.0"
  }
}

```

### Webpack config

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

### JS

#### index.js

```javascript


let testVar1 = 5;
testVar1 += 5;

console.log(testVar1);

````

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

One chunk will be generated (`build.js`) which will be added as a link to HTML file (which uses `./src/index.html` file as a template).

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


