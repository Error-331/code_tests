'use strict';

// external imports
const {readdirSync} = require('fs');
const {isNil, stubTrue, stubFalse, cond, curry, concat, filter, reduce} = require('lodash/fp');
const jsonfile = require('jsonfile');

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

const {logFSMessage} = require('./../effects/log_effects');

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

const traverseDirectoryRecursive = curry((userCallback, traverseCallback, filterFunc, pathTransformFunc, dirPath, depth = 0) => {
    // transform provided directory path using provided `pathTransformFunc` (example: add 'node_modules' at the end)
    const preparedDirPath = pathTransformFunc(dirPath);

    // prepare current function for recursive call
    const recursiveCallback = traverseDirectoryRecursive(userCallback, traverseCallback, filterFunc, pathTransformFunc);

    const mapCallback = generateSync(function* (dirName) {
        yield userCallback(dirPath, preparedDirPath, dirName, depth);
        yield recursiveCallback(joinTwoPaths(preparedDirPath, dirName), depth++);
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
        logFSMessage(`Traversing: '${preparedDirPath}'`);

        yield traverseCallback(mapCallback, preparedDirPath);
    })(mapCallback, traverseCallback, preparedDirPath);
});

const writJSONToFile = curry((pathToFile, jsonContents) => {
    return new Promise((resolve, reject) => {
        jsonfile.writeFile(pathToFile, jsonContents, {spaces: 2}, error => isNil(error) ? resolve() : reject(error));
    });
});

// export
exports.readPackageJSON = readPackageJSON;
exports.traverseNodeModulesDirectory = traverseNodeModulesDirectory;
exports.traverseDirectoryRecursive = traverseDirectoryRecursive;
exports.writJSONToFile = writJSONToFile;
