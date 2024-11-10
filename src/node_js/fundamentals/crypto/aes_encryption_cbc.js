'use strict';

import crypto from 'crypto';
import { promisify } from 'util';

const randomBytes = promisify(crypto.randomBytes);

async function encrypt(key, plaintext) {
    const iv = await randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);

    const encrypted = Buffer.concat([
        cipher.update(plaintext, 'utf8'),
        cipher.final(),
    ]);

    return Buffer.concat([iv, encrypted]);
}

function decrypt(key, message) {
    const iv = message.slice(0, 16);
    const ciphertext = message.slice(16);

    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    const decrypted = Buffer.concat([
        decipher.update(ciphertext, 'utf8'),
        decipher.final(),
    ]);

    return decrypted.toString('utf8')
}

const plaintext = 'Hello world!';
const key = await randomBytes(32);

console.log('Key:', key.toString('base64'));
const encrypted = await encrypt(key, plaintext);

console.log('Encrypted message:', encrypted.toString('base64'));

const decrypted = decrypt(key, encrypted);
console.log('Decrypted message:', decrypted);