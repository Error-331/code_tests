'use strict';

const {spawn} = require('child_process');
const fs = require('fs');
const rimraf = require('rimraf');

const mongoose = require('mongoose');

const testDataVariant1 = require('./../test_json_data/data_collection_variant1.json');
const dbDirPath = './mongoose/db_files';

module.exports = async () => {

    if (fs.existsSync(dbDirPath)) {
        rimraf.sync(dbDirPath);
    }

    fs.mkdirSync(dbDirPath);

    await new Promise((resolvePromise, rejectPromise) => {
        const mongoDBProcess = spawn('c:\\Program Files\\MongoDB\\Server\\3.4\\bin\\mongod.exe', ['--dbpath', dbDirPath, '--port', '27017']);

        mongoDBProcess.stderr.on('data', (data) => {
            console.log(`stderr: ${data}`);
        });

        mongoDBProcess.stdout.on('data', (data) => {
            if (data.toString().indexOf('waiting for connections on port 27017') !== -1) {
                console.log('Mmongoose" MongoDB object modeling tests');
                console.log('========================================');
                console.log('');


                mongoose.connect('mongodb://localhost:27017/mongoDBExamples');

                const dbConnection = mongoose.connection;
                dbConnection.on('error', console.error.bind(console, 'connection error:'));
                dbConnection.once('open', function() {
                    console.log('fdf');
                });

                dbConnection.close(_ =>  mongoDBProcess.kill(9));
            }
        });

        mongoDBProcess.on('close', (code) => {
            console.log('');
            console.log('--------------------------------------------------------');
            console.log('');

            resolvePromise();
        });
    });
};