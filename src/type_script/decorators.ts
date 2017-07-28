'use strict';





// method testing
//console.log(testObj.testMethod1()); // returns 'test_val_1_static' instead of 'test_val_1'
//console.log(testObj.testMethod2(2)); // returns 9
//https://www.typescriptlang.org/docs/handbook/decorators.html#class-decorators

export default () => {
    // decorators definition
    function classDecorator1<T extends {new(...args:any[]):{}}>(constructor:T) {
        return class extends constructor {
            testProp2 = 'test_prop_val2';
            testProp3 = 'test_prop_val3';
        }
    }

    function classDecorator2(constructor: Function) {
        Object.seal(constructor);
        Object.seal(constructor.prototype);

        console.log(Object.isSealed(constructor));
        console.log(Object.isSealed(constructor.prototype));
    }

    function classDecorator3(constructor: Function) {
        console.log(Object.isSealed(constructor));
        console.log(Object.isSealed(constructor.prototype));
    }

    // class mock definition
    @classDecorator1
    @classDecorator2
    @classDecorator3
    class testClass1 {
        public testProp1: string;
        public testProp2: string;
        public testProp3: string;

        constructor() {
            this.testProp1 = 'test_prop1_val1';
            this.testProp2 = 'test_prop2_val1';
            this.testProp3 = 'test_prop3_val1';
        }

       // @TestDecorator1
        testMethod1() {
            return 'test_val_1'
        }

        //@TestDecorator2
        testMethod2(intToMult) {
            return intToMult * 2;
        }
    }


    /*function TestDecorator1(target, propertyKey, descriptor) {
        let result = target[propertyKey]();
        descriptor.value = () => {return result + '_static'}
        return descriptor;
    }

    function TestDecorator2(target, propertyKey, descriptor) {
        let originalFunc = descriptor.value;

        descriptor.value = function(intToMult) {

            console.log(originalFunc);
            return originalFunc.call(this, intToMult) + 5;
        };

        return descriptor;
    }*/

    console.log('TypeScript decorators examples');
    console.log('==============================');
    console.log('');

    const testObj1 = new testClass1();

    console.log(testObj1.testProp1);
    console.log(testObj1.testProp2);
    console.log(testObj1.testProp3);

    console.log(Object.isSealed(testClass1.constructor));

    console.log('');
    console.log('--------------------------------------------------------');
    console.log('');
}
