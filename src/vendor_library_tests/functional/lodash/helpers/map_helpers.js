'use strict';

// external imports

// local imports

// helpers implementation
const convertMapToJSON = (mapToConvert) => {
    const composedObject = {};

    for (const entry of mapToConvert) {
        const [id, value] = entry;

        composedObject[id] = value;
    }

    return composedObject;
};

// export
exports.convertMapToJSON = convertMapToJSON;