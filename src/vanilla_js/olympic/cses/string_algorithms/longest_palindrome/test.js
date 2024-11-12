import test from 'node:test';
import assert from 'node:assert/strict';

import longestPalindromeNaiveBetterSolution from './longest_palindrome_naive_better_solution.js';
import longestPalindromeNaiveBetterFasterSolution from './longest_palindrome_naive_better_faster_solution.js';

const userSequence1 = '54321512346';

const csesSequence1 = 'aaaaaaaaaa';
const csesSequence2 = 'ababababab';
const csesSequence9 = 'ihpohpzoffel';
const csesSequence10 = 'flexflexvpqxierullgcfckjqflexflex';
const csesSequence12 = 'obsession';
const csesSequence13 = 'abcxcbaxcba';
const csesSequence14 = 'zzabc';
const csesSequence15 = 'aaccaabbaaccaaccaabbaaccaa';
const csesSequence17 = 'pan';
const csesSequence18 = 'a';
const csesSequence19 = 'abcdba';
const csesSequence20 = 'abb';

const userSequence1Solution = '432151234';

const csesSequence1Solution = 'aaaaaaaaaa';
const csesSequence2Solution = 'ababababa';
const csesSequence9Solution = 'ff';
const csesSequence10Solution = 'cfc';
const csesSequence12Solution = 'ses';
const csesSequence13Solution = 'abcxcba';
const csesSequence14Solution = 'zz';
const csesSequence15Solution = 'aaccaabbaaccaaccaabbaaccaa';
const csesSequence17Solution = 'p';
const csesSequence18Solution = 'a';
const csesSequence19Solution = 'a';
const csesSequence20Solution = 'bb';

//const csesSequenceLarge = readFileSync('./test_input8.txt').toString();

test('longestPalindromeNaiveBetterSolution() tests...', async (t) => {
    await t.test('Custom test cases...', async (t) => {
        await t.test('Longest palindrome - case 1', () => {
            assert.strictEqual(longestPalindromeNaiveBetterSolution(userSequence1), userSequence1Solution);
        });
    });

    await t.test('CSES test cases...', async (t) => {
        await t.test('Longest palindrome - case 1', () => {
            assert.strictEqual(longestPalindromeNaiveBetterSolution(csesSequence1), csesSequence1Solution);
        });

        await t.test('Longest palindrome - case 2', () => {
            assert.strictEqual(longestPalindromeNaiveBetterSolution(csesSequence2), csesSequence2Solution);
        });

        await t.test('Longest palindrome - case 9', () => {
            assert.strictEqual(longestPalindromeNaiveBetterSolution(csesSequence9), csesSequence9Solution);
        });

        await t.test('Longest palindrome - case 10', () => {
            assert.strictEqual(longestPalindromeNaiveBetterSolution(csesSequence10), csesSequence10Solution);
        });

        await t.test('Longest palindrome - case 12', () => {
            assert.strictEqual(longestPalindromeNaiveBetterSolution(csesSequence12), csesSequence12Solution);
        });

        await t.test('Longest palindrome - case 13', () => {
            assert.strictEqual(longestPalindromeNaiveBetterSolution(csesSequence13), csesSequence13Solution);
        });

        await t.test('Longest palindrome - case 14', () => {
            assert.strictEqual(longestPalindromeNaiveBetterSolution(csesSequence14), csesSequence14Solution);
        });

        await t.test('Longest palindrome - case 15', () => {
            assert.strictEqual(longestPalindromeNaiveBetterSolution(csesSequence15), csesSequence15Solution);
        });

        await t.test('Longest palindrome - case 17', () => {
            assert.strictEqual(longestPalindromeNaiveBetterSolution(csesSequence17), csesSequence17Solution);
        });

        await t.test('Longest palindrome - case 18', () => {
            assert.strictEqual(longestPalindromeNaiveBetterSolution(csesSequence18), csesSequence18Solution);
        });

        await t.test('Longest palindrome - case 19', () => {
            assert.strictEqual(longestPalindromeNaiveBetterSolution(csesSequence19), csesSequence19Solution);
        });

        await t.test('Longest palindrome - case 20', () => {
            assert.strictEqual(longestPalindromeNaiveBetterSolution(csesSequence20), csesSequence20Solution);
        });
    });
});

test('longestPalindromeNaiveBetterFasterSolution() tests...', async (t) => {
    await t.test('Custom test cases...', async (t) => {
        await t.test('Longest palindrome - case 1', () => {
            assert.strictEqual(longestPalindromeNaiveBetterFasterSolution(userSequence1), userSequence1Solution);
        });
    });

    await t.test('CSES test cases...', async (t) => {
        await t.test('Longest palindrome - case 1', () => {
            assert.strictEqual(longestPalindromeNaiveBetterFasterSolution(csesSequence1), csesSequence1Solution);
        });

        await t.test('Longest palindrome - case 2', () => {
            assert.strictEqual(longestPalindromeNaiveBetterFasterSolution(csesSequence2), csesSequence2Solution);
        });

        await t.test('Longest palindrome - case 9', () => {
            assert.strictEqual(longestPalindromeNaiveBetterFasterSolution(csesSequence9), csesSequence9Solution);
        });

        await t.test('Longest palindrome - case 10', () => {
            assert.strictEqual(longestPalindromeNaiveBetterFasterSolution(csesSequence10), csesSequence10Solution);
        });

        await t.test('Longest palindrome - case 12', () => {
            assert.strictEqual(longestPalindromeNaiveBetterFasterSolution(csesSequence12), csesSequence12Solution);
        });

        await t.test('Longest palindrome - case 13', () => {
            assert.strictEqual(longestPalindromeNaiveBetterFasterSolution(csesSequence13), csesSequence13Solution);
        });

        await t.test('Longest palindrome - case 14', () => {
            assert.strictEqual(longestPalindromeNaiveBetterFasterSolution(csesSequence14), csesSequence14Solution);
        });

        await t.test('Longest palindrome - case 15', () => {
            assert.strictEqual(longestPalindromeNaiveBetterFasterSolution(csesSequence15), csesSequence15Solution);
        });

        await t.test('Longest palindrome - case 17', () => {
            assert.strictEqual(longestPalindromeNaiveBetterFasterSolution(csesSequence17), csesSequence17Solution);
        });

        await t.test('Longest palindrome - case 18', () => {
            assert.strictEqual(longestPalindromeNaiveBetterFasterSolution(csesSequence18), csesSequence18Solution);
        });

        await t.test('Longest palindrome - case 19', () => {
            assert.strictEqual(longestPalindromeNaiveBetterFasterSolution(csesSequence19), csesSequence19Solution);
        });

        await t.test('Longest palindrome - case 20', () => {
            assert.strictEqual(longestPalindromeNaiveBetterFasterSolution(csesSequence20), csesSequence20Solution);
        });
    });
});