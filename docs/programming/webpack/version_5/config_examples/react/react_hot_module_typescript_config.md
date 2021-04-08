# Simplest config

## Command

`"test-build": "webpack serve --open --config webpack.config.test.js --mode=development"`

## Preparation

### Package JSON

```json

{
  "name": "build-test",
  "version": "1.0.0",
  "scripts": {
    "test-build-dev": "webpack --config webpack.config.test.js --mode=development",
    "test-build-prod": "webpack --config webpack.config.test.js --mode=production",
    "test-build-dev-serve": "webpack serve --open --config webpack.config.test.js --mode=development"
  },
  "author": "your name",
  "description": "My Electron app",
  "license": "MIT",
  "main": "./electron/index.js",
  "dependencies": {
    "core-js": "3.9.0",
    "react": "17.0.1",
    "react-dom": "17.0.1",
    "react-router-dom": "5.2.0",
    "regenerator-runtime": "0.13.7"
  },
  "devDependencies": {
    "webpack": "5.23.0",
    "webpack-cli": "4.5.0",
    "webpack-dev-server": "3.11.2",
    "raw-loader": "4.0.2",
    "style-loader": "2.0.0",
    "css-loader": "5.0.2",
    "babel-loader": "8.2.2",
    "clean-webpack-plugin": "3.0.0",
    "html-webpack-plugin": "5.2.0",
    "@babel/cli": "7.12.17",
    "@babel/core": "7.12.17",
    "@babel/preset-env": "7.12.17",
    "@babel/preset-react": "7.12.13",
    "@babel/preset-typescript": "7.12.17",
    "typescript": "4.2.2"
  }
}

```

### Webpack config

```javascript

const path = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    target: 'web',
    devtool: 'inline-source-map',

    devServer: {
        contentBase: './dist',
        hot: true,
    },

    entry: {
        index: './src/index.tsx',
    },

    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[chunkhash].bundle.js',

        publicPath: '/'
    },

    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },

    module: {
        rules: [
            {
                test: /\.m?tsx$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                }
            },

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
        new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
};

```

### Babel JS config (babel.config.js)

```javascript

const presets = [
    [
        "@babel/env",
        {
            targets: {
                edge: "17",
                firefox: "60",
                chrome: "67",
                safari: "11.1",
            },
            useBuiltIns: "usage",
            corejs: "3.9.0",
        },
    ],
    "@babel/react",
    "@babel/preset-typescript"
];

module.exports = { presets };

```

### JS

#### index.tsx

```jsx harmony

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import ApplicationContainer from './containers/ApplicationContainer';

const MOUNT_NODE = document.getElementById('root');

let render = () => {
    ReactDOM.render(
        <BrowserRouter>
            <ApplicationContainer  />
        </BrowserRouter>,
        MOUNT_NODE
    );
};

if (module.hot) {
    console.log('hot active');
    module.hot.accept('./containers/ApplicationContainer.js', () =>
        setImmediate(() => {
            ReactDOM.unmountComponentAtNode(MOUNT_NODE);
            render();
        })
    );
}

render();

```

#### ApplicationContainer.tsx

```jsx harmony

import React from 'react';
import ApplicationComponent from './../components/ApplicationComponent';

function ApplicationContainer() {
    return (
        <ApplicationComponent/>
    );
}

export default ApplicationContainer;

```

#### ApplicationComponent.tsx

```jsx harmony

import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';

import DashboardContainer from './../routes/dashboard/containers/DashboardContainer';
import getComponent from './../routes/settings/containers/SettingsContainer';

let comp = null;

function ApplicationComponent(props) {
    const [compExist, setCompExist] = useState(false)

    if (!compExist) {
        getComponent().then(component => {
            console.log('loaded');
            comp = component;
            setCompExist(true);
        });
    }

    return (
        <Switch>
            <Route exact path='/'>
                <DashboardContainer />
            </Route>

            <Route path='/settings'>
                {compExist && comp}
            </Route>

            <Route path='/sign'>
                Sign...
            </Route>
        </Switch>
    );
}

export default ApplicationComponent;

```

#### SettingsContainer.tsx

```jsx harmony

import React from 'react';

function getComponent() {
    return import('./../components/SettingsComponent')
        .then(({ default: SettingsComponent }) => {
            function SettingsContainer() {
                return <SettingsComponent/>;
            }

            return SettingsContainer;
        }).catch((error) => `Error loading module: ${error.message}`)
}

export default getComponent;

```

### HTML

```html

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Test build</title>
</head>
<body>
 <div id='root' style='height: 100%'></div>
</body>
</html>

```

## Result

TypeScript files will be transpiled.
