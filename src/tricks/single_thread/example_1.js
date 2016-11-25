'use strict';

console.log('Examples showing that JS is single thread');
console.log('=========================================');
console.log('');

setTimeout(() => {
    console.log('output after timeout...');
}, 0);

for (let counter1 = 0; counter1 < 1254740991; counter1++) {
}

console.log('output after long loop...');