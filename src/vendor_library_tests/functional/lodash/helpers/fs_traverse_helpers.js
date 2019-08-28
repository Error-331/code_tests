'use strict';

// external imports
const {readdirSync} = require('fs');
const {isNil, stubTrue, constant, cond, curry, concat, filter, map, forEach, reduce} = require('lodash/fp');

// local imports
const {
    isEntityNotExists,
    isEntityNotReadable,
    isNotDirectory,
    isNPMOrganizationDir,
    isNoneNPMOrganizationDir
} = require('./validation_helpers');

const {joinTwoPaths} = require('./path_helpers');
const {generateSync} = require('./promise_sync_helpers');

// helpers implementation
const traverseDirectory = curry((mapCallback, rootDirPath) => {
    return map(
        mapCallback,
        readdirSync(rootDirPath),
    );
});

const traverseNodeModulesDirectory = curry((mapCallback, rootDirPath) => {
    const fsEntities = readdirSync(rootDirPath);

    const organizationDirs = filter(isNPMOrganizationDir, fsEntities);
    const noneOrganizationDirs = filter(isNoneNPMOrganizationDir, fsEntities);

    let combinedDirList = reduce((dirsList, dirName) => {
        return concat(dirsList, traverseDirectory(c => `${dirName}/${c}`, joinTwoPaths(rootDirPath, dirName)))
    }, noneOrganizationDirs, organizationDirs);

    return generateSync(function* (combinedDirList) {
        const packagesList = [];

        for (let dirIndex = 0; dirIndex < combinedDirList.length; dirIndex++) {
            packagesList.push(yield mapCallback(combinedDirList[dirIndex]));
        }

        yield packagesList;
    })(combinedDirList);
});

const traverseDirectoryRecursive = curry((userCallback, traverseCallback, pathTransformFunc, dirPath) => {
    // transform provided directory path using provided `pathTransformFunc` (example: add 'node_modules' at the end)
    const preparedDirPath = pathTransformFunc(dirPath);

    // prepare current function for recursive call
    const recursiveCallback = traverseDirectoryRecursive(userCallback, traverseCallback, pathTransformFunc);

    const mapCallback = generateSync(function* (dirName) {
        const installedDepsPromise = recursiveCallback(joinTwoPaths(preparedDirPath, dirName));
        let installedDeps = null;

        if (!isNil(installedDepsPromise)) {
            installedDeps = yield installedDepsPromise;
        }
        yield userCallback(dirPath, preparedDirPath, dirName, installedDeps);
    });






   /* if (isEntityExists(transformedPath)) {



        if (!visitedAbsolutePaths.has(transformedPath)) {
            visitedAbsolutePaths.add(transformedPath);
        } else {
            console.log('gggg', transformedPath);
        }

        const relPath = realpathSync(transformedPath);

        if (!visitedAbsoulteRealPaths.has(relPath)) {
            visitedAbsoulteRealPaths.add(relPath);
        } else {
            console.log('cccc', relPath);
            return null;
        }
    }*/

    return cond([
        [isEntityNotExists, constant(null)],
        [isEntityNotReadable, constant(null)],
        [isNotDirectory, constant(null)],
        [stubTrue, () => traverseCallback(mapCallback, preparedDirPath)]
    ])(preparedDirPath);
});

// export
exports.traverseDirectory = traverseDirectory;
exports.traverseNodeModulesDirectory = traverseNodeModulesDirectory;
exports.traverseDirectoryRecursive = traverseDirectoryRecursive;