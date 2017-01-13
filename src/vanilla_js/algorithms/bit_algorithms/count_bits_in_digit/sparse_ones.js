'use strict';

// http://gurmeet.net/puzzles/fast-bit-counting-routines/
//
// Sparse-ones: Only iterates as many times as there are 1-bits in the integer.
//
// Sparse Ones runs in time proportional to the number of 1 bits. The mystical line n &= (n - 1) simply sets the rightmost 1 bit in n to 0.

// mock data
let digit1 = 12; // 01100 - 2 bits
let digit2 = 137; // 010001001 - 3 bits
let digit3 = 58; // 0111010 - 4 bits

// solution
const sparseOnesBitCount = (digit) => {
    let bitsCount = 0;

    while (digit)  {
        bitsCount++ ;

        digit &= (digit - 1) ;
    }

    return bitsCount;
}

console.log('Sparse ones bit count');
console.log('=====================');

let bitCount = sparseOnesBitCount(digit1);
console.log('Result1: ' + bitCount);

bitCount = sparseOnesBitCount(digit2);
console.log('Result2: ' + bitCount);

bitCount = sparseOnesBitCount(digit3);
console.log('Result3: ' + bitCount);
