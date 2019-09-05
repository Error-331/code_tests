'use strict';

// external imports
const chalk = require('chalk');
const {bind} = require('lodash/fp');

// local imports

// effects implementation
const masterProcessCommunicator = {
    pendingTasksMap: new Map(),

    handleParentMessage: function(message) {
        const {name, data} = message;

        console.log('pop', message, this.pendingTasksMap);

        this.pendingTasksMap.get(name).resolve(data);
    },

    delegateTaskToMaster: function(type, data) {
        const currentTimeStamp = new Date().getTime();
        const pendingTaskName = `${type}_${currentTimeStamp}`;

        return new Promise((resolve, reject) => {
           this.pendingTasksMap.set(pendingTaskName, {
                resolve,
                reject,
            });

            process.send({
                name: pendingTaskName,
                type,
                data,
            });
        });
    }
};

process.on('message', bind(masterProcessCommunicator.handleParentMessage, masterProcessCommunicator));

const openConnectionToDB = () => masterProcessCommunicator;
const closeConnectionToDB = () => null;
const prepareDatabase = () => null;
const exportToJSON = () => null;

// export
exports.openConnectionToDB = openConnectionToDB;
exports.closeConnectionToDB = closeConnectionToDB;

exports.prepareDatabase = prepareDatabase;
exports.exportToJSON = exportToJSON;
