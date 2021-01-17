

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


