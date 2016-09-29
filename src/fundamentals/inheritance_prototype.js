'use strict';

// Investigation of object pure prototype inheritance.

// mock data
//
// class 1 mock
function mockClass1(var1) {
    this.propA = 'propA_Val';
    this.propB = 'propB_Val';
    this.propVar1 = var1;

    this.methodA = function() {
        return this.propA;
    }
}

mockClass1.prototype.testPrototypeProp1 = 'testPrototypeProp1_Val';
mockClass1.prototype.testPrototypeProp2 = 'testPrototypeProp2_Val';

mockClass1.prototype.testPrototypeMethod1 = function() {
    return this.testPrototypeProp1;
};

mockClass1.prototype.testPrototypeMethod2 = function() {
    return 'test_prototype_method_2';
};

// class 2 mock
function mockClass2() {
    this.propC = 'propC_Val';
    this.propD = 'propD_Val';

    this.methodC = function() {
        return this.propC;
    }
}

// class 3 mock
function mockClass3() {
    mockClass1.apply(this, arguments);

    this.propE = 'propE_Val';
}

mockClass3.prototype = new mockClass1();
mockClass3.prototype.constructor = mockClass3;
mockClass3.prototype.parent = mockClass1.prototype;

// class 4 mock
function mockClass4() {
    mockClass3.apply(this, arguments);

    this.propA = 'propA_Val_Ext';
    this.testPrototypeProp1 = 'testPrototypeProp1_Val_Ext';

    this.methodA = function() {
        return this.propA;
    }
}

mockClass4.prototype = new mockClass3();
mockClass4.prototype.constructor = mockClass4;
mockClass4.prototype.parent = mockClass3.prototype;

mockClass4.prototype.testPrototypeProp3 = 'testPrototypeProp3_Val';

// if arrow function - this.parent = undefined, this.constructor = [native code]
mockClass4.prototype.testPrototypeMethod2 = function() {
    return this.parent.testPrototypeMethod2.apply(this, arguments) + '_Ext';
};

// object creation
let mockObject1 = new mockClass1('testval1');
let mockObject2 = new mockClass2();
let mockObject3 = new mockClass3('testval2');
let mockObject4 = new mockClass4('testval4');

console.log('Investigation of object pure prototype inheritance');
console.log('==================================================');

console.log('');

console.log('"mockObject1"');
console.log('-------------');

console.log('"mockObject1" has own property "propA": ' + mockObject1.hasOwnProperty('propA') + ', value: ' + mockObject1.propA);
console.log('"mockObject1" has own property "propB": ' + mockObject1.hasOwnProperty('propB') + ', value: ' + mockObject1.propB);
console.log('"mockObject1" has own property "propVar1": ' + mockObject1.hasOwnProperty('propVar1') + ', value: ' + mockObject1.propVar1);

console.log('');

console.log('"mockObject1" has own property "testPrototypeProp1": ' + mockObject1.hasOwnProperty('testPrototypeProp1') + ', value: ' + mockObject1.testPrototypeProp1);
console.log('"mockObject1" has own property "testPrototypeProp2": ' + mockObject1.hasOwnProperty('testPrototypeProp2') + ', value: ' + mockObject1.testPrototypeProp2);

console.log('');

console.log('"mockObject1" has own method "methodA": ' + mockObject1.hasOwnProperty('methodA') + ', value: ' + mockObject1.methodA());

console.log('');

console.log('"mockObject1" has own method "testPrototypeMethod1": ' + mockObject1.hasOwnProperty('testPrototypeMethod1') + ', value: ' + mockObject1.testPrototypeMethod1());
console.log('"mockObject1" has own method "testPrototypeMethod2": ' + mockObject1.hasOwnProperty('testPrototypeMethod2') + ', value: ' + mockObject1.testPrototypeMethod2());

console.log('');

console.log('"mockObject2"');
console.log('-------------');

console.log('"mockObject2" has own property "propC": ' + mockObject2.hasOwnProperty('propC') + ', value: ' + mockObject2.propC);
console.log('"mockObject2" has own property "propD": ' + mockObject2.hasOwnProperty('propD') + ', value: ' + mockObject2.propD);

console.log('');

console.log('"mockObject2" has own method "methodC": ' + mockObject2.hasOwnProperty('methodC') + ', value: ' + mockObject2.methodC());

console.log('');

console.log('"mockObject3 (extend mockObject1)"');
console.log('----------------------------------');

console.log('"mockObject3" has own property "propA": ' + mockObject3.hasOwnProperty('propA') + ', value: ' + mockObject3.propA);
console.log('"mockObject3" has own property "propB": ' + mockObject3.hasOwnProperty('propB') + ', value: ' + mockObject3.propB);
console.log('"mockObject3" has own property "propVar1": ' + mockObject3.hasOwnProperty('propVar1') + ', value: ' + mockObject3.propVar1);

console.log('');

console.log('"mockObject3" has own property "propE": ' + mockObject3.hasOwnProperty('propE') + ', value: ' + mockObject3.propE);

console.log('');

console.log('"mockObject3" has own property "testPrototypeProp1": ' + mockObject3.hasOwnProperty('testPrototypeProp1') + ', value: ' + mockObject3.testPrototypeProp1);
console.log('"mockObject3" has own property "testPrototypeProp2": ' + mockObject3.hasOwnProperty('testPrototypeProp2') + ', value: ' + mockObject3.testPrototypeProp2);

console.log('');

console.log('"mockObject4 (extend mockObject3)"');
console.log('----------------------------------');

console.log('"mockObject4" has own property "propA": ' + mockObject4.hasOwnProperty('propA') + ', value: ' + mockObject4.propA);
console.log('"mockObject4" has own property "propB": ' + mockObject4.hasOwnProperty('propB') + ', value: ' + mockObject4.propB);
console.log('"mockObject4" has own property "propVar1": ' + mockObject4.hasOwnProperty('propVar1') + ', value: ' + mockObject4.propVar1);

console.log('');

console.log('"mockObject4" has own property "testPrototypeProp1": ' + mockObject4.hasOwnProperty('testPrototypeProp1') + ', value: ' + mockObject4.testPrototypeProp1);
console.log('"mockObject4" has own property "testPrototypeProp2": ' + mockObject4.hasOwnProperty('testPrototypeProp2') + ', value: ' + mockObject4.testPrototypeProp2);

console.log('');

console.log('"mockObject4" has own property "testPrototypeProp3": ' + mockObject4.hasOwnProperty('testPrototypeProp3') + ', value: ' + mockObject4.testPrototypeProp3);

console.log('');

console.log('"mockObject4" has own method "methodA": ' + mockObject4.hasOwnProperty('methodA') + ', value: ' + mockObject4.methodA());

console.log('');

console.log('"mockObject4" has own method "testPrototypeMethod1": ' + mockObject4.hasOwnProperty('testPrototypeMethod1') + ', value: ' + mockObject4.testPrototypeMethod1());
console.log('"mockObject4" has own method "testPrototypeMethod2": ' + mockObject4.hasOwnProperty('testPrototypeMethod2') + ', value: ' + mockObject4.testPrototypeMethod2());

console.log('');