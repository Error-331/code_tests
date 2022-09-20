'use strict';

const crypto = require('crypto');
const fs = require('fs');
const util = require('util');

const cipherData = fs.readFileSync(`${__dirname}/key.json`);
const { key, algorithm } = JSON.parse(cipherData);

function encryptDeprecatedNotSafe(stringToEncrypt) {
    const cipher = crypto.createCipher(algorithm, key); // createCipher - deprecated method

    let encrypted = cipher.update(stringToEncrypt, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    return encrypted;
}

function encryptSafe(stringToEncrypt) {
    const iv = crypto.randomBytes(8).toString('hex'); // for aes256 we need 16 bytes, but since we convert those 8 bytes to hex - we get twice as much bytes
    const cipher = crypto.createCipheriv(algorithm, key, iv); // createCipher - deprecated method

    let encrypted = cipher.update(stringToEncrypt, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    return `${encrypted}:${iv}`;
}

function decryptSafe(stringToDecryptWithIV) {
    const [stringToDecrypt, iv] = stringToDecryptWithIV.split(':')
    const decipher = crypto.createDecipheriv(algorithm, key, iv);

    let decrypted = decipher.update(stringToDecrypt, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
}

const stringToEncrypt1 = 'Test string  ! - to encrypt...';

let encryptionResult1 = encryptDeprecatedNotSafe(stringToEncrypt1);
let encryptionResult2 = encryptDeprecatedNotSafe(stringToEncrypt1);

// console.log(crypto.getHashes()); // get a list of all hashing algorithms
// console.log(crypto.getCiphers()); // get a list of all ciphers

console.log('Encrypted string 1 (not safe, deprecated) - first run: ', encryptionResult1);
console.log('Encrypted string 1 (not safe, deprecated) - second run: ', encryptionResult2);
console.log('Encryption result comparison: ', encryptionResult1 === encryptionResult2);

console.log('');

encryptionResult1 = encryptSafe(stringToEncrypt1);
encryptionResult2 = encryptSafe(stringToEncrypt1);

console.log('Encrypted string 1 (safe) - first run: ', encryptionResult1);
console.log('Encrypted string 1 (safe) - second run: ', encryptionResult2);
console.log('Encryption result comparison: ', encryptionResult1 === encryptionResult2);

console.log('');

let decryptionResult1 = decryptSafe(encryptionResult1);
let decryptionResult2 = decryptSafe(encryptionResult2);

console.log('Decrypted string 1 (safe) - first result: ', decryptionResult1);
console.log('Decrypted string 1 (safe) - second result: ', decryptionResult2);
console.log('Decryption result comparison: ', decryptionResult1 === decryptionResult2);

console.log('');

const sha512Hash1 = crypto.createHash('sha512').update(stringToEncrypt1).digest('hex');
const sha512Hash2 = crypto.createHash('sha512').update(stringToEncrypt1).digest('hex');

console.log('SHA512 hash1: ', sha512Hash1);
console.log('SHA512 hash1: ', sha512Hash2);
console.log('SHA512 hash comparison: ', sha512Hash1 === sha512Hash2);

console.log('');

console.log('Random HEX hash: ', crypto.randomBytes(16).toString('hex'));


console.log('');

async function scryptHash(stringToHash, salt) {
    const saltInUse = salt || crypto.randomBytes(16).toString('hex');
    const hashBuffer = await util.promisify(crypto.scrypt)(stringToHash, saltInUse, 32); // 32 symbols, 64 bytes

    return `${hashBuffer.toString('hex')}:${saltInUse}`
}

async function scryptVerify(testString, stringHashWithSalt) {
    const [, salt] = stringHashWithSalt.split(':');
    return await scryptHash(testString, salt) === stringHashWithSalt;
}

async function runScryptExample() {
    encryptionResult1 = await scryptHash(stringToEncrypt1);
    encryptionResult2 = await scryptHash(stringToEncrypt1);

    console.log('Encrypted string 1 (scrypt) - first run: ', encryptionResult1);
    console.log('Encrypted string 1 (scrypt) - second run: ', encryptionResult2);
    console.log('Encryption result comparison: ', encryptionResult1 === encryptionResult2);

    console.log(' ');

    const sEncryptedString1Case1 = '161a1fdb06d68ec551cfbd224c64d7d556581f65907fb7bd1e323c60ec1c813c:9b77521deed015621dd4c3db72100966';
    const sEncryptedString1Case2 = 'd6f865c63b576e38b07b97a682b710c5d59e3bd4df190fecc089cbdd5c820d0c:a6cd6d9fb29ba3e37bab43ff345db409';

    console.log('sCrypt test string result (case 1)', await scryptVerify(stringToEncrypt1, sEncryptedString1Case1));
    console.log('sCrypt test string result (case 2)', await scryptVerify(stringToEncrypt1, sEncryptedString1Case2));
}

runScryptExample();