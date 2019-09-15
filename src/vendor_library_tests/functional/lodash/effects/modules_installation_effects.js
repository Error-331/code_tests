'use strict';

// external imports

// local imports
const {getReportQueryWrappers} = require('./../helpers/db_helpers');

const {getDBType} = require('./app_effects');

// effects implementation
const installPackagesForRootModules = (dbConnection) => {
    const dbType = getDBType();

    getReportQueryWrappers(dbType)
        .selectModulesFullDataByParentLocationId(dbConnection)
        .then((rootModules) => {

            console.log(rootModules);

        });
};

// export
exports.installPackagesForRootModules = installPackagesForRootModules;