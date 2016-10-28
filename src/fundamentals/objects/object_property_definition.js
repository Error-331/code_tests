'use strict';

// property definition example 1
let testObj1 = {};

Object.defineProperty(testObj1, 'propA', {
    value: 'propA_Val',
    writable: true,
    enumerable: true,
    configurable: true
});

Object.defineProperty(testObj1, 'propB', {
    value: 'propB_Val',
    writable: false,
    enumerable: false,
    configurable: true
});

Object.defineProperty(testObj1, 'propC', {
    value: 'propC_Val',
    writable: true,
    enumerable: true,
    configurable: false
});

for (let prop in testObj1) {
    console.log(prop + ': ' + testObj1[prop]);
} // will show 'propA' and 'propC', but not 'propB' (not enumerable)

testObj1.propA = 'propA_Val_New';
testObj1.propC = 'propC_Val_New';

try {
    testObj1.propB = 'propB_Val_New';
} catch(e) {
    console.log('"propB" is not writable');
} // propB is not writable

delete testObj1.propA;
delete testObj1.propB;

try {
    delete testObj1.propC;
} catch(e) {
    console.log('"propC" is not configurable');
} // propB is not configurable

console.log('');
console.log('-------------------------------------');
console.log('');

// property definition example 2
let testObj2 = {};

Object.defineProperty(testObj2, 'propA', {
    enumerable: true,
    configurable: true,

    get: () => {return 'propA_Val_Static'}
});

Object.defineProperty(testObj2, 'propB', {
    enumerable: true,
    configurable: true,

    get: () => {return this.propB;},
    set: (usrPropB) => {this.propB = usrPropB;}
});

testObj2.propB = 'propB_Val_New';

console.log(testObj2.propA);
console.log(testObj2.propB);
