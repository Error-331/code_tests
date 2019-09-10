'use strict';

// external imports
const {curry} = require('lodash/fp');

// local imports
const {generateSync} = require('./helpers/promise_sync_helpers');
const {getDBEffects} = require('./helpers/db_helpers');

const {getDBType, setChildProcessDBType} = require('./effects/app_effects');
const {extractAndSaveModuleData} = require('./effects/modules_tree_effects');

// functions definition

// module implementation
const pathToRootNodeModules1 = '/home/luda/projects/fatback/bsCore';
//const pathToRootNodeModules = '/home/segei/Downloads';
//const pathToRootNodeModules = '/home/brightsign/projects/fatback/';
const pathToRootNodeModules2 = '/home/brightsign/projects/fatback/bsCore';
// const pathToRootNodeModules = '/home/brightsign/projects/fatback/node_modules/bacon/node_modules/@brightsign/ba-dialog-ui/node_modules/@brightsign/ba-context-model/node_modules/@brightsign/bs-playlist-dm/node_modules/@brightsign/bscore/';


setChildProcessDBType();

const b = generateSync(function* () {
    console.log('Open DB connection...');

    const dbType = getDBType();
    const dbConnection = yield getDBEffects(dbType).openConnectionToDB();

    yield getDBEffects(dbType).prepareDatabase(dbConnection);
    yield extractAndSaveModuleData(dbConnection, dbType, pathToRootNodeModules1);
    

    console.log('Closing DB connection...');
    yield getDBEffects(dbType).closeConnectionToDB(dbConnection);
});

b();

