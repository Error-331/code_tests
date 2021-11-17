// should be runned in browser
function testFunc1() {
    console.log('testVar1:', this.testVar1);
}

var testVar1 = 'test_val1';

var testObj1 = { testVar1: 'test_val2', testFunc1: testFunc1 };
var testObj2 = { testVar1: 'test_val3' };

testObj1.testFunc1(); // 'test_val2'

(testObj2.testFunc1 = testObj1.testFunc1)(); // 'test_val1'
