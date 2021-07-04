# Simplest config

- [X] Approved

## Command

`"test-build-dev-serve": "NODE_ENV=development node server.js"`

## Preparation

### Package JSON

```json

{
  "name": "build-test",
  "version": "1.0.0",
  "scripts": {
    "test-build-dev-serve": "NODE_ENV=development node server.js"
  },
  "dependencies": {},
  "devDependencies": {
    "webpack": "5.23.0",
    "webpack-cli": "4.5.0",
    "webpack-dev-middleware": "4.1.0",
    "webpack-hot-middleware": "2.25.0",
    "html-webpack-plugin": "5.2.0",
    "clean-webpack-plugin": "3.0.0",
    "mini-css-extract-plugin": "1.6.0",
    "css-minimizer-webpack-plugin": "2.0.0",
    "url-loader": "4.1.1",
    "style-loader": "2.0.0",
    "css-loader": "5.0.2",
    "sass-loader": "11.0.1",
    "raw-loader": "4.0.2",
    "node-sass": "5.0.0",
    "font-awesome": "4.7.0",
    "express": "4.17.1"
  }
}
```

### Webpack config

```javascript

const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const config = {
    target: 'web',
    devtool: process.env.NODE_ENV === 'development' ? 'eval' : false,
    mode: process.env.NODE_ENV === 'development' ? 'development' : 'production',

    entry: {
        app: [
            'webpack-hot-middleware/client',
            './src/index.js',
        ],

        vendor: [
            './src/sub1.js'
        ]
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',

        publicPath: '/'
    },

    optimization: {
        minimize: process.env.NODE_ENV === 'development' ? true : false,
        runtimeChunk: process.env.NODE_ENV === 'development' ? 'single' : false,
        minimizer: [
            new CssMinimizerPlugin({
                minimizerOptions: {
                    preset: [
                        'default',
                        {
                            autoprefixer: {
                                add: true,
                                remove: true,
                                browsers: ['last 2 versions'],
                            },

                            discardComments: { removeAll: true },

                            discardUnused: false,
                            mergeIdents: false,
                            reduceIdents: false,
                        },
                    ],
                },
            }),
        ],
    },

    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    process.env.NODE_ENV === 'development' ?

                        {
                            loader: 'style-loader'
                        } :

                        {
                            loader: MiniCssExtractPlugin.loader,
                        },

                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                        }
                    },
                    'sass-loader',
                ],
            },

            {
                test: /\.css$/,
                use: [
                    process.env.NODE_ENV === 'development' ?

                        {
                            loader: 'style-loader'
                        } :

                        {
                            loader: MiniCssExtractPlugin.loader,
                        },

                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                        }
                    },
                ],
            },
            {
                test: /\.txt$/, use: 'raw-loader'
            },

            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                loader: 'url-loader',
            },

            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                loader: 'url-loader',
            },
        ],
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
    ],
};

if (process.env.NODE_ENV !== 'development') {
    config.plugins.push(
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css'
        })
    )
}

module.exports = config;

```

### JS

#### server.js

```javascript

const express = require('express');
const webpack = require('webpack');

const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const config = require('./webpack.config');
const PORT = process.env.PORT || 3000;

const app = express();
const compiler = webpack(config);

const wdm = webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
});

app.use(wdm);
app.use(webpackHotMiddleware(compiler));

const server = app.listen(PORT, 'localhost', serverError => {
    if (serverError) {
        return console.error(serverError);
    }

    console.log(`Listening at http://localhost:${PORT}`);
});

process.on('SIGTERM', () => {
    console.log('Stopping dev server');
    wdm.close();
    server.close(() => {
        process.exit(0);
    });
});

```

#### index.js

```javascript

const testTxt = require('./test.txt').default;
require('./css/style1.css');
require('./scss/style1.scss');

import { subTest1 } from './sub1';

let testVar1 = 5;
testVar1 += 5;

console.log(testVar1);
console.log(testTxt);


if (module.hot) {
    module.hot.accept('./sub1.js', function() {
        console.log('Accepting the updated sub1 module!');
        console.log('from hot', subTest1());
    })
}

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

### SCSS

#### style1.scss

```scss

$fa-font-path: "~font-awesome/fonts/";
@import "~font-awesome/scss/font-awesome";

$color1: #c6538c;

.test_div {
  background-color: $color1;
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

    <div class="test_div">
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

Dedicated dev server will be launched (localhost:3000). If changes are made to any of the source files - the dev server will immediately recompile all the files, and the 
browser tab will be refreshed.

