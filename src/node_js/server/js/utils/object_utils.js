'use strict';

const isRegularObject = objectToTest => typeof objectToTest === 'object' && objectToTest !== null;

const cloneDeep = (objectToClone) => {
    const newObject = Array.isArray(objectToClone) ? objectToClone.slice() : Object.assign({}, objectToClone);

    for (const objectProperty in newObject) {
        if (newObject.hasOwnProperty(objectProperty)) {
            const propertyValue = newObject[objectProperty];

            if (Array.isArray(propertyValue) || isRegularObject(propertyValue)) {
                if (propertyValue instanceof RegExp) {
                    newObject[objectProperty] = propertyValue;
                } else {
                    newObject[objectProperty] = cloneDeep(propertyValue);
                }
            }
        }
    }

    return newObject;
};

module.exports.cloneDeep = cloneDeep;