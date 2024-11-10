'use strict';

import crypto from 'crypto';
import fs from 'fs';
import { promisify } from 'util';

const randomBytes = promisify(crypto.randomBytes);

async function encrypt(key, source, destination) {
    const iv = await randomBytes(12);
    return new Promise((resolve, reject) => {
        const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
        cipher.on('end', () => {
            const tag = cipher.getAuthTag();
            resolve(tag);
        });

        cipher.on('error', (err) => {
            reject(err)
        });

        destination.write(iv);
        source.pipe(cipher).pipe(destination);
    });
}

async function decrypt(key, tag, source, destination) {
    const iv = await new Promise((resolve) => {
        const cb = () => {
            const iv = source.read(12);
            source.off('readable', cb);
            return resolve(iv);
        }

        source.on('readable', cb);
    });

    if (!iv) {
        throw Error('iv is null');
    }

    return new Promise((resolve, reject) => {
        const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
        decipher.setAuthTag(tag);

        decipher.on('end', () => { resolve() });
        decipher.on('error', (err) => { reject(err) });

        source.pipe(decipher).pipe(destination);
    })
}

const key = await randomBytes(32);
console.log('Key:', key.toString('base64'));
const testFile = './aes_encryption_gcm_stream.js';

let tag;
{
    const inFile = fs.createReadStream(testFile);
    const outFile = fs.createWriteStream(testFile + '.enc');

    tag = await encrypt(key, inFile, outFile);

    console.log('File was encrypted; authentication tag:', tag.toString('base64'));
}
{
    const inFile = fs.createReadStream(testFile + '.enc');
    const outFile = fs.createWriteStream(testFile + '.orig');

    await decrypt(key, tag, inFile, outFile);

    console.log('File was decrypted successfully');
}