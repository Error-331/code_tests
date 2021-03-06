'use strict';

console.log('Examples showing that JS is single thread (for/setTimeout)');
console.log('==========================================================');
console.log('');

setTimeout(() => {
    // last output
    console.log('output after timeout...');
}, 0);

// setTimeout() result will be put on queue and queue result can be put on stack when it is empty
// https://www.youtube.com/watch?v=8aGhZQkoFbQ - more here
for (let counter1 = 0; counter1 < 1254740991; counter1++) {
}

// first output
console.log('output after long loop...');