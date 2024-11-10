'use strict';

import crypto from 'crypto';
import { promisify } from 'util';

const randomBytes = promisify(crypto.randomBytes);

async function encrypt(key, plaintext) {
    const nonce = await randomBytes(12);
    const cipher = crypto.createCipheriv('chacha20-poly1305', key, nonce, {
            authTagLength: 16
    });

    const encrypted = Buffer.concat([
        cipher.update(plaintext, 'utf8'),
        cipher.final(),
    ]);

    const tag = cipher.getAuthTag();
    return Buffer.concat([nonce, tag, encrypted]);
}

function decrypt(key, message) {
    const nonce = message.slice(0, 12);
    const tag = message.slice(12, 28);
    const ciphertext = message.slice(28);
    const decipher = crypto.createDecipheriv('chacha20-poly1305', key, nonce, { authTagLength: 16 });

    decipher.setAuthTag(tag)
    const decrypted = Buffer.concat([
        decipher.update(ciphertext, 'utf8'),
        decipher.final(),
    ]);

    return decrypted.toString('utf8');
}

const plaintext = 'Hello world!';
const key = await randomBytes(32);

console.log('Key:', key.toString('base64'));
const encrypted = await encrypt(key, plaintext);

console.log('Encrypted message:', encrypted.toString('base64'));

const decrypted = decrypt(key, encrypted);
console.log('Decrypted message:', decrypted);