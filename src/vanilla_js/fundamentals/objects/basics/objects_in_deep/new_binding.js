// By calling new testFunc1(..), we’ve constructed a new object and set that new object as the this for the call of testFunc1(..).

function testFunc1(testProp1) {
  this.testProp1 = testProp1;
}

const testObject1 = new testFunc1(2);
console.log(testObject1.testProp1); // 2
