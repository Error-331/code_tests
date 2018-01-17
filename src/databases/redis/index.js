'use strict';

const {spawn} = require('child_process');
const redis = require('redis');

module.exports = async () => {
    await new Promise((resolvePromise, rejectPromise) => {
        const redisProcess = spawn('redis-server');

        redisProcess.stderr.on('data', (data) => {
            console.log(`stderr: ${data}`);
        });

        redisProcess.stdout.on('data', async (data) => {
            if (data.toString().indexOf('oO0OoO0OoO0Oo Redis is starting oO0OoO0OoO0Oo') === -1) {
                return;
            }

            console.log('"Redis" database tests');
            console.log('======================');
            console.log('');

            const redisClient = redis.createClient();

            console.log('Redis simple key/value manipulation example...');
            console.log('');

            const tempStringKey1 = 'temp_string_key1';
            const tempStringVal1 = 'test_string_val1';

            redisClient.set(tempStringKey1, tempStringVal1);
            console.log(`"${tempStringKey1}" key set with value "${tempStringVal1}"`);

            const tempStringVar1 = await new Promise(resolvePromiseLocal => redisClient.get('temp_string_var1', (error, keyValue) => resolvePromiseLocal(keyValue)));
            console.log(`"${tempStringKey1}" key extracted with value "${tempStringVar1}"`);


            redisClient.quit();
            redisProcess.kill(9)
        });

        redisProcess.on('close', (code) => {
            console.log('');
            console.log('--------------------------------------------------------');
            console.log('');

            resolvePromise();
        });
    });
};