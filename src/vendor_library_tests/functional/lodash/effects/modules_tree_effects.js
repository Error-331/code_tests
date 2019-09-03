'use strict';

// external imports
const {isNil, curry} = require('lodash/fp');
const chalk = require('chalk');

// local imports
const {DIRECTORIES_TO_EXCLUDE} = require('./../constants/exclusion_constants');

const {isExclusion} = require('./../helpers/validation_helpers');
const {joinTwoPaths} = require('./../helpers/path_helpers');
const {generateSync} = require('./../helpers/promise_sync_helpers');

const {insertModuleData, insertDependencyListToDB} = require('./../effects/db_effects');
const {readPackageJSON} = require('./../effects/fs_effects');

// helpers implementation
const handleModuleData = curry((dbConnection, originalPath, pathToParentNodeModules, packageDirName, installedChildNodeModules) => {
    return generateSync(function* () {
        // compose full path to module
        const pathToModule = joinTwoPaths(pathToParentNodeModules, packageDirName);

        console.log(chalk.green(`Processing package in '${pathToModule}'`));

        // apply filter to directory name
        if (isExclusion(DIRECTORIES_TO_EXCLUDE, packageDirName)) {
            return;
        }

        // read package.json
        const currentPackageJSON = readPackageJSON(pathToModule);

        // extract name and version of the current module
        const {name, version} = currentPackageJSON;

        // insert current module data to DB
        const currentModuleLocationID = yield insertModuleData(dbConnection, name, version, pathToModule, null);

        if (isNil(currentModuleLocationID)) {
            yield null;
            return;
        }

        // extract module dependencies lists
        let {dependencies, devDependencies, peerDependencies} = currentPackageJSON;

        // insert dependencies data from package.json into DB
        yield insertDependencyListToDB(dbConnection, dependencies, pathToModule, currentModuleLocationID, 'dependency');
        yield insertDependencyListToDB(dbConnection, devDependencies, pathToModule, currentModuleLocationID, 'devDependencies');
        yield insertDependencyListToDB(dbConnection, peerDependencies, pathToModule, currentModuleLocationID, 'peerDependencies');

        yield packageDirName;
    })();
});

// export
exports.handleModuleData = handleModuleData;