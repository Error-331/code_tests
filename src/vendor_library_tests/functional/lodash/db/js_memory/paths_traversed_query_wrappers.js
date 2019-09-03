'use strict';

// external imports
const {realpathSync} = require('fs');

// local imports
const {convertMapToJSON} = require('./../../helpers/map_helpers');

// query wrappers implementation
const createPathsTraversedTable = (dbConnection) => {
    dbConnection.pathsTraversedMapLastId = -1;

    dbConnection.pathsTraversedMap = new Map();
    dbConnection.pathsTraversedIndexMap = new Map();

    return Promise.resolve(dbConnection);
};

const dropPathsTraversedTable = (dbConnection) => {
    dbConnection.pathsTraversedMapLastId = null;

    dbConnection.pathsTraversedMap = null;
    dbConnection.pathsTraversedIndexMap = null;

    return Promise.resolve(dbConnection);
};

const insertNewPath = (dbConnection, path) => {
    const relPath = realpathSync(path);
    const composedKey = `${path}_${relPath}`; // UNIQUE(path, rel_path)

    if (dbConnection.pathsTraversedIndexMap.has(composedKey)) {
        return Promise.resolve({
            lastID: dbConnection.pathsTraversedMapLastId
        });
    } else {
        dbConnection.pathsTraversedMapLastId += 1;
        dbConnection.pathsTraversedMap.set(dbConnection.pathsTraversedMapLastId, {
            id: dbConnection.pathsTraversedMapLastId,
            rel_path: relPath,
            path
        });

        dbConnection.pathsTraversedIndexMap.set(composedKey, dbConnection.pathsTraversedMapLastId);

        return Promise.resolve({
            lastID: dbConnection.pathsTraversedMapLastId
        });
    }
};

const selectTraversedPathByPath = (dbConnection, usrPath) => {
    for (const entry of dbConnection.pathsTraversedMap) {
        const {path} = entry[1];

        if (path === usrPath) {
            return Promise.resolve(entry[1]);
        }
    }

    return Promise.resolve(null);
};

const convertTableToJSON = (dbConnection) => {
    const combinedObject = {
        pathsTraversed: convertMapToJSON(dbConnection.pathsTraversedMap)
    };

    return Promise.resolve(combinedObject);
};

// export
exports.createPathsTraversedTable = createPathsTraversedTable;
exports.dropPathsTraversedTable = dropPathsTraversedTable;
exports.insertNewPath = insertNewPath ;
exports.selectTraversedPathByPath = selectTraversedPathByPath;
exports.convertTableToJSON = convertTableToJSON;