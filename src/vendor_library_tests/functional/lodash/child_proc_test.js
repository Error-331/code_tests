'use strict';

// external imports
const {bind, curry} = require('lodash/fp');

// local imports
const {generateSync} = require('./helpers/promise_sync_helpers');
const {getDBEffects} = require('./helpers/db_helpers');

const {getDBType, setChildProcessDBType} = require('./effects/app_effects');
const {extractAndSaveModuleData} = require('./effects/modules_tree_effects');

const {masterProcessCommunicator} = require('./effects/child_process_db_effects');

// module implementation
setChildProcessDBType();

const b = generateSync(function* () {
    process.on('message', bind(masterProcessCommunicator.handleParentMessage, masterProcessCommunicator));

    console.log('Open DB connection...');

    const dbType = getDBType();
    const dbConnection = yield getDBEffects(dbType).openConnectionToDB();

    yield getDBEffects(dbType).prepareDatabase(dbConnection);

    masterProcessCommunicator.setSendReadyTraverseModulesMessage(function() {
        extractAndSaveModuleData(dbConnection, dbType, this.pathToModules).then(() => {
            this.sendFinishTraverseModulesMessage();
            process.exit();
        });
    });



    //console.log('Closing DB connection...');
  //  yield getDBEffects(dbType).closeConnectionToDB(dbConnection);
});

b();

