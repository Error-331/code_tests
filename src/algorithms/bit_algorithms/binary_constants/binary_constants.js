'use strict';

// Example of bit constants usage.

// mock data
const OPTION_1 = 1;
const OPTION_2 = 2;
const OPTION_3 = 4;
const OPTION_4 = 8;
const OPTION_5 = 16;

let config1 = OPTION_1 | OPTION_4 | OPTION_5;
let config2 = OPTION_2 | OPTION_3;

console.log('Configuration 1');
console.log('---------------');

console.log('');

console.log('Is option 1 enabled: ' + ((config1 & OPTION_1) !== 0)); // true
console.log('Is option 2 enabled: ' + ((config1 & OPTION_2) !== 0)); // false
console.log('Is option 3 enabled: ' + ((config1 & OPTION_3) !== 0)); // false
console.log('Is option 4 enabled: ' + ((config1 & OPTION_4) !== 0)); // true
console.log('Is option 5 enabled: ' + ((config1 & OPTION_5) !== 0)); // true

console.log('');

console.log('Configuration 2');
console.log('---------------');

console.log('Is option 1 enabled: ' + ((config2 & OPTION_1) !== 0)); // false
console.log('Is option 2 enabled: ' + ((config2 & OPTION_2) !== 0)); // true
console.log('Is option 3 enabled: ' + ((config2 & OPTION_3) !== 0)); // true
console.log('Is option 4 enabled: ' + ((config2 & OPTION_4) !== 0)); // false
console.log('Is option 5 enabled: ' + ((config2 & OPTION_5) !== 0)); // false