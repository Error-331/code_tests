'use strict';

const { isNil } = require('./logic_utils');

const lens = (getter, setter) => {
    return ({
        get: obj => getter(obj),
        set: (val, obj) => setter(val, obj)
    })
};

const view = (lens, obj) => {
    return lens.get(obj)
};

const set = (lens, val, obj) => {
    return lens.set(val, obj)
};

const curry = (func) => {
    const curried = (...args) => {
        if (args.length >= func.length) {
            return func(...args);
        } else {
            return (...args2) => {
                return curried(...args.concat(args2));
            }
        }
    }

    return curried;
}

const oneTimeMemoizer = (functionToMemoize) => {
    let cache = null;

    const functionWrapper = (...args) => {
        if (isNil(cache)) {
            return cache;
        } else {
            cache = functionToMemoize(...args);
            return cache;
        }

    };

    return functionWrapper;
};

module.exports.lens = lens;
module.exports.view = view;
module.exports.set = set;

module.exports.curry = curry;
module.exports.oneTimeMemoizer = oneTimeMemoizer;