'use strict';

// external imports
const chalk = require('chalk');
const {equals, cond, bind, curry} = require('lodash/fp');

// local imports
const {
    MASTER_SET_NAME_COMMAND_MESSAGE_TYPE,
    MASTER_SET_PATH_TO_MODULES_COMMAND_MESSAGE_TYPE,
    MASTER_DATA_MESSAGE_TYPE,
} = require('./../constants/master_process_constants');

// effects implementation
const masterProcessCommunicator = {
    name: null,
    pathToModules: null,
    pendingTasksMap: new Map(),

    handleSetNameMessage: function(usrName) {
        this.name = usrName;
    },

    handleSetPathMessage: function(usrPath) {
        this.pathToModules = usrPath;
    },

    handleDataMessage: function(name, data) {
        const taskData = this.pendingTasksMap.get(name);

        this.pendingTasksMap.delete(name);
        taskData.resolve(data);
    },

    handleParentMessage: function(message) {
        const {name, type, data} = message;

        console.log(
            chalk.bgWhite(chalk.gray(` CHILD `)),
            chalk.white(`Incoming message (name: '${name}', type: '${type}')`)
        );

        cond([
            [equals(MASTER_SET_NAME_COMMAND_MESSAGE_TYPE), () => this.handleSetNameMessage(data)],
            [equals(MASTER_SET_PATH_TO_MODULES_COMMAND_MESSAGE_TYPE), () => this.handleSetPathMessage(data)],
            [equals(MASTER_DATA_MESSAGE_TYPE), () => this.handleDataMessage(name, data)],
        ])(type);
    },

    delegateTaskToMaster: function(type, data) {
        const currentTimeStamp = new Date().getTime();
        const pendingTaskName = `${type}_${this.name}_${currentTimeStamp}`;

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
