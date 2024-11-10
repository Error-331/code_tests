'use strict';

import argon2 from 'argon2';

async function deriveKey(passphrase, salt, length) {
    try {
        const params = {
            raw: true,
            hashLength: length,
            salt: salt,
            type: argon2.argon2id,
            timeCost: 3,
            memoryCost: 4096,
            parallelism: 1,
            version: 0x13,
        }

        const result = await argon2.hash(passphrase, params);
        return result;
    }
    catch (err) {
        console.error('An internal error occurred: ', err)
    }
}

const passphrase = 'correct horse battery staple';
const salt = Buffer.from('WiHmGLjgzYESy3eAW45W0Q==', 'base64');

const key128 = await deriveKey(passphrase, salt, 16);
console.log('128-bit key:', key128.toString('base64'))

const key256 = await deriveKey(passphrase, salt, 32);
console.log('256-bit key:', key256.toString('base64'));