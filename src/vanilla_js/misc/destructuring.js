'use strict';

// destructuring example 1
let [first1, ...rest1] = [1, 2, 3, 4];
console.log(first1); // returns 1
console.log(rest1); // returns [ 2, 3, 4 ]

// destructuring example 2
let [first2] = [1, 2, 3, 4];
console.log(first2); // outputs 1

// destructuring example 3
let [, second3, , fourth3] = [1, 2, 3, 4];
console.log(second3); // returns 2
console.log(fourth3); // returns 4

// destructuring example 4
let testObj1 = {
    to1prop1: 'foo',
    to1prop2: 12,
    to1prop3: 'bar'
}

let {to1prop2, to1prop3} = testObj1;
console.log(to1prop2); // returns 12
console.log(to1prop3); // return 'bar'

// destructuring example 4
let testObj2 = {
    to2prop1: 'foo1',
    to2prop2: 12,
    to2prop3: 'bar1',
    to2Prop4: {
        to2SubProp1: 'foo2',
        to2SubProp2: 13,
        to2SubProp3: 'bar2'
    }
};

const {to2prop1, to2prop3, to2Prop4: {to2SubProp2}} = testObj2;

console.log(to2prop1);
console.log(to2prop3);
console.log(to2SubProp2);