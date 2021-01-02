'use strict';

// http://gurmeet.net/puzzles/fast-bit-counting-routines/
//
// Naive bit counting: Iterates through all bits.
//
// Iterated Count runs in time proportional to the total number of bits. It simply loops through all the bits, terminating slightly
// earlier because of the while condition. Useful if 1's are sparse and among the least significant bits.

// mock data
let digit1 = 12; // 01100 - 2 bits
let digit2 = 137; // 010001001 - 3 bits
let digit3 = 58; // 0111010 - 4 bits

// solution
const iteratedBitCount = (digit) => {
    let bitsCount = 0;

    while (digit) {
        bitsCount += (digit & 1);
        digit >>= 1;
    }

    return bitsCount;
};

console.log('Iterated bit count');
console.log('==================');

let bitCount = iteratedBitCount(digit1);
console.log('Result1: ' + bitCount);

bitCount = iteratedBitCount(digit2);
console.log('Result2: ' + bitCount);

bitCount = iteratedBitCount(digit3);
console.log('Result3: ' + bitCount);
