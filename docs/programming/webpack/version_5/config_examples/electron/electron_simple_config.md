# Configuration

## Commands

### Build artifacts for render process

`"build-for-desktop": "NODE_ENV=production webpack --config webpack.config.electron.test.js --env=dev --progress --profile --color"`

### Start electron

`"start-electron": "electron ./platform/main.js"`

## Preparation

### Package JSON

```json

{
  "name": "build-test",
  "version": "1.0.0",
  "scripts": {
    "build-for-desktop": "NODE_ENV=production webpack --config webpack.config.electron.test.js --env=dev --progress --profile --color",
    "start-electron": "electron ./platform/main.js"
  },
  "dependencies": {},
  "devDependencies": {
    "webpack": "5.23.0",
    "webpack-cli": "4.5.0",
    "html-webpack-plugin": "5.2.0",
    "clean-webpack-plugin": "3.0.0",
    "mini-css-extract-plugin": "1.6.0",
    "file-loader": "6.2.0",
    "css-loader": "5.0.2",
    "sass-loader": "11.0.1",
    "raw-loader": "4.0.2",
    "babel-loader": "8.2.2",
    "@babel/core": "7.12.17",
    "@babel/cli": "7.12.17",
    "@babel/preset-env": "7.12.17",
    "node-sass": "5.0.0",
    "font-awesome": "4.7.0",
    "electron": "11.0.5"
  }
}

```

### Webpack config

```javascript

const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const config = {
    target: 'web',
    devtool: false,
    mode: 'production',

    entry: {
        app: './src/index.js',
    },

    output: {
        path: path.resolve(__dirname, 'dist/browser'),
        filename: '[name].bundle.js',

        publicPath: path.resolve(__dirname, 'dist/browser'),
    },

    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [

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
            { test: /\.txt$/, use: 'raw-loader' },

            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                loader: 'file-loader',

                options: {
                    name: '[name].[ext]',
                    publicPath: path.resolve(__dirname, 'dist/browser'),
                }
            },

            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                loader: 'file-loader',

                options: {
                    name: '[name].[ext]',
                    publicPath: path.resolve(__dirname, 'dist/browser'),
                }
            },
        ],
    },

    plugins: [
        new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css'
        }),
    ],
};

module.exports = config;

```

### JS

#### Platform (Electron)

##### main.js

```javascript

const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow () {
    const win = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,

            preload: path.join(__dirname, 'preload.js')
        },

        width: 800,
        height: 600,
    });

    win.loadFile(path.join(__dirname, './../dist/browser/index.html'));
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

````

##### preload.js

```javascript

alert('Hello Electron!');

````

#### Source

##### index.js

```javascript

const testTxt = require('./test.txt').default;
require('./css/style1.css');
require('./scss/style1.scss');

import { subTest1 } from './sub1';

let testVar1 = 5;
testVar1 += 5;

console.log(testVar1);
console.log(testTxt);

```

##### sub1.js

```javascript

export function subTest1() {
    const testVar1 = 'test_val_1(sub1)';
    return testVar1;
}

```

##### main.js

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


```scss

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

## Result

The application for render process (Electron) will be built using `build-for-desktop` command. Then the Electron main process will be launched using `start-electron` command.

