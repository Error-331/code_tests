'use strict';

const { ASYNC_FUNC_EXEC_NUMBER_OF_ATTEMPTS, ASYNC_FUNC_EXEC_INTERVAL } = require('./../../constants/async_constants');

function attemptAsyncFuncNext(func, attempt) {
    try {
        return func()
            .catch(error => {
                if (attempt <= 0) {
                    return Promise.reject(error);
                } else {
                    return attemptAsyncFuncNext(func, attempt - 1);
                }
            });
    } catch (error) {
        return Promise.reject(error);
    }
}

function attemptAsyncFunc(func, attempts = ASYNC_FUNC_EXEC_NUMBER_OF_ATTEMPTS) {
    if (attempts <= 0) {
        return Promise.reject(`Number of attempts cannot be less then or equal to zero (${attempts})`);
    }

    return attemptAsyncFuncNext(func, attempts - 1);
}

function executeAsyncFuncInIntervalNext(func, options) {
    const {
        params = [],
        interval = ASYNC_FUNC_EXEC_INTERVAL,
        checkFunc = () => Promise.resolve(false),
    } = options;

    return func(...params)
        .then((data) => {
            return checkFunc(data)
                .then((checkData) => {
                    if (checkData === true) {
                        return new Promise((resolve, reject) => {
                            setTimeout(() => {
                                executeAsyncFuncInIntervalNext(func, options)
                                    .then(resolve)
                                    .catch(reject);
                            }, interval);
                        });
                    } else {
                        return data;
                    }
                })
        })
}

function executeAsyncFuncInInterval(func, options = {}) {
    return executeAsyncFuncInIntervalNext(func, options);
}

module.exports.attemptAsyncFunc = attemptAsyncFunc;
module.exports.executeAsyncFuncInInterval = executeAsyncFuncInInterval;
