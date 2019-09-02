'use strict';

// external imports
const {readdirSync} = require('fs');
const {isNil, stubTrue, stubFalse, cond, curry, concat, filter, reduce} = require('lodash/fp');
const chalk = require('chalk');

// local imports
const {joinTwoPaths} = require('./../helpers/path_helpers');
const {traverseDirectory} = require('./../helpers/fs_traverse_helpers');

const {
    isEntityNotExists,
    isEntityNotReadable,
    isNotDirectory,
    isNPMOrganizationDir,
    isNoneNPMOrganizationDir,
} = require('./../helpers/validation_helpers');

const {generateSync} = require('./../helpers/promise_sync_helpers');

// effects implementation
const readPackageJSON = curry((packageJSONDir) => {
    const pathToPackageJSON = joinTwoPaths(packageJSONDir, 'package.json');
    return require(pathToPackageJSON);
});

const traverseNodeModulesDirectory = curry((mapCallback, rootDirPath) => {
    const fsEntities = readdirSync(rootDirPath);

    const organizationDirs = filter(isNPMOrganizationDir, fsEntities);
    const noneOrganizationDirs = filter(isNoneNPMOrganizationDir, fsEntities);

    let combinedDirList = reduce((dirsList, dirName) => {
        return concat(dirsList, traverseDirectory(moduleName => `${dirName}/${moduleName}`, joinTwoPaths(rootDirPath, dirName)))
    }, noneOrganizationDirs, organizationDirs);

    return generateSync(function* (combinedDirList) {
        const packagesList = [];

        for (let dirIndex = 0; dirIndex < combinedDirList.length; dirIndex++) {
            const packageName = yield mapCallback(combinedDirList[dirIndex]);

            if (!isNil(packageName))  {
                packagesList.push(packageName);
            }
        }

        yield packagesList;
    })(combinedDirList);
});

const traverseDirectoryRecursive = curry((userCallback, traverseCallback, filterFunc, pathTransformFunc, dirPath) => {
    // transform provided directory path using provided `pathTransformFunc` (example: add 'node_modules' at the end)
    const preparedDirPath = pathTransformFunc(dirPath);

    // prepare current function for recursive call
    const recursiveCallback = traverseDirectoryRecursive(userCallback, traverseCallback, filterFunc, pathTransformFunc);

    const mapCallback = generateSync(function* (dirName) {
        const installedDeps = yield recursiveCallback(joinTwoPaths(preparedDirPath, dirName));
        yield userCallback(dirPath, preparedDirPath, dirName, installedDeps);
    });

    return generateSync(function* (mapCallback, traverseCallback, preparedDirPath) {
        if (cond([
            [isEntityNotExists, stubTrue],
            [isEntityNotReadable, stubTrue],
            [isNotDirectory, stubTrue],
            [stubTrue, stubFalse]
        ])(preparedDirPath)) {
            yield null;
            return;
        }

        const isfiltered = yield filterFunc(preparedDirPath);

        if (isfiltered) {
            yield null;
            return;
        }

        // print current directory to console
        console.log(chalk.magenta(`Traversing: '${preparedDirPath}'`));

        yield traverseCallback(mapCallback, preparedDirPath);
    })(mapCallback, traverseCallback, preparedDirPath);
});

// export
exports.readPackageJSON = readPackageJSON;
exports.traverseNodeModulesDirectory = traverseNodeModulesDirectory;
exports.traverseDirectoryRecursive = traverseDirectoryRecursive;
