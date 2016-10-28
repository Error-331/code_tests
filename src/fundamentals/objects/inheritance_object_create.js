'use strict';

// Investigation of object inheritance using Object.create() method.

// mock data
//
// object 1 mock
let mockObject1 = {
    propA: 'propA_Val',
    propB: 'propB_Val',

    methodA: function() {
        return this.propA;
    }
}

// object 2 mock
let mockObject2 = Object.create(mockObject1);

mockObject2.propC = 'propC_Val';
mockObject2.methodC = function() {
    return this.propC;
};

// object 3 mock
let mockObject3 = Object.create(mockObject2);

mockObject3.propA = 'propA_Val_Ext';
mockObject3.methodC = function() {
    return this.propC + '_Method_Ext';
};

console.log('Investigation of object inheritance using Object.create() method');
console.log('================================================================');

console.log('');

console.log('"mockObject1"');
console.log('-------------');

console.log('"mockObject1" has own property "propA": ' + mockObject1.hasOwnProperty('propA') + ', value: ' + mockObject1.propA);
console.log('"mockObject1" has own property "propB": ' + mockObject1.hasOwnProperty('propB') + ', value: ' + mockObject1.propB);

console.log('');

console.log('"mockObject1" has own method "methodA": ' + mockObject1.hasOwnProperty('methodA') + ', value: ' + mockObject1.methodA());

console.log('');

console.log('"mockObject2"');
console.log('-------------');

console.log('"mockObject2" has own property "propA": ' + mockObject2.hasOwnProperty('propA') + ', value: ' + mockObject2.propA);
console.log('"mockObject2" has own property "propB": ' + mockObject2.hasOwnProperty('propB') + ', value: ' + mockObject2.propB);
console.log('"mockObject2" has own property "propC": ' + mockObject2.hasOwnProperty('propC') + ', value: ' + mockObject2.propC);

console.log('');

console.log('"mockObject2" has own method "methodA": ' + mockObject2.hasOwnProperty('methodA') + ', value: ' + mockObject2.methodA());
console.log('"mockObject2" has own method "methodC": ' + mockObject2.hasOwnProperty('methodC') + ', value: ' + mockObject2.methodC());

console.log('');

console.log('"mockObject3"');
console.log('-------------');

console.log('"mockObject3" has own property "propA": ' + mockObject3.hasOwnProperty('propA') + ', value: ' + mockObject3.propA);
console.log('"mockObject3" has own property "propB": ' + mockObject3.hasOwnProperty('propB') + ', value: ' + mockObject3.propB);
console.log('"mockObject3" has own property "propC": ' + mockObject3.hasOwnProperty('propC') + ', value: ' + mockObject3.propC);

console.log('');

console.log('"mockObject3" has own method "methodA": ' + mockObject3.hasOwnProperty('methodA') + ', value: ' + mockObject3.methodA());
console.log('"mockObject3" has own method "methodC": ' + mockObject3.hasOwnProperty('methodC') + ', value: ' + mockObject3.methodC());
