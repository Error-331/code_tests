'use strict';

export default async () => {
    class TestClass1 {
        publicProperty1 = '';
        publicProperty2 = '';
        publicProperty3 = 0;

        #privateProperty4 = 0;

        constructor(prop1, prop2, prop3, prop4) {
            this.publicProperty1 = prop1;
            this.publicProperty2 = `property2_val_${prop2}`;
            this.publicProperty3 = 10 + prop3;

            this.#privateProperty4 = prop4;
        }

        static sum(arg1, arg2) {
            return arg1 + arg2;
        }

        get prop1() {
            return `mod_${this.publicProperty1}`;
        }

        get privateProp4() {
            return this.#privateProperty4;
        }
    }

    class TestClass2 extends TestClass1 {
        constructor(prop1, prop2, prop3, prop4) {
            super(prop1, prop2, prop3, prop4);
        }
    }

    console.log('Classes examples');
    console.log('================');
    console.log('');

    const testObj1 = new TestClass1('val1', 'vp2', 20, 25);

    console.log('testObj1.property1 =', testObj1.publicProperty1);
    console.log('testObj1.property2 =', testObj1.publicProperty2);
    console.log('testObj1.property3 =', testObj1.publicProperty3);

    console.log('');

    console.log('testObj1.privateProp4 =', testObj1.privateProp4);
    console.log('testObj1.prop1 =', testObj1.prop1);

    console.log('');

    console.log('TestClass1.sum(1, 20) =', TestClass1.sum(1, 20));

    console.log('');

    const testObj2 = new TestClass2('val2', 'vp3', 33, 51);

    console.log('testObj2.property1 =', testObj2.publicProperty1);
    console.log('testObj2.property2 =', testObj2.publicProperty2);
    console.log('testObj2.property3 =', testObj2.publicProperty3);

    console.log('');

    console.log('testObj2.privateProp4 =', testObj1.privateProp4);
    console.log('testObj2.prop1 =', testObj2.prop1);

    console.log('');
    console.log('--------------------------------------------------------');
    console.log('');
}