# Simplest config (two entry points in array form)

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
    "html-webpack-plugin": "5.2.0",
    "raw-loader": "4.0.2"
  }
}

```

### Webpack config

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

### JS

#### index.js

```javascript

const testTxt = require('./test.txt').default;

let testVar1 = 5;
testVar1 += 5;

console.log(testVar1);
console.log(testTxt);

````

#### main.js

```javascript

let testVar2 = 'test2 val';
testVar2 += '_add';

console.log(testVar2);

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

One chunk (`build.js`) which combines `index.js` and `main.js` which are executed sequentially.


