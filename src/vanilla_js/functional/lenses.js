'use strict';

import _ from 'lodash';

export default async () => {
    let testObject1 = {
        name: "Max",
        age: 26,
        comments: [
            {title: 'Comment 1', body: 'Comment 1 body'},
            {title: 'Comment 2', body: 'Comment 2 body'},
            {title: 'Comment 3', body: 'Comment 3 body'},
        ]
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

    const lensOver = _.curry((keyPath, fn, usrObject) => {
        let newObject = usrObject;

        if(_.has(newObject, keyPath)){
            newObject = _.cloneDeep(usrObject);
            _.set(newObject, keyPath, fn( _.get(newObject, keyPath) ));
        }

        return newObject;
    });

    const addOne = (num) => {
        return num + 1;
    };

    const mockAPICall = () => {
        return new Promise((resolve, reject) => {
            resolve(testObject1);
        });
    };

    console.log('Functional programming lenses');
    console.log('=============================');
    console.log('');

    let ageSomebodyByTwoYears = composeAsync(
        lensOver('age', addOne),
        lensOver('age', addOne),
    );

    let modifiedTestObject1Copy = await ageSomebodyByTwoYears(mockAPICall());

    console.log('After age was increesed two times: ', modifiedTestObject1Copy.age);

    console.log('');
    console.log('--------------------------------------------------------');
    console.log('');
}