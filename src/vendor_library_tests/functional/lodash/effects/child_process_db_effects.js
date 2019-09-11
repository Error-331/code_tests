'use strict';

// external imports
const chalk = require('chalk');
const {isNil, equals, cond, once, bind} = require('lodash/fp');

// local imports
const {
    MASTER_SET_NAME_COMMAND_MESSAGE_TYPE,
    MASTER_SET_PATH_TO_MODULES_COMMAND_MESSAGE_TYPE,
    MASTER_START_MODULE_TRAVERSE_COMMAND_MESSAGE_TYPE,
    MASTER_DATA_MESSAGE_TYPE,
} = require('./../constants/master_process_constants');

const {
    CHILD_READY_FOR_MODULE_TRAVERSING_MESSAGE_TYPE,
    CHILD_FINISH_WITH_MODULE_TRAVERSING_MESSAGE_TYPE,
    CHILD_DELEGATE_TASK_MESSAGE_TYPE,
} = require('./../constants/child_process_constants');

// effects implementation
const masterProcessCommunicator = {
    name: null,
    pathToModules: null,
    pendingTasksMap: new Map(),

    startModuleTraverseUserHandler: null,

    sendFinishTraverseModulesMessage: once(function() {
        process.send({
            name: this.name,
            type: CHILD_FINISH_WITH_MODULE_TRAVERSING_MESSAGE_TYPE,
        });
    }),

    sendReadyTraverseModulesMessage: once(function () {
        process.send({
            name: this.name,
            type: CHILD_READY_FOR_MODULE_TRAVERSING_MESSAGE_TYPE,
        });
    }),

    handleDataMessage: function({name, data}) {
        const taskData = this.pendingTasksMap.get(name);

        this.pendingTasksMap.delete(name);
        taskData.resolve(data);
    },

    handlePostParentMessage: function() {
        if (!isNil(this.name) && !isNil(this.pathToModules)) {
            this.sendReadyTraverseModulesMessage();
        }
    },

    handleParentMessage: function(message) {
        const {name, type} = message;

        console.log(
            chalk.bgWhite(chalk.gray(` CHILD `)),
            chalk.white(`Incoming message (name: '${name}', type: '${type}')`)
        );

        cond([
            [({type}) => equals(MASTER_SET_NAME_COMMAND_MESSAGE_TYPE, type), ({data}) => this.name = data],
            [({type}) => equals(MASTER_SET_PATH_TO_MODULES_COMMAND_MESSAGE_TYPE, type), ({data}) => this.pathToModules = data],
            [({type}) => equals(MASTER_START_MODULE_TRAVERSE_COMMAND_MESSAGE_TYPE, type), bind(this.startModuleTraverseUserHandler, this)],
            [({type}) => equals(MASTER_DATA_MESSAGE_TYPE, type), bind(this.handleDataMessage, this)],
        ])(message);

        this.handlePostParentMessage(message);
    },

    delegateTaskToMaster: function(taskType, data) {
        const currentTimeStamp = new Date().getTime();
        const pendingTaskName = `${taskType}_${this.name}_${currentTimeStamp}`;

        return new Promise((resolve, reject) => {
           this.pendingTasksMap.set(pendingTaskName, {
                resolve,
                reject,
            });

            process.send({
                name: pendingTaskName,
                type: CHILD_DELEGATE_TASK_MESSAGE_TYPE,
                taskType,
                data,
            });
        });
    },

    setSendReadyTraverseModulesMessage: function(userHandler) {
        this.startModuleTraverseUserHandler = userHandler;
    }
};

const openConnectionToDB = () => masterProcessCommunicator;
const closeConnectionToDB = () => null;
const prepareDatabase = () => null;
const exportToJSON = () => null;

// export
exports.masterProcessCommunicator = masterProcessCommunicator;

exports.openConnectionToDB = openConnectionToDB;
exports.closeConnectionToDB = closeConnectionToDB;

exports.prepareDatabase = prepareDatabase;
exports.exportToJSON = exportToJSON;
