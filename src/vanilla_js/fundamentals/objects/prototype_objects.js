'use strict';

// Investigation of object prototype, constructor and other object related stuff.

// mock data
//
// object 1 mock
let mockObject1 = {
    propA: 'propA_Val',
    propB: 'propB_Val',
    propC: 'propC_Val',

    methodA: function() {
        return this.propA;
    },

    methodB: function() {
        return this.propB + '_Mod1';
    },

    methodC: function() {
        return 'preMod1_' + this.propC;
    }
};

// object 2 mock
let mockObject2 = {
    propA: 'propA_Another_Val',
    propD: 'propD_Val',
    propE: 'propE_Val'
};

// object 3 mock (use "mockObject1" prototype)
let mockObject3 = Object.create(mockObject1);

console.log('Overall investigation of the object properties');
console.log('==============================================');

console.log('');

console.log('Initial objects');
console.log('===============');

console.log('');

console.log('"mockObject1"');
console.log('-------------');

console.log('"mockObject1" has own property "propA": ' + mockObject1.hasOwnProperty('propA') + ', value: ' + mockObject1.propA);
console.log('"mockObject1" has own property "propB": ' + mockObject1.hasOwnProperty('propB') + ', value: ' + mockObject1.propB);
console.log('"mockObject1" has own property "propC": ' + mockObject1.hasOwnProperty('propC') + ', value: ' + mockObject1.propC);

console.log('');

console.log('"mockObject1" has own method "methodA": ' + mockObject1.hasOwnProperty('methodA') + ', value: ' + mockObject1.methodA());
console.log('"mockObject1" has own method "methodB": ' + mockObject1.hasOwnProperty('methodB') + ', value: ' + mockObject1.methodB());
console.log('"mockObject1" has own method "methodC": ' + mockObject1.hasOwnProperty('methodC') + ', value: ' + mockObject1.methodC());

console.log('');

console.log('"mockObject2"');
console.log('-------------');

console.log('"mockObject2" has own property "propA": ' + mockObject2.hasOwnProperty('propA') + ', value: ' + mockObject1.propA);
console.log('"mockObject2" has own property "propD": ' + mockObject2.hasOwnProperty('propD') + ', value: ' + mockObject1.propD);
console.log('"mockObject2" has own property "propE": ' + mockObject2.hasOwnProperty('propE') + ', value: ' + mockObject1.propE);

console.log('');

console.log('"mockObject3" (based on "mockObject1" prototype)');
console.log('------------------------------------------------');

console.log('"mockObject3" has own property "propA": ' + mockObject3.hasOwnProperty('propA') + ', value: ' + mockObject3.propA);
console.log('"mockObject3" has own property "propB": ' + mockObject3.hasOwnProperty('propB') + ', value: ' + mockObject3.propB);
console.log('"mockObject3" has own property "propC": ' + mockObject3.hasOwnProperty('propC') + ', value: ' + mockObject3.propC);

console.log('');

console.log('"mockObject3" has own method "methodA": ' + mockObject3.hasOwnProperty('methodA') + ', value: ' + mockObject3.methodA());
console.log('"mockObject3" has own method "methodB": ' + mockObject3.hasOwnProperty('methodB') + ', value: ' + mockObject3.methodB());
console.log('"mockObject3" has own method "methodC": ' + mockObject3.hasOwnProperty('methodC') + ', value: ' + mockObject3.methodC());

console.log('');

console.log('"Object.create()" investigation');
console.log('===============================');

// object 4 mock (use "mockObject1" prototype)
let mockObject4 = Object.create(mockObject1, {
    propI: {value: 'propI_Val'},

    methodA: {value: function() {
        return 'Object4_premod_' + this.propA + '_Object4_postmod';
    }},

    methodI: {value: function(userVal){
        return this.propI + '_' + userVal;
    }}

});

console.log('');

console.log('"mockObject4" (based on "mockObject4" prototype)');
console.log('------------------------------------------------');

