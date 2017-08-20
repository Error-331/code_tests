'use strict';

const minimist = require('minimist');
const {spawn} = require('child_process');
const fs = require('fs');
const rimraf = require('rimraf');

const mongoose = require('mongoose');

const testDataVariant1 = require('./../test_json_data/data_collection_variant1.json');
const dbDirPath = './src/databases/mongoose/db_files';

// global preparation
mongoose.Promise = global.Promise;

// schema definition starts here
const MongooseSchema = mongoose.Schema;

const StatisticsDataSchema = new MongooseSchema({
    ip: String,
    userAgent: String,
    viewedLandingPageAddress: String,

    clientX: Number,
    clientY: Number,

    offsetX: Number,
    offsetY: Number,

    pageX: Number,
    pageY: Number,

    screenX: Number,
    screenY: Number
});

StatisticsDataSchema.pre('save', function(next) {
    console.log('Saving statistics data...');

    next()
});

StatisticsDataSchema.methods.getClientCoordinatesString = function() {
    return `Client X: ${this.clientX}, Client Y: ${this.clientY}`;
};

module.exports = async () => {

    if (fs.existsSync(dbDirPath)) {
        rimraf.sync(dbDirPath);
    }

    fs.mkdirSync(dbDirPath);

    await new Promise((resolvePromise, rejectPromise) => {
        const cmdArgs = minimist(process.argv.slice(2));
        const currentOS = cmdArgs.os.toLowerCase();

        const mongodParams = ['--dbpath', dbDirPath, '--port', '27017'];
        const mongoDBProcess = currentOS === 'windows' ? spawn('c:\\Program Files\\MongoDB\\Server\\3.4\\bin\\mongod.exe',  mongodParams) : spawn('mongod',  mongodParams);

        mongoDBProcess.stderr.on('data', (data) => {
            console.log(`stderr: ${data}`);
        });

        mongoDBProcess.stdout.on('data', (data) => {
            if (data.toString().indexOf('waiting for connections on port 27017') !== -1) {
                console.log('Mongoose" MongoDB object modeling tests');
                console.log('=======================================');
                console.log('');

                const dbConnection = mongoose.createConnection('mongodb://localhost:27017/mongooseExamples');

                dbConnection.on('error', console.error.bind(console, 'connection error:'));

                dbConnection.on('disconnected', function () {
                    console.error('Mongoose connection disconnected');
                });

                dbConnection.once('open', async function() {
                    const statisticsDataModel = dbConnection.model('StatisticsData', StatisticsDataSchema);
                    const statisticsData1 = new statisticsDataModel(testDataVariant1[0]);

                    await new Promise((resolveAddCollectionPromise, rejectAddCollectionPromise) => {
                        console.log('Collection insertion example...');

                        statisticsData1.save().then((currentCollection) => {
                            console.log('Collection insertion finished...');
                            console.log('');
                            console.log(currentCollection.getClientCoordinatesString());

                            resolveAddCollectionPromise(currentCollection);
                        }).catch(error => {
                            rejectAddCollectionPromise(error);
                        });
                    });

                    console.log('');

                    await new Promise((resolvePromise, rejectPromise) => {
                        console.log('Load all collections example...');

                        statisticsDataModel.find({}).then(loadedDocs => {
                            console.log('Loaded collections:');
                            console.log('');

                            console.log(loadedDocs);
                            resolvePromise(loadedDocs)
                        }).catch(error => {
                            rejectPromise(error);
                        });
                    });

                    console.log('');

                    dbConnection.close(_ =>  mongoDBProcess.kill(9));
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