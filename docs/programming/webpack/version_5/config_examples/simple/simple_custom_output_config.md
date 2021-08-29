# Simplest config (custom output)

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
    "webpack-cli": "4.5.0"
  }
}

```

### Webpack config

```javascript

const path = require('path');

module.exports = {
    entry: {
        main: './src/index.js',
    },

    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'build.js',
    },
};

```

### JS

#### index.js

```javascript

let testVar1 = 5;
testVar1 += 5;

console.log(testVar1);

```

## Result

An `index.js` file will be packaged into `build.js` file which will be located in the `./build` directory.
