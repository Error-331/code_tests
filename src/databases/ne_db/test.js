'use strict';

const Datastore = require('nedb');
const dbConnector = new Datastore({ filename: './db_files/test_db.json', autoload: true });

var doc = { hello: 'world'
    , n: 5
    , today: new Date()
    , nedbIsAwesome: true
    , notthere: null
    , notToBeSaved: undefined  // Will not be saved
    , fruits: [ 'apple', 'orange', 'pear' ]
    , infos: { name: 'nedb' }
};

dbConnector.insert(doc, function (err, newDoc) {   // Callback is optional
    // newDoc is the newly inserted document, including its _id
    // newDoc has no key called notToBeSaved since its value was undefined
});

// atomic insertions
dbConnector.insert([{ a: 5 }, { a: 42 }], function (err, newDocs) {
    // Two documents were inserted in the database
    // newDocs is an array with these documents, augmented with their _id
});

// atomic insertions
// If there is a unique constraint on field 'a', this will fail
dbConnector.insert([{ a: 5 }, { a: 42 }, { a: 5 }], function (err) {
    // err is a 'uniqueViolated' error
    // The database was not modified
});