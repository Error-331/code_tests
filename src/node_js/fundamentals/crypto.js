'use strict';

const crypto = require('crypto');

//keyed-hash message authentication code (HMAC)

module.exports = async () => {

    const stringArrayToCipher1 = [];

    stringArrayToCipher1.push('Cool i\'m');
    stringArrayToCipher1.push('the shizzle ');
    stringArrayToCipher1.push('sure sit ');
    stringArrayToCipher1.push('amizzle, ');
    stringArrayToCipher1.push('consectetuer ');
    stringArrayToCipher1.push('i\'m in the ');
    stringArrayToCipher1.push('shizzle yo. ');

    const cipherAlgorithm1 = 'AES-128-CBC';
    const cipherPassword1 = 'test_password_1';
    const cipherInputEncoding1 = 'utf8';
    const cipherOutputEncoding1 = 'hex';

    const cipheredStringArray1 = stringArrayToCipher1.map(stringToCipher => {
        const cipherObj = crypto.createCipher(cipherAlgorithm1, cipherPassword1);
        cipherObj.update(stringToCipher, cipherInputEncoding1, cipherOutputEncoding1);

        return cipherObj.final(cipherOutputEncoding1);
    });

    const decipheredStringArray1 = cipheredStringArray1.map(stringToDecipher => {
        const decipherObj = crypto.createDecipher(cipherAlgorithm1, cipherPassword1);

        decipherObj.update(stringToDecipher, cipherOutputEncoding1, cipherInputEncoding1);

        return decipherObj.final(cipherInputEncoding1);
    });

    console.log('NodeJS "crypto" examples');
    console.log('========================');
    console.log('');

    console.log('Ciphered array of strings example:');
    console.log('');

    console.log(cipheredStringArray1);

    console.log('');
    console.log('Deciphered array of strings example:');
    console.log('');

    console.log(decipheredStringArray1);

    console.log('');
    console.log('--------------------------------------------------------');
    console.log('');
};