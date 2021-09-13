function testFunc1() {
    console.log(this.testProp1);
}

var testObject2 = {
    testProp1: 'test_prop1_val2',
    testFunc1: testFunc1
};

var testObject1 = {
    testProp1: 'test_prop1_val1',
    testObject2: testObject2
};

var testProp1 = 'test_global_var1';

testObject1.testObject2.testFunc1();