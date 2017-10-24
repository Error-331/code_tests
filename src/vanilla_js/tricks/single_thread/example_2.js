'use strict';

console.log('Examples showing that JS is single thread (promise/setTimeout)');
console.log('==============================================================');
console.log('');

// setTimeout() result will be put on queue and queue result can be put on stack when it is empty
// https://www.youtube.com/watch?v=8aGhZQkoFbQ - more here
setTimeout(function(){
    // last output
    console.log('output after timeout...');
});

Promise.resolve(1).then(function(){
    // first output
    console.log('output after promise resolve...');
});

// second output
console.log('final output...');