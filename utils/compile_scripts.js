'use strict';

// library imports
const path = require('path');
const minimist = require('minimist');
const webpack = require('webpack');
const {isUndefined, cloneDeep, chain} = require('lodash');

// local imports
const {webpackConfig} = require('./../webpack_configs/webpack.scripts.config');

// function definitions starts here
const compileCodeWithWebpack = (webpackConfig) => {
    webpack([webpackConfig], (error, stats) => {
        if (!isUndefined(error)) {
            console.error(error);
        }

        process.stdout.write(stats.toString() + "\n");
    });
};

// extract command line arguments
const cmdArgs = minimist(process.argv.slice(2));
const typeParam = cmdArgs.type.toLocaleLowerCase();

// copy webpack config
const webpackConfigCopy = cloneDeep(webpackConfig);

// declare global constants
const rootDirPath = path.resolve(__dirname, './..');
const srcDirPath = `${rootDirPath}/src`;

// prepare webpack config
switch(typeParam) {
    case 'vanilla': {
        const modulesResolvePath = `${rootDirPath}/src/vanilla_js`;
        const entryPath = `${srcDirPath}/vanilla_js/index.js`;
        const distPath = `${rootDirPath}/dist`;

        webpackConfigCopy.resolve.modules.push(modulesResolvePath);
        webpackConfigCopy.entry.push(entryPath);
        webpackConfigCopy.output.path = distPath;
        webpackConfigCopy.output.filename = 'bundle.js';

        break;
    }

    case 'type_script': {
        const modulesResolvePath = `${rootDirPath}/src/type_script`;
        const entryPath = `${srcDirPath}/type_script/index.ts`;
        const distPath = `${rootDirPath}/dist`;

        webpackConfigCopy.resolve.extensions = [".webpack.js", ".web.js", ".ts", ".tsx", ".js"];
        webpackConfigCopy.resolve.modules.push(modulesResolvePath);
        webpackConfigCopy.entry.push(entryPath);
        webpackConfigCopy.output.path = distPath;
        webpackConfigCopy.output.filename = 'typescript_bundle.js';

        webpackConfigCopy.module.rules.push({
            test: /\.tsx?$/,
            include: [srcDirPath],
            exclude: /(node_modules|bower_components)/,
            loaders: ['babel-loader', 'ts-loader']
        });

        break;
    }

    case 'tools': {
        const modulesResolvePath = `${rootDirPath}/src/tools`;
        const entryPath = `${srcDirPath}/tools/index.js`;
        const distPath = `${rootDirPath}/dist`;

        webpackConfigCopy.resolve.modules.push(modulesResolvePath);
        webpackConfigCopy.entry.push(entryPath);
        webpackConfigCopy.output.path = distPath;
        webpackConfigCopy.output.filename = 'tools_bundle.js';

        break;
    }

    case 'playground': {
        const modulesResolvePath = `${rootDirPath}/src/playground`;
        const entryPath = `${srcDirPath}/playground/index.js`;
        const distPath = `${rootDirPath}/dist`;

        webpackConfigCopy.resolve.modules.push(modulesResolvePath);
        webpackConfigCopy.entry.push(entryPath);
        webpackConfigCopy.output.path = distPath;
        webpackConfigCopy.output.filename = 'playground_bundle.js';

        webpackConfigCopy.module.rules = chain(webpackConfigCopy.module.rules).filter(webpackRule => webpackRule.test.test('test.js')).map(webpackRule => {
            webpackRule.include = [modulesResolvePath];
            return webpackRule;
        }).value();

        webpackConfigCopy.module.rules.push({
            test: /\.json$/,
            loader: 'json-loader'
        });

        break;
    }

    case 'vendor_library_tests': {
        const modulesResolvePath = `${rootDirPath}/src/vendor_library_tests`;
        const entryPath = `${srcDirPath}/vendor_library_tests/index.js`;
        const distPath = `${rootDirPath}/dist`;

        webpackConfigCopy.resolve.modules.push(modulesResolvePath);
        webpackConfigCopy.entry.push(entryPath);
        webpackConfigCopy.output.path = distPath;
        webpackConfigCopy.output.filename = 'vendor_library_tests_bundle.js';

        webpackConfigCopy.module.rules = chain(webpackConfigCopy.module.rules).filter(webpackRule => webpackRule.test.test('test.js')).map(webpackRule => {
            webpackRule.include = [srcDirPath];
            return webpackRule;
        }).value();

        webpackConfigCopy.module.rules.push({
            test: /\.json$/,
            loader: 'json-loader'
        });

        break;
    }

    default: {
        return;
    }
}

compileCodeWithWebpack(webpackConfigCopy);

