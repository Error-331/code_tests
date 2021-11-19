function testFunc1() {
  console.log(this.testProp1);
}

const testObj1 = {
  testProp1: 2,
  testFunc1: testFunc1
};

const testObj2 = {
  testProp1: 3,
  testFunc1: testFunc1
};

testObj1.testFunc1(); // 2
testObj2.testFunc1(); // 3

testObj1.testFunc1.call(testObj2); // 3
testObj2.testFunc1.call(testObj1); // 2


