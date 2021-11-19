function testFunc1(something) {
  this.testProp1 = something;
}

const testObj1 = {
  testFunc1: testFunc1
};

const testObj2 = {};

testObj1.testFunc1(2);
console.log(testObj1.testProp1); // 2

testObj1.testFunc1.call(testObj2, 3);
console.log(testObj2.testProp1); // 3

const testVar1 = new testObj1.testFunc1(4);
console.log(testObj1.testProp1); // 2
console.log(testVar1.testProp1); // 4
