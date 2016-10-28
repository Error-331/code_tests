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