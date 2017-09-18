'use strict';

// https://medium.com/javascript-scene/the-hidden-power-of-es6-generators-observable-async-flow-control-cfa4c7f31435
// DO NOT USE IT IN PRODUCTION !!!

export const isPromise = (obj) => {
    return typeof obj !== 'undefined' && typeof obj.then === 'function'
};

export const next = (iterable, resolveCallback, rejectCallback, prevVal = undefined) => {
    let item;

    try {
        item = iterable.next(prevVal);
    } catch(error) {
        return rejectCallback(error)
    }

    const currentValue = item.value;

    if (item.done) {
        return resolveCallback(prevVal);
    }

    if (isPromise(currentValue)) {
        currentValue.then(value => {
            next(iterable, resolveCallback, rejectCallback, value);
        }).catch(error => rejectCallback(error));
    } else {
        next(iterable, resolveCallback, rejectCallback, currentValue);
    }
};

export const generateSync = (generatorFunction) =>
    (...args) => new Promise((resolve, reject) => {
        next(generatorFunction(...args), value => resolve(value), reject);
    });