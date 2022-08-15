function testFunc1(testArg1) {
  this.testProp1 = testArg1;
}

const testObj1 = {};
const testObj2 = testFunc1.bind(testObj1);

testObj2(2);
console.log(testObj1.testProp1); // 2

const testObj3 = new testObj2(3);

console.log(testObj1.testProp1); // 2
console.log(testObj3.testProp1); // 3
