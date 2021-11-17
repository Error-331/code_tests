// should be runned in browser
function testFunc1() {
    console.log('testVar1:', this.testVar1);
}

var testVar1 = 'test_val1';

testFunc1.call(null);
