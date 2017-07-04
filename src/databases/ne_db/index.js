'use strict';

const Datastore = require('nedb');
const fs = require('fs');

const testDataVariant1 = require('./../test_json_data/data_collection_variant1.json');

const dbFilePath = './ne_db/db_files/test_db.json';

module.exports = async () => {
    console.log('"NeDB" database tests');
    console.log('=====================');
    console.log('');

    if (fs.existsSync(dbFilePath)) {
        fs.unlinkSync(dbFilePath);
    }

    const dbConnector = new Datastore({ filename: dbFilePath, autoload: true });

    await new Promise((resolvePromise, rejectPromise) => {
        console.log('Collection insertion example...');

        dbConnector.insert(testDataVariant1[0], function (error, newDoc) {
            console.log('Collection insertion finished...');

            error !== null ? rejectPromise(error) : resolvePromise(newDoc);
        });
    });

    console.log('');

    await new Promise((resolvePromise, rejectPromise) => {
        console.log('Collections insertion example...');

        dbConnector.insert([testDataVariant1[1], testDataVariant1[2], testDataVariant1[3]], function (error, newDoc) {
            console.log('Collections insertion finished...');

            error !== null ? rejectPromise(error) : resolvePromise(newDoc);
        });
    });

    console.log('');
    console.log('--------------------------------------------------------');
    console.log('');
};





/*const dataVariant1Inst1 = {
    ip: '234.90.55.101',
    userAgent: 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36',
    viewedLandingPageAddress: 'landing1.com/products1.html',

    clientX: 157, clientY: 1050, offsetX: 35, offsetY: 277, pageX: 641, pageY: 221, screenX: 653, screenY: 235
};

const dataVariant2Inst1 = {
    ip: '25.244.153.32',
    userAgent: 'Googlebot/2.1 (+http://www.googlebot.com/bot.html)',
    viewedLandingPageAddress: 'landing2.com/all.html',

    availTop: 59, availLeft: 160, availHeight: 24, availWidth: 156, colorDepth: 2, width: 1024, height: 768, top: 2, left: 200, orientation: 'portrait', pixelDepth: 34
};

const dataVariant3Inst1 = {
    ip: '201.44.21.144',
    userAgent: 'Mozilla/4.0 (compatible; MSIE 7.0b; Windows NT 5.1; .NET CLR 1.1.4322; InfoPath.1; .NET CLR 2.0.50727)',
    viewedLandingPageAddress: 'landing1.com/contacts.html',

    outerHeight: 500, outerWidth: 1000, innerWidth: 400, innerHeight: 900, scrollX: 0, scrollY: 20, screenX: 2, screenY: 5, scrollMaxX: 2000, scrollMaxY: 5729
};*/


/*dbConnector.insert(doc, function (err, newDoc) {   // Callback is optional
    // newDoc is the newly inserted document, including its _id
    // newDoc has no key called notToBeSaved since its value was undefined
});

// atomic insertions
dbConnector.insert([{ a: 5 }, { a: 42 }], function (err, newDocs) {
    // Two documents were inserted in the database
    // newDocs is an array with these documents, augmented with their _id
});*/

