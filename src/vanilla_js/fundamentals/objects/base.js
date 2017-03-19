'use strict';

export default async () => {
    let testObj1 = {
        testProp: 1
    };

    // Javascript always passes by value. However, if you pass an object to a function, the "value" is really a reference to that object.
    // We just assign local variable testObj that contains a reference to testObj1 to new reference that points to local object.
    function modFunction1(testObj) {
        testObj = {testProp: 2};
    }

    console.log('Investigation of object basics');
    console.log('===============================');

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
    console.log('--------------------------------------------------------');
    console.log('');
}
