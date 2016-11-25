'use strict';

let testObj1 = {
    testProp: 1
};

// Javascript always passes by value. However, if you pass an object to a function, the "value" is really a reference to that object.
// We just assign local variable testObj that contains a reference to testObj1 to new reference that points to local object.
function modFunction1(testObj) {
    testObj = {testProp: 2};
}

console.log('Investigation of object basics');
console.log('===============================');

console.log('');

console.log('Pass object to function that assigns the reference to new object');
console.log('----------------------------------------------------------------');

console.log('');

console.log('Before', testObj1);
modFunction1(testObj1);
console.log('After', testObj1);
