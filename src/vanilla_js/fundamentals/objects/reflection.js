'use strict';

export default async () => {

    let testObject1 = {
        testProp1: 'testProp1_value',
        testProp2: 'testProp2_value'
    };

    let testObject2 = {
        testProp1: 'testProp1_value',
        testProp2: 'testProp2_value',
        testProp3: 'testProp3_value',
    };

    function reflectionFunction1(testProp1, testProp2) {
        return this.testProp1 + testProp1 + testProp2;
    }

    function reflectionConstructor1(testProp1, testProp2) {
        this.testProp1 = testProp1;
        this.testProp2 = testProp2;
    }

    class TestClass1 {
        testProp1 = null;
        testProp2 = null;
        testProp3 = 'testProp3_value';

        constructor() {
        }
    }

    class TestClass2 extends TestClass1{
        testProp1Class1 = 'testProp1_value_class2';

        constructor() {
            super();

            this.testProp1 = 'testProp1_value';
            this.testProp2 = 'testProp2_value';
        }
    }

    TestClass1.constructor.prototype.testProp4 = 'testProp4_value';
    Object.preventExtensions(TestClass2);

    function TestClass3() {
    }

    TestClass3.prototype.testPrototypeProp1 = 'testPrototypeProp1_Val';
    TestClass3.prototype.testPrototypeProp2 = 'testPrototypeProp2_Val';

    function TestClass4() {
    }

    TestClass4.prototype.testPrototypeProp3 = 'testPrototypeProp3_Val';
    TestClass4.prototype.testPrototypeProp4 = 'testPrototypeProp4_Val';

    console.log('Investigation of object reflection');
    console.log('==================================');
    console.log('');

    console.log('Result of Reflection.apply:', Reflect.apply(reflectionFunction1, testObject1, ['_add1', '_add2']));
    console.log('');

    let testObj1 = new TestClass1();
    let testObj2 = Reflect.construct(reflectionConstructor1, ['testProp1_value', 'testProp1_value'], TestClass1.constructor);

    console.log('Test values of object created by own constructor:', testObj1.testProp1, testObj1.testProp2, testObj1.testProp3, testObj1.testProp4);
    console.log('Test values of object created by reflected constructor:', testObj2.testProp1, testObj2.testProp2, testObj2.testProp3, testObj2.testProp4);
    console.log('');

    let testObj3 = new TestClass1();
    Reflect.defineProperty(testObj3, 'testProp5', {value: 'testPro5_value'});
    Reflect.deleteProperty(testObj3, 'testProp3');

    console.log('New property value created by Reflect.defineProperty(): ', testObj3.testProp5);
    console.log('Resulting object after Reflect.deleteProperty(): ', testObj3);
    console.log('');

    let testObj4 = new TestClass2();
    let objPropsIterator1 = Reflect.enumerate(testObj4);

    console.log('Enumerated object properties:', objPropsIterator1.next().value, objPropsIterator1.next().value, objPropsIterator1.next().value, objPropsIterator1.next().value);
    console.log('');

    Reflect.deleteProperty(testObject2, 'testProp2');

    console.log('Object after one of its properties were deleted by Reflect.deleteProperty() method:', testObject2);
    console.log('');

    let testObj5 = new TestClass2();

    Reflect.defineProperty(testObj5, 'testProp1Class1Getter', {
        get: function(){
            return this.testProp1Class1;
        }
    });

    console.log('Example usage of Reflect.get() on accessor method of an object:', Reflect.get(testObj5, 'testProp1Class1Getter', {testProp1Class1: 'new test value 1'}));
    console.log('');

    let testObj6 = new TestClass2();

    Reflect.defineProperty(testObj6, 'testProp1Class1Setter', {
        set: function(testPropVal){
            this.testProp1Class1 = testPropVal;
        }
    });

    let testObj7 = {testProp1Class1: 'new test value 1'};
    Reflect.set(testObj6, 'testProp1Class1Setter', 'new test value 2', testObj7);

    console.log('Example usage of Reflect.set() on setter method of an object:', Reflect.get(testObj7, 'testProp1Class1'));
    console.log('');

    let propertyDescriptor1 = Reflect.getOwnPropertyDescriptor(testObj7, 'testProp1Class1');

    console.log('Property descriptor 1 (testProp1Class)');
    console.log('');

    console.log('Value:', propertyDescriptor1.value);
    console.log('Writable:', propertyDescriptor1.writable);
    console.log('Enumerable:', propertyDescriptor1.enumerable);
    console.log('Configurable:', propertyDescriptor1.configurable);

    console.log('');

    let testObj8 = new TestClass3();

    console.log('Demonstration of Reflect.getPrototypeOf() method:', Reflect.getPrototypeOf(testObj8));
    console.log('');

    let testObj9 = new TestClass4();
    Reflect.setPrototypeOf(testObj9, testObj8);

    console.log('Object values after its prototype was replaced using Reflect.setPrototypeOf():', `testPrototypeProp1 - ${testObj9.testPrototypeProp1}, testPrototypeProp2 - ${testObj9.testPrototypeProp2}`);
    console.log('');

    console.log('Output of Reflect.has() for "testProp3" which is inherited property:', Reflect.has(testObj4, 'testProp3'));
    console.log('');

    console.log('Is "TestClass1" extensible:', Reflect.isExtensible(TestClass1));
    console.log('Is "TestClass2" extensible:', Reflect.isExtensible(TestClass2));

    console.log('');

    console.log('"TestClass2" own keys:', Reflect.ownKeys(testObj4));

    console.log('');
    console.log('--------------------------------------------------------');
    console.log('');
}