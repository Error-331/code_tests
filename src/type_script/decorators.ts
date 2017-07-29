'use strict';

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
    }

    function MethodDecorator1(prototype, propertyKey, descriptor) {
        let result = prototype[propertyKey]();
        descriptor.value = () => {return result + '_static'};
        return descriptor;
    }

    function MethodDecorator2(prototype, propertyKey, descriptor) {
        let originalFunc = descriptor.value;

        descriptor.value = function(intToMult) {
            return originalFunc.call(this, intToMult) + 5;
        };

        return descriptor;
    }

    function MethodDecorator3(suffix: string) {
        return function(prototype, propertyKey, descriptor) {
            let result = prototype[propertyKey]();
            descriptor.value = () => {return result + suffix};
            return descriptor;
        }
    }

    function MethodDecorator4(newValue: string) {
        return function(prototype, propertyKey, descriptor) {
            descriptor.get = function() {
                return newValue;
            }
        }
    }

    // class mock definition
    @classDecorator1
    @classDecorator2
    class testClass1 {
        public testProp1: string;
        public testProp2: string;
        public testProp3: string;

        protected _testProp4: string;

        constructor() {
            this.testProp1 = 'test_prop1_val1';
            this.testProp2 = 'test_prop2_val1';
            this.testProp3 = 'test_prop3_val1';

            this._testProp4 = 'test_prop4_val1'
        }

        @MethodDecorator1
        testMethod1() {
            return 'test_val_1'
        }

        @MethodDecorator2
        testMethod2(intToMult) {
            return intToMult * 2;
        }

        @MethodDecorator3('_decorated')
        testMethod3() {
            return 'test_val_3';
        }

        @MethodDecorator4('new_test_prop4_val1')
        get testProp4() {
            return this._testProp4;
        }
    }

    console.log('TypeScript decorators examples');
    console.log('==============================');
    console.log('');

    const testObj1 = new testClass1();

    console.log('testObj1.testProp1 -', testObj1.testProp1);
    console.log('testObj1.testProp2 -', testObj1.testProp2);
    console.log('testObj1.testProp3 -', testObj1.testProp3);

    console.log('');

    console.log('testObj1.testMethod1() -', testObj1.testMethod1());
    console.log('testObj1.testMethod2(5) -', testObj1.testMethod2(5));
    console.log('testObj1.testMethod3() -', testObj1.testMethod3());

    console.log('');

    console.log('testObj1.testProp4 -', testObj1.testProp4);

    console.log('');
    console.log('--------------------------------------------------------');
    console.log('');
}
