'use strict';

export default async () => {
    const mockObject1 = {
        propA: 'propA_Val',
        propB: 'propB_Val',

        methodA: function() {
            return this.propA;
        }
    };

    const mockObject2 = Object.create(mockObject1);

    mockObject2.propC = 'propC_Val';
    mockObject2.methodC = function() {
        return this.propC;
    };

    console.log('Examples that show how to check if a given object contains specific property');
    console.log('============================================================================');
    console.log('');

    console.log('Simple check using "[] === undefined":');

    console.log('mockObject1["propA"] === undefined -', mockObject1['propA'] === undefined);
    console.log('mockObject1["propB"] === undefined -', mockObject1['propB'] === undefined);
    console.log('mockObject1["methodA"] === undefined -', mockObject1['methodA'] === undefined);

    console.log('');

    console.log('mockObject1["propC"] === undefined -', mockObject1['propC'] === undefined);
    console.log('mockObject1["methodC"] === undefined -', mockObject1['methodC'] === undefined);

    console.log('');

    console.log('mockObject2["propA"] === undefined -', mockObject2['propA'] === undefined);
    console.log('mockObject2["propB"] === undefined -', mockObject2['propB'] === undefined);
    console.log('mockObject2["methodA"] === undefined -', mockObject2['methodA'] === undefined);

    console.log('');

    console.log('mockObject2["propC"] === undefined -', mockObject2['propC'] === undefined);
    console.log('mockObject2["methodC"] === undefined -', mockObject2['methodC'] === undefined);

    console.log('');
    console.log('Object.hasOwnProperty() examples:');
    console.log('');

    console.log('mockObject1.hasOwnProperty("propA") -', mockObject1.hasOwnProperty('propA'));
    console.log('mockObject1.hasOwnProperty("propB") -', mockObject1.hasOwnProperty('propB'));
    console.log('mockObject1.hasOwnProperty("methodA") -', mockObject1.hasOwnProperty('methodA'));

    console.log('');

    console.log('mockObject1.hasOwnProperty("propC") -', mockObject1.hasOwnProperty('propC'));
    console.log('mockObject1.hasOwnProperty("methodC") -', mockObject1.hasOwnProperty('methodC'));

    console.log('');

    console.log('mockObject2.hasOwnProperty("propA") -', mockObject2.hasOwnProperty('propA'));
    console.log('mockObject2.hasOwnProperty("propB") -', mockObject2.hasOwnProperty('propB'));
    console.log('mockObject2.hasOwnProperty("methodA") -', mockObject2.hasOwnProperty('methodA'));

    console.log('');

    console.log('mockObject2.hasOwnProperty("propC") -', mockObject2.hasOwnProperty('propC'));
    console.log('mockObject2.hasOwnProperty("methodC") -', mockObject2.hasOwnProperty('methodC'));

    console.log('');
    console.log('Object.keys() examples:');
    console.log('');

    console.log('Object.keys(mockObject1) -', Object.keys(mockObject1));
    console.log('Object.keys(mockObject2) -', Object.keys(mockObject2));

    console.log('');

    console.log('Object.keys(mockObject1).indexOf("propA") !== -1 -', Object.keys(mockObject1).indexOf('propA') !== -1);
    console.log('Object.keys(mockObject1).indexOf("propC") !== -1 -', Object.keys(mockObject1).indexOf('propC') !== -1);

    console.log('');

    console.log('Object.keys(mockObject2).indexOf("propA") !== -1 -', Object.keys(mockObject2).indexOf('propA') !== -1);
    console.log('Object.keys(mockObject2).indexOf("propC") !== -1 -', Object.keys(mockObject2).indexOf('propC') !== -1);

    console.log('');
    console.log('Object.getOwnPropertyNames() examples:');
    console.log('');

    console.log('Object.getOwnPropertyNames(mockObject1) -', Object.getOwnPropertyNames(mockObject1));
    console.log('Object.getOwnPropertyNames(mockObject2) -', Object.getOwnPropertyNames(mockObject2));

    console.log('');

    console.log('Object.getOwnPropertyNames(mockObject1).indexOf("propA") !== -1 -', Object.getOwnPropertyNames(mockObject1).indexOf('propA') !== -1);
    console.log('Object.getOwnPropertyNames(mockObject1).indexOf("propC") !== -1 -', Object.getOwnPropertyNames(mockObject1).indexOf('propC') !== -1);

    console.log('');

    console.log('Object.getOwnPropertyNames(mockObject2).indexOf("propA") !== -1 -', Object.getOwnPropertyNames(mockObject2).indexOf('propA') !== -1);
    console.log('Object.getOwnPropertyNames(mockObject2).indexOf("propC") !== -1 -', Object.getOwnPropertyNames(mockObject2).indexOf('propC') !== -1);

    console.log('');
    console.log('Object.entries() examples:');
    console.log('');

    console.log('Object.entries(mockObject1) -', Object.entries(mockObject1));
    console.log('');
    console.log('Object.entries(mockObject2) -', Object.entries(mockObject2));

    console.log('');

    console.log('Object.entries(mockObject1).find(entry => entry[0] === "propA") !== undefined -', Object.entries(mockObject1).find(entry => entry[0] === 'propA') !== undefined);
    console.log('Object.entries(mockObject1).find(entry => entry[0] === "propC") !== undefined -', Object.entries(mockObject1).find(entry => entry[0] === 'propC') !== undefined);

    console.log('');

    console.log('Object.entries(mockObject2).find(entry => entry[0] === "propA") !== undefined -', Object.entries(mockObject2).find(entry => entry[0] === 'propA') !== undefined);
    console.log('Object.entries(mockObject2).find(entry => entry[0] === "propC") !== undefined -', Object.entries(mockObject2).find(entry => entry[0] === 'propC') !== undefined);

    console.log('');

    console.log('');
    console.log('"in" operator examples:');
    console.log('');

    console.log('"propA" in mockObject1 -', 'propA' in mockObject1);
    console.log('"propB" in mockObject1 -', 'propB' in mockObject1);
    console.log('"methodA" in mockObject1 -', 'methodA' in mockObject1);

    console.log('');

    console.log('"propC" in mockObject1 -', 'propC' in mockObject1);
    console.log('"methodC" in mockObject1 -', 'methodC' in mockObject1);

    console.log('');

    console.log('"propA" in mockObject2 -', 'propA' in mockObject2);
    console.log('"propB" in mockObject2 -', 'propB' in mockObject2);
    console.log('"methodA" in mockObject2 -', 'methodA' in mockObject2);

    console.log('');

    console.log('"propC" in mockObject2 -', 'propC' in mockObject2);
    console.log('"methodC" in mockObject2 -', 'methodC' in mockObject2);

    console.log('');
    console.log('"for in" loop examples:');
    console.log('');

    console.log('"mockObject1" props:');
    console.log('');

    for (const prop in mockObject1) {
        console.log(prop);
    }

    console.log('');
    console.log('"mockObject2" props:');
    console.log('');

    for (const prop in mockObject2) {
        console.log(prop);
    }

    console.log('');
    console.log('"for of" loop examples:');
    console.log('');


    console.log('');
    console.log('--------------------------------------------------------');
    console.log('');
}