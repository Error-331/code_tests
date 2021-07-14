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
  "dependencies": {},
  "devDependencies": {
    "webpack": "5.23.0",
    "webpack-cli": "4.5.0"
  }
}

```

### Webpack config

```javascript

module.exports = {
    entry: {
        main: './src/index.js',
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

An `index.js` file will be packaged into `main.js` file.


