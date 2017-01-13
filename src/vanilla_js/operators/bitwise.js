'use strict';

// mock data
let digit1 = 22; //  010110
let digit2 = 42; // 0101010

console.log('Bitwise operators');
console.log('=================');

// Bitwise AND

let bitwiseANDResult = digit1 & digit2;
console.log('Bitwise "AND" result: ' + bitwiseANDResult);

console.log('-------------------------------------');

// Bitwise OR (0111110 - 62)

let bitwiseORResult = digit1 | digit2;
console.log('Bitwise "OR" result: ' + bitwiseORResult);

console.log('-------------------------------------');

// Bitwise XOR (0111100 - 60)

let bitwiseXORResult = digit1 ^ digit2;
console.log('Bitwise "XOR" result: ' + bitwiseXORResult);

console.log('-------------------------------------');

// Bitwise NOT

let bitwiseNOTResult = ~digit1;
console.log('Bitwise "NOT" result1: ' + bitwiseNOTResult );

bitwiseNOTResult = ~digit2;
console.log('Bitwise "NOT" result2: ' + bitwiseNOTResult);

console.log('-------------------------------------');

// Bitwise left shift

// 010110 << 2 = 01011000 (88)
// 0101010 << 2 = 010101000 (168)
//  010110 << 42 = 0101100000000000
//  010110 << 28 = 01100000000000000000000000000000 (1610612736)
//  0101010 << 27 = 01010000000000000000000000000000 (1342177280)
//  010110 << 64 = 010110 (22)
//  0101010 << 64 = 0101010 (42)
//  010110 << 65 = 0101100 (44)
//  0101010 << 65 = 01010100 (84)

let bitwiseLeftShiftResult = digit1 << 2;
console.log('Bitwise "left shift" result 1: ' + bitwiseLeftShiftResult);

bitwiseLeftShiftResult = digit2 << 2;
console.log('Bitwise "left shift" result 2: ' + bitwiseLeftShiftResult);

bitwiseLeftShiftResult = digit1 << digit2;
console.log('Bitwise "left shift" result 3: ' + bitwiseLeftShiftResult);

bitwiseLeftShiftResult = digit1 << 28;
console.log('Bitwise "left shift" result 4: ' + bitwiseLeftShiftResult);

bitwiseLeftShiftResult = digit2 << 27;
console.log('Bitwise "left shift" result 5: ' + bitwiseLeftShiftResult);

bitwiseLeftShiftResult = digit1 << 64;
console.log('Bitwise "left shift" result 6: ' + bitwiseLeftShiftResult);

bitwiseLeftShiftResult = digit2 << 64;
console.log('Bitwise "left shift" result 7: ' + bitwiseLeftShiftResult);

bitwiseLeftShiftResult = digit1 << 65;
console.log('Bitwise "left shift" result 8: ' + bitwiseLeftShiftResult);

bitwiseLeftShiftResult = digit2 << 65
console.log('Bitwise "left shift" result 9: ' + bitwiseLeftShiftResult);

console.log('-------------------------------------');

// Bitwise right shift

// 010110 >> 2 = 000101 (5)
// 0101010 >> 2 = 0001010 (10)
//  010110 >> 42 = 0
//  010110 >> 28 = 0
//  0101010 >> 27 = 0
//  010110 >> 64 = 010110 (22)
//  0101010 >> 64 = 0101010 (42)
//  010110 >> 65 = 001011 (11)
//  0101010 >> 65 = 0010101 (42)

let bitwiseRightShiftResult = digit1 >> 2;
console.log('Bitwise "right shift" result 1: ' + bitwiseRightShiftResult);

bitwiseRightShiftResult = digit2 >> 2;
console.log('Bitwise "right shift" result 2: ' + bitwiseRightShiftResult);

bitwiseRightShiftResult = digit1 >> 42;
console.log('Bitwise "right shift" result 3: ' + bitwiseRightShiftResult);

bitwiseRightShiftResult = digit1 >> 28;
console.log('Bitwise "right shift" result 4: ' + bitwiseRightShiftResult);

bitwiseRightShiftResult = digit2 >> 27;
console.log('Bitwise "right shift" result 5: ' + bitwiseRightShiftResult);

bitwiseRightShiftResult = digit1 >> 64;
console.log('Bitwise "right shift" result 6: ' + bitwiseRightShiftResult);

bitwiseRightShiftResult = digit2 >> 64;
console.log('Bitwise "right shift" result 7: ' + bitwiseRightShiftResult);

bitwiseRightShiftResult = digit1 >> 65;
console.log('Bitwise "right shift" result 8: ' + bitwiseRightShiftResult);

bitwiseRightShiftResult = digit2 >> 65;
console.log('Bitwise "right shift" result 9: ' + bitwiseRightShiftResult);

console.log('-------------------------------------');