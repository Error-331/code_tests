'use strict';

// external imports
const {bind, curry} = require('lodash/fp');

// local imports
const {generateSync} = require('./../helpers/promise_sync_helpers');
const {getDBEffects} = require('./../helpers/db_helpers');

const {setChildProcessType} = require('./../effects/process_meta_effects');
const {getDBType, setChildProcessDBType} = require('./../effects/app_effects');
const {extractAndSaveModuleData} = require('./../effects/modules_tree_effects');

const {masterProcessCommunicator} = require('./../effects/child_process_db_effects');

// module implementation
setChildProcessType();
setChildProcessDBType();

const childModulesTraverseProcess = generateSync(function* () {
    process.on('message', bind(masterProcessCommunicator.handleParentMessage, masterProcessCommunicator));

    const dbType = getDBType();
    const dbConnection = yield getDBEffects(dbType).openConnectionToDB();

    yield getDBEffects(dbType).prepareDatabase(dbConnection);

    masterProcessCommunicator.setSendReadyTraverseModulesMessage(function() {
        extractAndSaveModuleData(dbConnection, dbType, this.pathToModules).then(() => {
            this.sendFinishTraverseModulesMessage();
            process.exit();
        });
    });


});

childModulesTraverseProcess();

