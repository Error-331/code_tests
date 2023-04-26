'use strict';

console.log('Classes examples');
console.log('================');
console.log('');

/*const testPromise1 = new Promise((resolve, reject) => {
    console.log('testPromise1 resolve...');
    resolve('testPromise1 val 1...');
});

testPromise1
    .then((val) => {
        console.log(`then val: ${val}`);

        return new Promise(resolve => {
           console.log('sub promise 1 resolve...');
           resolve('sub promise 1 val 1...');
        });
    })
    .then(val => {
        console.log(`then val: ${val}`);
    })
    .catch(error => {
        console.error(error);
    });
*/

const testPromise2 = new Promise((resolve, reject) => {
    console.log('testPromise2 resolve...');
    resolve('testPromise2 val 1...');
});

testPromise2
    .then((val) => {
        console.log(`then val: ${val}`);

        throw new Error('sub promise 1 error 1...');
    })
    .then(val => {
        console.log(`then val: ${val}`);
    })
    .catch(error => {
        console.error(`error: ${error.message}`);
    });

/*Promise
    .resolve('cc')
    .then((value) => console.log(`Resolved value ${value}`));


Promise
    .resolve({then: (resolve, reject) => {
        setTimeout(() => {resolve('c1')}, 4000)
    }}).then((value) => console.log(`Resolved value ${value}`));


var promise1 = new Promise((resolve, reject) => {    resolve('fulfilled'); });
var promise2 = promise1.then((value) => {    console.log('then 1', value); });


promise2.then((value) => {console.log('then 2', value);});

console.log('equal', promise1 === promise2);


new Promise((resolve, reject) => {
    resolve('resolved value 1')
}).then((value) => {
    console.log(`Then 1 value - ${value}`);
    return value;
}).catch((error) => {
    console.error(error)
}).then((value) => {
    console.log(`Then 2 value - ${value}`);
    return value;
});*/


