'use strict';

import _ from 'lodash';

export default async () => {
    const testObj1 = {'testProp1': 'testValue1', 'testProp2': 'testValue2', 'testProp3': true, 'testProp4': null};

    const testDataArray1 = [
        {id: 1, width: 100, height: 100, isCollapsable: false},
        {id: 2, width: 50, height: 200, isCollapsable: false},
        {id: 3, width: 500, height: 200, isCollapsable: true},
        {id: 4, width: 75, height: 215, isCollapsable: false},
        {id: 5, width: 1000, height: 1000, isCollapsable: true},
        {id: 6, width: 20, height: 30, isCollapsable: false},
        {id: 7, width: 100, height: 20, isCollapsable: true},
        {id: 8, width: 750, height: 450, isCollapsable: false}
    ];

    const calcAreaOfObject1 = x => x.width * x.height;
    const printDateFromTo1 = (from,to) => `From ${from} to ${to}`;

    const condFunc1ForTestDataArray1 = _.cond([
        [x => {const area = x.width * x.height; return area <= 10000 && area >= 5000}, _.stubTrue],
        [x => x.isCollapsable, _.stubTrue],
        [_.stubTrue, _.stubFalse]
    ]);

    const condFunc1ForTestObj1 = _.cond([
        [x => x.testProp2 === true, x => '1'],
        [x => x.testProp1 === 'testValue', x => '2'],
        [x => _.isNull(x.testProp4), x => '3']
    ]);

    const condFunc2ForTestObj1 = _.cond([
        [x => x.testProp2 === true, x => '1'],
        [x => x.testProp1 === 'testValue1', x => '2'],
        [x => _.isUndefined(x.testProp4), x => '3']
    ]);

    console.log('"Lodash" library tests');
    console.log('======================');

    console.log('');
    console.log('Cast array examples:');
    console.log('');

    console.log('_.castArray(331) -', _.castArray(331));
    console.log('_.castArray(null) -', _.castArray(null));
    console.log('_.castArray({"testProp1": "testVal1"})', _.castArray({"testProp1": "testVal1"}));

    console.log();
    console.log('Partial left application examples:');
    console.log('');

    console.log('_.partial(printDateFromTo1, "2017-03-11T00:00:00")("2017-03-11T23:59:59") -', _.partial(printDateFromTo1, '2017-03-11T00:00:00')('2017-03-11T23:59:59'));
    console.log('_.partial(printDateFromTo1, "2017-12-11T13:00:00")("2017-12-11T13:20:00") -', _.partial(printDateFromTo1, '2017-12-11T13:00:00')('2017-12-11T13:20:00'));

    console.log('');
    console.log('Cond examples:');
    console.log('');

    console.log('condFunc1ForTestObj1(testObj1) -', condFunc1ForTestObj1(testObj1));
    console.log('condFunc2ForTestObj1(testObj1) -', condFunc2ForTestObj1(testObj1));

    console.log('');
    console.log('Flow examples:');
    console.log('');

    console.log('_.flow([(x, y) => x * y, x => x * 10, x => x + 5])(10, 5) -', _.flow([(x, y) => x * y, x => x * 10, x => x + 5])(10, 5));
    console.log('_.flow([(x, y) => x * y, x => x * 10, x => x + 5])(7, 8) -', _.flow([(x, y) => x * y, x => x * 10, x => x + 5])(7, 8));

    console.log('');
    console.log('Flow right examples:');
    console.log('');

    console.log('_.flowRight(x => x + 5, x => x * 10, (x, y) => x * y)(10, 5) -', _.flowRight([x => x + 5, x => x * 10, (x, y) => x * y])(10, 5));
    console.log('_.flowRight([x => x + 5, x => x * 10, (x, y) => x * y)(7, 8) -', _.flowRight([x => x + 5, x => x * 10, (x, y) => x * y])(7, 8));

    console.log('');
    console.log('Chain examples:');
    console.log('');

    const chainRes1 = _.chain(testDataArray1).filter(condFunc1ForTestDataArray1).map(calcAreaOfObject1).value();
    console.log('_.chain(testDataArray1).filter(condFunc1ForTestDataArray1).map(calcAreaOfObject1).value() -', chainRes1);

    console.log('');
    console.log('--------------------------------------------------------');
    console.log('');
}