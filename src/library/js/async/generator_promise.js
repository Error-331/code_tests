'use strict';

// https://medium.com/javascript-scene/the-hidden-power-of-es6-generators-observable-async-flow-control-cfa4c7f31435
// DO NOT USE IT IN PRODUCTION !!!

export const isPromise = (obj) => {
    return typeof obj !== 'undefined' && typeof obj.then === 'function'
};

export const next = (iterable, callback, prevVal = undefined) => {
    const item = iterable.next(prevVal);
    const currentValue = item.value;

    if (item.done) {
        return callback(prevVal);
    }

    if (isPromise(currentValue)) {
        currentValue.then(value => {
            setImmediate(() => next(iterable, callback, value));
        });
    } else {
        setImmediate(() => next(iterable, callback, currentValue));
    }
};

export const generateSync = (generatorFunction) =>
    (...args) => new Promise(resolve => {
        next(generatorFunction(...args), value => resolve(value));
    });