console.log('"mockObject4" has own property "propA": ' + mockObject4.hasOwnProperty('propA') + ', value: ' + mockObject4.propA);
console.log('"mockObject4" has own property "propB": ' + mockObject4.hasOwnProperty('propB') + ', value: ' + mockObject4.propB);
console.log('"mockObject4" has own property "propC": ' + mockObject4.hasOwnProperty('propC') + ', value: ' + mockObject4.propC);
console.log('"mockObject4" has own property "propI": ' + mockObject4.hasOwnProperty('propI') + ', value: ' + mockObject4.propI);

console.log('');

console.log('"mockObject4" has own method "methodA": ' + mockObject4.hasOwnProperty('methodA') + ', value: ' + mockObject4.methodA());
console.log('"mockObject4" has own method "methodB": ' + mockObject4.hasOwnProperty('methodB') + ', value: ' + mockObject4.methodB());
console.log('"mockObject4" has own method "methodC": ' + mockObject4.hasOwnProperty('methodC') + ', value: ' + mockObject4.methodC());
console.log('"mockObject4" has own method "methodI": ' + mockObject4.hasOwnProperty('methodI') + ', value: ' + mockObject4.methodI('test_val_1'));

console.log('');

console.log('Object constructor investigation investigation');
console.log('==============================================');

// object constructor 1
function ObjectConstructor1(usrVar1) {
    this.propCA = 'propCA_Val';
    this.propCB = 'propCB_Val';

    this.propVar1 = usrVar1;
}

function ObjectConstructor2(usrVar2) {
    this.propCC = 'propCC_Val';
    this.propCD = 'propCD_Val';

    this.propVar2 = usrVar2;
}

let object1_1 = new ObjectConstructor1('test1');
let object1_2 = new ObjectConstructor2('test2');

ObjectConstructor2.constructor = function() {
    this.propCE = 'propCE_Val';
};

let object2_2_CE = new ObjectConstructor2('test2E');

console.log('');

console.log('"object1_1" (based on "ObjectConstructor1" constructor)');
console.log('-------------------------------------------------------');

console.log('"object1_1" has own property "propCA": ' + object1_1.hasOwnProperty('propCA') + ', value: ' + object1_1.propCA);
console.log('"object1_1" has own property "propCB": ' + object1_1.hasOwnProperty('propCB') + ', value: ' + object1_1.propCB);
console.log('"object1_1" has own property "propVar1": ' + object1_1.hasOwnProperty('propVar1') + ', value: ' + object1_1.propVar1);

console.log('');

console.log('"object1_2" (based on "ObjectConstructor2" constructor)');
console.log('-------------------------------------------------------');

console.log('"object1_2" has own property "propCC": ' + object1_2.hasOwnProperty('propCC') + ', value: ' + object1_2.propCC);
console.log('"object1_2" has own property "propCD": ' + object1_2.hasOwnProperty('propCD') + ', value: ' + object1_2.propCD);
console.log('"object1_2" has own property "propCE": ' + object1_2.hasOwnProperty('propCE') + ', value: ' + object1_2.propCE);
console.log('"object1_2" has own property "propVar2": ' + object1_2.hasOwnProperty('propVar2') + ', value: ' + object1_2.propVar2);

console.log('');

console.log('"object2_2_CE" (based on "ObjectConstructor2" constructor which constructor was set to other function)');
console.log('------------------------------------------------------------------------------------------------------');

console.log('"object2_2_CE" has own property "propCC": ' + object2_2_CE.hasOwnProperty('propCC') + ', value: ' + object2_2_CE.propCC);
console.log('"object2_2_CE" has own property "propCD": ' + object2_2_CE.hasOwnProperty('propCD') + ', value: ' + object2_2_CE.propCD);
console.log('"object2_2_CE" has own property "propCE": ' + object2_2_CE.hasOwnProperty('propCE') + ', value: ' + object2_2_CE.propCE);
console.log('"object2_2_CE" has own property "propVar2": ' + object2_2_CE.hasOwnProperty('propVar2') + ', value: ' + object2_2_CE.propVar2);