'use strict';

// library imports
const path = require('path');

const webpack = require('webpack');
const minimist = require('minimist');
const {isNil, clone} = require('ramda');

// local imports
const {webpackConfig} = require('./../webpack_configs/webpack.simple.config');

// extract command line arguments
const cmdArgs = minimist(process.argv.slice(2));
const jsFilePath = cmdArgs.path;

// compile js files
const webpackConfigCopy = clone(webpackConfig);

webpackConfigCopy.entry.push(jsFilePath);
webpackConfigCopy.output.path = path.dirname(jsFilePath);

webpack([webpackConfigCopy], (error, stats) => {
    if (!isNil(error)) {
        console.error(error);
    }

    process.stdout.write(stats.toString() + "\n");
});