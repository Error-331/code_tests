'use strict';

const { ASYNC_FUNC_EXEC_NUMBER_OF_ATTEMPTS, ASYNC_FUNC_EXEC_TIMEOUT } = require('./../../constants/async_constants');

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
        signal,
        checkFunc = () => Promise.resolve(false),
    } = options;

    if (signal.aborted) {
        return Promise.reject();
    }

    return func(signal, ...params)
        .then((data) => {
            if (signal.aborted) {
                return Promise.reject();
            }

            return checkFunc(data)
                .then((checkData) => {
                    if (checkData === true) {
                        if (signal.aborted) {
                            return Promise.reject();
                        }

                        return executeAsyncFuncInIntervalNext(func, options);
                    } else {
                        return data;
                    }
                })
        });
}

function executeAsyncFuncInInterval(func, options = {}) {
    return new Promise((resolve, reject) => {
        const {
            timeout = ASYNC_FUNC_EXEC_TIMEOUT,
        } = options;

        const newOptions = { ...options, signal: AbortSignal.timeout(timeout) };

        executeAsyncFuncInIntervalNext(func, newOptions)
            .then(resolve)
            .catch(reject)
    });
}

module.exports.attemptAsyncFunc = attemptAsyncFunc;
module.exports.executeAsyncFuncInInterval = executeAsyncFuncInInterval;
