console.log('true === true: ', true === true); // true
console.log('false === false: ', false === false); // true
console.log('1 === 1: ', 1 === 1); // true
console.log('"a" === "a": ', "a" === "a"); // true

console.log('{} === {}: ', {} === {}); // false
console.log('[] === []: ', [] === []); // false
console.log('(() => {}) === (() => {}): ', (() => {}) === (() => {})); // false

const z = {};
console.log('z === z: ', z === z); // true