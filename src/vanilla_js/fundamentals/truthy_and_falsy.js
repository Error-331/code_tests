'use strict';

export default async () => {

    const testTruthy = (valueToTest) => {
        return valueToTest ? 'truthy' : 'falsy';
    };

    const obj = { name: 'John' };

    console.log('Truthy and Falsy');
    console.log('================');
    console.log('');

    console.log('testTruthy(undefined) -', testTruthy(undefined)); // true
    console.log('testTruthy(null) -', testTruthy(null)); // false

    console.log('');

    console.log('testTruthy(true) -', testTruthy(true)); // true
    console.log('testTruthy(false) -', testTruthy(false)); // false

    console.log('');

    console.log('testTruthy(new Boolean(false)) -', testTruthy(new Boolean(false))); // true (object is always true)
    console.log('testTruthy(new String("")) - ', testTruthy(new String(""))); // true (object is always true)
    console.log('new Number(NaN) -', testTruthy(new Number(NaN))); // true (object is always true)

    console.log('');

    console.log('testTruthy("") -', testTruthy("")); // false
    console.log('testTruthy("Packt") -', testTruthy("Packt")); // true

    console.log('');

    console.log('testTruthy(1) -', testTruthy(1)); // true
    console.log('testTruthy(-1) -', testTruthy(-1)); // true
    console.log('testTruthy(NaN) -', testTruthy(NaN)); // false

    console.log('');

    console.log('testTruthy({}) -', testTruthy({}));// true (object is always true)
    console.log('testTruthy(obj) -', testTruthy(obj)); // true
    console.log('testTruthy(obj.name) -', testTruthy(obj.name)); // true
    console.log('testTruthy(obj.age) -', testTruthy(obj.age)); // age (property does not exist) - false

    console.log('');
    console.log('--------------------------------------------------------');
    console.log('');
}
