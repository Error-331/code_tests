function testFunc1(param1, param2) {
    this.prop1 = param1 + param2;
}

const testFunc2 = testFunc1.bind(null, 'test_val1');

const testObj1 = new testFunc2('_test_val2');
console.log(testObj1.prop1); // test_val1_test_val2
