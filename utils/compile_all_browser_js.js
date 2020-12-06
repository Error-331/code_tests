'use strict';

// library imports
const path = require('path');
const {readdirSync, statSync} = require('fs');
const {execSync} = require('child_process');

// functions definitions starts here
const findMainJSFilesRecursively = (basePath) => {
    let jsFilesPaths = [];
    const directoryContents = readdirSync(basePath);

    directoryContents.forEach((pageDir) => {
        let currentDirPath = basePath + path.sep + pageDir;
        let currentDirStat = statSync(currentDirPath);

        if (currentDirStat.isDirectory()) {
            const foundJSFiles = findMainJSFilesRecursively(currentDirPath);
            jsFilesPaths = jsFilesPaths.concat(foundJSFiles);
        } else if(path.basename(currentDirPath) === 'index.js') {
            jsFilesPaths.push(currentDirPath);
        }
    });

    return jsFilesPaths;
};

// found all JS files
const pathToBrowserJSDir = path.resolve(__dirname, `./../src/browser_js/games/`);
const foundJSFilesPaths = findMainJSFilesRecursively(pathToBrowserJSDir);

// compile every JS file
foundJSFilesPaths.forEach(jsFile => console.log(execSync(`node ./utils/compile_browser_js.js --path=${jsFile}`).toString()));
