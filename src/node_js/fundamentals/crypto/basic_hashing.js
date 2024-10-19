'use strict';

import crypto from 'crypto';
import fs from 'fs';
import { promisify } from 'util';

import argon2 from 'argon2';

function sha256Digest(message, encoding) {
    return crypto
        .createHash('sha256')
        .update(message)
        .digest(encoding);
}

function sha256DigestStream(read, encoding) {
    return new Promise((resolve, reject) => {
        const hash = crypto.createHash('sha256');

        read.on('error', (err) => {
            reject(err);
        });

        read.on('end', () => {
            resolve(hash.digest(encoding));
        });

        read.pipe(hash);
    });
}

async function hashFile(path) {
    const read = fs.createReadStream(path);
    return await sha256DigestStream(read, 'hex');
}

async function argon2Digest(message) {
    return await argon2.hash(message, {
        type: argon2.argon2id,
    });
}

async function scryptHash(passphrase) {
    const saltLength = 16;

    const scrypt = promisify(crypto.scrypt);
    const randomBytes = promisify(crypto.randomBytes);

    const salt = await randomBytes(saltLength);
    const hash = await scrypt(passphrase, salt, 32);

    return Buffer.concat([salt, hash]).toString('base64');
}

async function scryptVerify(stored, passphrase) {
    const saltLength = 16;
    const buf = Buffer.from(stored, 'base64');

    const salt = buf.slice(0, saltLength);
    const hash = buf.slice(saltLength);

    const scrypt = promisify(crypto.scrypt);
    const verifyHash = await scrypt(passphrase, salt, 32);

    return verifyHash.compare(hash) === 0;
}

console.log('NodeJS "basic hashing" examples');
console.log('===============================');
console.log('');

console.log('sha256Digest("Hello world!") - ', sha256Digest('Hello world!'));
console.log('sha256Digest("Hello world!", "hex") - ', sha256Digest('Hello world!', 'hex'));
console.log('sha256Digest("Hello world!", "base64") - ', sha256Digest('Hello world!', 'base64'));

console.log('');

console.log('await hashFile("./basic_hashing.js") - ', await hashFile('./basic_hashing.js'));
console.log('await argon2Digest("Hello world!") - ', await argon2Digest('Hello world!'));

console.log('');

console.log('await scryptHash("Hello world!") - ', await scryptHash('Hello world!'));
console.log('await scryptVerify(await scryptHash("Hello world!"), "Hello world!") - ', await scryptVerify(await scryptHash('Hello world!'), 'Hello world!'));



