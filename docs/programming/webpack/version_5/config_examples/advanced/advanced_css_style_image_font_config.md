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
<html lang="en"><head><meta charset="UTF-8"><title>Test build app</title><script defer="defer" src="http://localhost:63342/build_test/dist/app.51e3af5a0b3af9d65302.js"></script><script defer="defer" src="http://localhost:63342/build_test/dist/main.67a479e8f6c4d023234c.js"></script><style>@font-face {
    font-family: 'MyFont';
    src: url(http://localhost:63342/build_test/dist/df83aca91e5faad5cbc3.ttf) format('truetype');
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
    background: url(http://localhost:63342/build_test/dist/5b95fc36d1f896e6fc5b.png);
}
</style></head><body cz-shortcut-listen="true"><div>Test...</div></body></html>
```
