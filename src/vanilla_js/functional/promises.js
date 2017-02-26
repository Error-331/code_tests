'use strict';

import _ from 'lodash';

export default async () => {
    const unit = (promise) => {
        return Promise.resolve(promise);
    };

    const bind = (promise, next) => {
        return promise.then(next);
    };

    // cleaner version - _.curry(_.partial(_.reduce,_, bind),2)
    const pipe = _.curry((functionList, promise) => {
        return _.reduce(functionList, bind, promise);
    });

    const composeAsync = function() {
        return pipe.call(this,_.flattenDeep(arguments));
    };

    const wait = (time) => {
        return new Promise((resolve) => {
            setTimeout(resolve,time);
        });
    };

    const delay = _.curry((time,value) => {
        return wait(time).then(_.constant(value));
    });

    const log = message => !console.log(message) && message;

    const addOne = (num) => {
        return num + 1;
    };

    console.log('Functional programming promises');
    console.log('===============================');
    console.log('');

    let addThreeButVeryVerySlowly = composeAsync(
        addOne,
        delay(1000),
        log,
        addOne,
        delay(1000),
        log,
        addOne,
        delay(1000),
        log
    );

    console.log('addThreeButVeryVerySlowly() output:');
    await addThreeButVeryVerySlowly(unit(0)); // await here is just to make sure calls to console() after call to addThreeButVeryVerySlowly() are in appropriate order

    console.log('');
    console.log('--------------------------------------------------------');
    console.log('');
};