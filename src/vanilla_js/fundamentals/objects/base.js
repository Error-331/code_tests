'use strict';

// http://www.benmvp.com/learning-es6-enhanced-object-literals/

export default async () => {
    let testObj1 = {
        testProp: 1
    };

    // Javascript always passes by value. However, if you pass an object to a function, the "value" is really a reference to that object.
    // We just assign local variable testObj that contains a reference to testObj1 to new reference that points to local object.
    function modFunction1(testObj) {
        testObj = {testProp: 2};
    }

    function testClass1() {
        this.testProp1 = 'test_prop1_val1';
    }

    testClass1.testStaticProp1 = 'test_static_prop_val1';

    testClass1.testStaticMethod1 = function() {
        console.log('this.testProp1 -', this.testProp1);
        console.log('this.testStaticProp1 -', this.testStaticProp1);
    };

    function testClass2() {
        this.testProp1 = 'test_prop1_val1';
    }

    testClass2.testStaticProp1 = 'test_static_prop_val1';

    testClass2.testStaticMethod1 = function() {
        console.log('this.testProp1 -', this.testProp1);
        console.log('this.testStaticProp1 -', this.testStaticProp1);
    };

    testClass2.prototype.testStaticProp1 = 'test_prop_val1';

    function createObjectFunction1(prop1Prefix, prop2Postfix, newProp, newMethod) {
        return {
            testProp1: 'test_prop1_val1',
            [prop1Prefix + '_test_prop2']: 'test_prop2_val1',
            ['test_prop3_' + prop2Postfix]: 'test_prop3_val1',

            newProp,

            getTestProp1() {
                return this.testProp1;
            },

            [newMethod](postfix) {
                return 'some_val_' + postfix
            },

            get testProp1Mod() {
                return this.testProp1 + '_mod';
            },

            set testProp1Mod(newValue) {
                this.testProp1 = 'new_prefix_' + newValue;
            },

            /*  set ['newProp'](newValue) {
                this['newProp'] = 'test_prefix_' + newValue + '_test_postfix';
            }*/
        }
    }

    console.log('Investigation of object basics');
    console.log('==============================');

    console.log('');

    console.log('Pass object to function that assigns the reference to new object');
    console.log('----------------------------------------------------------------');

    console.log('');

    console.log('Before', testObj1);
    modFunction1(testObj1);
    console.log('After', testObj1);

    console.log('');
    console.log('ES6 object creation');
    console.log('-------------------');
    console.log('');

    let testObject2Prop1 = 2;
    let testObject2Prop2 = 'test_prop';
    let testObject2Prop3 = {
        testObject2Prop3SubProp1: 4
    };

    let testObject2 = {testObject2Prop1, testObject2Prop2, testObject2Prop3};
    console.log(testObject2);

    console.log('');
    console.log('Object(class) static prop/method');
    console.log('--------------------------------');
    console.log('');

    const testObject3 = new testClass1();

    console.log('testObject3.testStaticProp1  -', testObject3.testStaticProp1 );
    console.log('testClass1.testStaticProp1  -', testClass1.testStaticProp1 );

    console.log('');

    console.log('testObject3.testStaticMethod1 -', testObject3.testStaticMethod1);
    console.log('testClass1.testStaticProp1  -', testClass1.testStaticMethod1);

    console.log('');
    console.log('testClass1.testStaticMethod1():');
    console.log('');

    testClass1.testStaticMethod1();

    console.log('');
    console.log('');

    const testObject4 = new testClass2();

    console.log('testObject4.testStaticProp1  -', testObject4.testStaticProp1 );
    console.log('testClass2.testStaticProp1  -', testClass2.testStaticProp1 );

    console.log('');

    console.log('testObject4.testStaticMethod1 -', testObject4.testStaticMethod1);
    console.log('testClass2.testStaticProp1  -', testClass2.testStaticMethod1);

    console.log('');
    console.log('testClass2.testStaticMethod1():');
    console.log('');

    testClass2.testStaticMethod1();

    console.log('');
    console.log('createObjectFunction1("prefix11", "postfix22"):');
    console.log('');
    console.log(createObjectFunction1('prefix11', 'postfix22', 'new_prop4_val1', 'testUserMethod1'));

    console.log('');

    let testObject5 = createObjectFunction1('prefix11', 'postfix22', 'new_prop4_val1', 'testUserMethod1');
    testObject5.testProp1Mod = 'test_propM_val1';
    testObject5.newProp = 'new_prop4_val2';

    console.log('');
    console.log('testObject4.testProp1Mod:', testObject5.testProp1Mod);
    console.log('testObject5.testUserMethod1("user_postfix1"):', testObject5.testUserMethod1('user_postfix1'));
    console.log(testObject5.newProp);


    console.log('');
    console.log('--------------------------------------------------------');
    console.log('');
}
