'use strict';

// https://medium.com/@dtipson/functional-programming-is-for-dummies-fa130a629250#.l136ugnt4

import _ from 'lodash';

export default async () => {
    let testObject1 = {
        name: 'max',
        age: 25,
        comments: [
            {title: 'Comment 1', body: 'comment 1 body'},
            {title: 'Comment 2', body: 'comment 2 body'},
            {title: 'Comment 3', body: 'comment 3 body'},
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

    const compose = (reducingFunction1, reducingFunction2) => x => reducingFunction1(reducingFunction2(x));

    const lensOver = _.curry((keyPath, fn, usrObject) => {
        let newObject = usrObject;

        if(_.has(newObject, keyPath)){
            newObject = _.cloneDeep(usrObject);
            _.set(newObject, keyPath, fn( _.get(newObject, keyPath) ));
        }

        return newObject;
    });

    const checkIf = _.curry((keyPath, testFunc, errMsg, dataObject) => {
        errMsg = errMsg || 'error';

        let testValue = _.get(dataObject, keyPath);

        return testFunc(testValue) ?
            Promise.resolve(dataObject):
            Promise.reject({
                message: errMsg
            });
    });

    const curryRightMap = _.curryRight(_.map, 2);

    const addOne = (num) => {
        return num + 1;
    };

    const toUpperCase = (usrString) => {
        return usrString.toUpperCase();
    };

    const capitalizeFirst = (usrString) => {
        return usrString && usrString[0].toUpperCase() + usrString.slice(1);
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

    console.log('After age was increased two times:', modifiedTestObject1Copy.age);

    console.log('');
    console.log('After name was uppercased and comments bodies were capitalized:');
    console.log('');

    let fixNameAndComments = composeAsync(
        lensOver('name', toUpperCase),
        lensOver('comments', curryRightMap ( lensOver('body', capitalizeFirst) ))
    );

    modifiedTestObject1Copy = await fixNameAndComments(mockAPICall());
    console.log(modifiedTestObject1Copy);

    console.log('');
    console.log('After name was uppercased, comments bodies were capitalized and age increased two times (combo programm):');
    console.log('');

    let comboProgram1 = compose(ageSomebodyByTwoYears, fixNameAndComments);

    modifiedTestObject1Copy = await comboProgram1(mockAPICall());
    console.log(modifiedTestObject1Copy);


    let getTestObject1AndCheck = composeAsync(
        checkIf('name', (name) => {return name !== undefined}, 'no name found!'),
        checkIf('age',  _.curryRight(_.gt)(15), 'not old enough!'),
        checkIf('age', _.curryRight(_.eq)(20), 'not 20 years old')
    );

    console.log('');
    console.log('Check test object for various conditions:');
    console.log('');

    await getTestObject1AndCheck(mockAPICall())
        .then(console.log.bind(console, 'success'))
        .catch(console.log.bind(console, 'fail'));

    console.log('');
    console.log('--------------------------------------------------------');
    console.log('');
}