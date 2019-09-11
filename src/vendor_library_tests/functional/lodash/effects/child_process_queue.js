'use strict';

// external imports
const {fork} = require('child_process');

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

const {
    LOG_CHILD_PROCESS_TYPE,

    LOG_UTILITY_MESSAGE_TYPE,
} = require('./../constants/log_constants');

const {logMessage} = require('./../effects/log_effects');

// module private variables declaration
let lastChildProcessIndex = 0;

const childProcessesMap = new Map();
const childProcessPromiseMap = new Map();

// effects implementation
const handleChildProcessMessage = curry((processName, taskProcessingContext, concludeCallback, handleErrorCallback, message) => {
    pipe(
        message => {
            logMessage(LOG_UTILITY_MESSAGE_TYPE, LOG_CHILD_PROCESS_TYPE, processName, `Incoming message (name: '${message.name}', type: '${message.type}')`);
            return message;
        },

        cond([
            [({type}) => equals(CHILD_READY_FOR_MODULE_TRAVERSING_MESSAGE_TYPE, type), () => n.send({type: MASTER_START_MODULE_TRAVERSE_COMMAND_MESSAGE_TYPE})],
            [({type}) => equals(CHILD_FINISH_WITH_MODULE_TRAVERSING_MESSAGE_TYPE, type), concludeCallback],
            [({type}) => equals(CHILD_DELEGATE_TASK_MESSAGE_TYPE, type), ({taskType, data}) => {
                const taskPromise = taskProcessingContext(taskType, data);

                taskPromise.then((taskResult) => {
                    n.send({name, type: MASTER_DATA_MESSAGE_TYPE, data: taskResult})
                })
            }],
        ])
    )
});

const spawnModulesTraversingProcess = (taskProcessingContext) => {
    const childProcessPromise =  new Promise((resolve, reject) => {
        lastChildProcessIndex += 1;

        const processName = `child_${lastChildProcessIndex}`;
        const childProcessLink = fork(`${__dirname}/../child_proc_test.js`); // TODO: join of something

        childProcessesMap.set(processName, childProcessLink);
        childProcessPromiseMap.set(processName, childProcessPromise);

        childProcessLink.on('message', handleChildProcessMessage(processName, taskProcessingContext, resolve, reject));
    });
};

const initModulesTraversingProcessQueue = (taskProcessingContext, pathsToModules) => {
    spawnModulesTraversingProcess(taskProcessingContext);
};


// export