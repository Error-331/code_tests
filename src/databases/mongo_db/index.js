'use strict';

const {spawn} = require('child_process');
const fs = require('fs');
const rimraf = require('rimraf');

const MongoClient = require('mongodb').MongoClient;

const testDataVariant1 = require('./../test_json_data/data_collection_variant1.json');
const dbDirPath = './mongo_db/db_files';

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
                console.log('MongoDB" database tests');
                console.log('=======================');
                console.log('');

                const mongoDBURL = 'mongodb://localhost:27017/mongoDBExamples';

                MongoClient.connect(mongoDBURL, async (err, db) => {
                    const examplesCollection = db.collection('examples');

                    await new Promise((resolvePromise, rejectPromise) => {
                        console.log('Collection insertion example...');

                        examplesCollection.insertOne(testDataVariant1[0], function(error, result) {
                            console.log('Collection insertion finished...');
                            error === null ? resolvePromise(result) : rejectPromise(error);
                        });
                    });

                    console.log('');

                    await new Promise((resolvePromise, rejectPromise) => {
                        console.log('Collections insertion example...');

                        examplesCollection.insertMany([testDataVariant1[1], testDataVariant1[2], testDataVariant1[3]], (error, result) => {
                            console.log('Collections insertion finished...');
                            error === null ? resolvePromise(result) : rejectPromise(error);
                        });
                    });

                    console.log('');

                    await new Promise((resolvePromise, rejectPromise) => {
                        console.log('Load all collections example...');

                        examplesCollection.find({}).toArray((error, loadedDocs) => {
                            console.log('Loaded collections:');
                            console.log('');

                            console.log(loadedDocs);

                            error === null ? resolvePromise(loadedDocs) : rejectPromise(error);
                        });
                    });

                    db.close(_ => mongoDBProcess.kill(9));
                });
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