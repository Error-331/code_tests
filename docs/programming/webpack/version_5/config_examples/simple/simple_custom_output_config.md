# Simplest config

## Command

`"test-build": "webpack --config webpack.config.test.js --mode=development"`

## Preparation

### Config

```javascript

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


