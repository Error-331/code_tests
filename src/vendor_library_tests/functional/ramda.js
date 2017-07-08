'use strict';

import R from 'ramda';

export default async () => {
    const isEven = x => x % 2 === 0;
    const isOdd = R.complement(isEven);

    const powersOfTwo = R.partial(Math.pow, [2]);

    const squareOf = R.partialRight(Math.pow, [2]);
    const cubeOf = R.partialRight(Math.pow, [3]);

    const multiply = (a, b) => a * b;
    const addOne = x => x + 1;
    const square = x => x * x;

    const operate1 = R.pipe(
        multiply,
        addOne,
        square
    );

    const numberToHex = (component) => {
        const hex = component.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    };

    const numbersToHex = (...args) => {
        return [...args].map(numberToHex).join('');
    };

    const rgbToHex = (red, green, blue) => {
        return '#' + numbersToHex(red) + numbersToHex(green) + numbersToHex(blue);
    };

    const hexColors = R.curry(rgbToHex);

    const roundedSqrt = R.compose(Math.round, Math.sqrt);
    const squaredDate = R.compose(roundedSqrt, Date.parse);

    const isDeviceOfRightModel1 = device => device.model === 'xhx23';
    const isDeviceOfRightModel2 = device => device.model === 'xhh54';

    const isDeviceOfRightModel3 = R.either(isDeviceOfRightModel1, isDeviceOfRightModel2);

    const isDeviceIsFunctional1 = device => device.isNotWorking === false;
    const isDeviceIsAPlayer1 = device => device.isPlayer === true;
    const isDeviceCanStream1 = device => device.isSupportStreaming === true;

    const isFunctionalPlayer1 = R.both(isDeviceIsFunctional1, isDeviceIsAPlayer1);
    const isCorrectPlayerDevice1 = R.allPass([isDeviceOfRightModel3, isFunctionalPlayer1]);
    const isDeviceSupportStreamingData1 = R.anyPass([isDeviceIsAPlayer1, isDeviceCanStream1]);

    const deviceData1 = {id: 1, model: 'xhx23', isNotWorking: false, isPlayer: true, isSupportStreaming: false};
    const deviceData2 = {id: 2, model: 'xjj55', isNotWorking: false, isPlayer: true, isSupportStreaming: false};
    const deviceData3 = {id: 3, model: 'xhh54', isNotWorking: true, isPlayer: true, isSupportStreaming: true};
    const deviceData4 = {id: 4, model: 'fd24', isNotWorking: false, isPlayer: false, isSupportStreaming: true};
    const deviceData5 = {id: 5, model: 'zh524', isNotWorking: false, isPlayer: false, isSupportStreaming: false};
    const deviceData6 = {id: 6, model: 'yt87', isNotWorking: false, isPlayer: true, isSupportStreaming: false};

    const testObj1 = {'testProp1': 'testValue1', 'testProp2': 'testValue2', 'testProp3': true, 'testProp4': null};

    const condFunc1ForTestObj1 = R.cond([
        [x => x.testProp2 === true, x => '1'],
        [x => x.testProp1 === 'testValue', x => '2'],
        [x => _.isNull(x.testProp4), x => '3']
    ]);

    const condFunc2ForTestObj1 = R.cond([
        [x => x.testProp2 === true, x => '1'],
        [x => x.testProp1 === 'testValue1', x => '2'],
        [x => _.isUndefined(x.testProp4), x => '3']
    ]);

    const numbersArray1 = [1, 5, 2, 10, 12];
    const numbersArray2 = [5, 12, 44, 25];

    console.log('"Ramda" library tests');
    console.log('=====================');

    console.log('Complement examples:');
    console.log('');

    console.log('isEven(2) -', isEven(2));
    console.log('isEven(3) -', isEven(3));
    console.log('isOdd(2) -', isOdd(2));
    console.log('isOdd(3) -', isOdd(3));

    console.log('');

    console.log('Either/both/allPass examples:');
    console.log('');

    console.log('isCorrectPlayerDevice1(deviceData1) -', isCorrectPlayerDevice1(deviceData1));
    console.log('isCorrectPlayerDevice1(deviceData2) -', isCorrectPlayerDevice1(deviceData2));
    console.log('isCorrectPlayerDevice1(deviceData3) -', isCorrectPlayerDevice1(deviceData3));

    console.log('');

    console.log('anyPass examples:');
    console.log('');

    console.log('isDeviceSupportStreamingData1(deviceData4) -', isDeviceSupportStreamingData1(deviceData4));
    console.log('isDeviceSupportStreamingData1(deviceData5) -', isDeviceSupportStreamingData1(deviceData5));
    console.log('isDeviceSupportStreamingData1(deviceData6) -', isDeviceSupportStreamingData1(deviceData6));

    console.log('');
    console.log('Partial left application examples:');
    console.log('');

    console.log('powersOfTwo(3) -', powersOfTwo(3));
    console.log('powersOfTwo(5) -', powersOfTwo(5));

    console.log('');

    console.log('Partial right application examples:');
    console.log('');

    console.log('squareOf(3) -', squareOf(3));
    console.log('squareOf(4) -', squareOf(4));
    console.log('cubeOf(3) -', cubeOf(3));
    console.log('cubeOf(4) -', cubeOf(4));

    console.log('');

    console.log('Currying examples:');
    console.log('');

    console.log('hexColors(11)(12)(123) -', hexColors(11)(12)(123));
    console.log('hexColors(210)(12)(0) -', hexColors(210)(12)(0));

    console.log('');

    console.log('hexColors(11,12,123) -', hexColors(11,12,123));
    console.log('hexColors(R.__, R.__, 0)(210)(12) -', hexColors(R.__, R.__, 0)(210)(12));

    console.log('');

    console.log('Cond examples:');
    console.log('');

    console.log('condFunc1ForTestObj1(testObj1) -', condFunc1ForTestObj1(testObj1));
    console.log('condFunc2ForTestObj1(testObj1) -', condFunc2ForTestObj1(testObj1));

    console.log('');

    console.log('Pipe examples:');
    console.log('');

    console.log('operate1(3, 4) -', operate1(3, 4));
    console.log('operate1(10, 10) -', operate1(10, 10));

    console.log('');

    console.log('Compose examples:');
    console.log('');

    console.log('roundedSqrt(5) -', roundedSqrt(5));
    console.log('squaredDate("January 1, 2014") -', squaredDate("January 1, 2014"));

    console.log('');
    console.log('Intersection examples:');
    console.log('');

    console.log('R.intersection(numbersArray1, numbersArray2) -', R.intersection(numbersArray1, numbersArray2));
    console.log('R.intersection(numbersArray2, numbersArray1) -', R.intersection(numbersArray2, numbersArray1));

    console.log('');
    console.log('Difference examples:');
    console.log('');

    console.log('R.difference(numbersArray1, numbersArray2) -', R.difference(numbersArray1, numbersArray2));
    console.log('R.difference(numbersArray2, numbersArray1) -', R.difference(numbersArray2, numbersArray1));

    console.log('');
    console.log('--------------------------------------------------------');
    console.log('');
}