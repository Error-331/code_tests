'use strict';

// external imports
const {fork} = require('child_process');
const {equals, cond, curry, over, min, size} = require('lodash/fp');

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

    MAX_CHILD_PROCESSES,
} = require('./../constants/child_process_constants');

const {logUtilityMessage} = require('./../effects/log_effects');

const {joinTwoPaths} = require('./../helpers/path_helpers');

// private variables declaration
let lastChildProcessIndex = null;

const childProcessesMap = new Map();
const childProcessPromiseMap = new Map();

let pathsToModules = null;
let queuePromise = null;
let queueResolveCallback = null;

// effects implementation
const getProcessLinkByName = processName => childProcessesMap.get(processName);

const handleChildProcessMessage = curry((processName, taskProcessingContext, concludeCallback, handleErrorCallback, message) => {
    over([
        ({name, type}) => logUtilityMessage(`Incoming message (name: '${name}', type: '${type}')`),
        cond([
            [({type}) => equals(CHILD_READY_FOR_MODULE_TRAVERSING_MESSAGE_TYPE, type), () => getProcessLinkByName(processName).send({type: MASTER_START_MODULE_TRAVERSE_COMMAND_MESSAGE_TYPE})],
            [({type}) => equals(CHILD_FINISH_WITH_MODULE_TRAVERSING_MESSAGE_TYPE, type), () => concludeCallback(processName)],
            [({type}) => equals(CHILD_DELEGATE_TASK_MESSAGE_TYPE, type), ({name, taskType, data}) => {
                taskProcessingContext(taskType, data).then((taskResult) => {
                    getProcessLinkByName(processName).send({name, type: MASTER_DATA_MESSAGE_TYPE, data: taskResult})
                })
            }],
        ])
    ])(message);
});

const spawnModulesTraversingProcess = (taskProcessingContext, pathToTraverse) => {
    let childProcessPromise;

    childProcessPromise = new Promise((resolve, reject) => {
        lastChildProcessIndex += 1;

        const processName = `child_${lastChildProcessIndex}`;
        const pathToProcessFile = joinTwoPaths(__dirname, './../child_proc_test.js');
        const childProcessLink = fork(pathToProcessFile );

        childProcessesMap.set(processName, childProcessLink);
        childProcessPromiseMap.set(processName, childProcessPromise);

        childProcessLink.on('message', handleChildProcessMessage(processName, taskProcessingContext, resolve, reject));

        childProcessLink.send({type: MASTER_SET_NAME_COMMAND_MESSAGE_TYPE, data: processName});
        childProcessLink.send({type: MASTER_SET_PATH_TO_MODULES_COMMAND_MESSAGE_TYPE, data: pathToTraverse});
    }).then((processName) => {
        spawnModulesTraversingProcesses(taskProcessingContext);
        childProcessPromiseMap.delete(processName);

        if (childProcessPromiseMap.size === 0) {
            queueResolveCallback();
        }
    })
};

const spawnModulesTraversingProcesses = (taskProcessingContext) => {
    const processesCount = min([MAX_CHILD_PROCESSES, size(pathsToModules)]);

    for (let processCount = 0; processCount  < processesCount; processCount ++) {
        const pathToTraverse = pathsToModules.shift();
        spawnModulesTraversingProcess(taskProcessingContext, pathToTraverse)
    }
};

const initModulesTraversingProcessQueue = (taskProcessingContext, usrPathsToModules) => {
    lastChildProcessIndex = 0;

    childProcessesMap.clear();
    childProcessPromiseMap.clear();

    pathsToModules = null;
    queuePromise = null;
    queueResolveCallback = null;

    queuePromise = new Promise((resolve, reject) => {
        queueResolveCallback = resolve;

        pathsToModules = usrPathsToModules;
        spawnModulesTraversingProcesses(taskProcessingContext);
    });

    return queuePromise;
};

// export
exports.getProcessLinkByName = getProcessLinkByName;
exports.handleChildProcessMessage = handleChildProcessMessage;
exports.spawnModulesTraversingProcess = spawnModulesTraversingProcess;
exports.spawnModulesTraversingProcesses = spawnModulesTraversingProcesses;
exports.initModulesTraversingProcessQueue = initModulesTraversingProcessQueue;