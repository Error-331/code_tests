function TestConstructor1(){
  this.testProp1 = 5;

  return () => {
    console.log('This (inside arrow function):', this)
    console.log('testProp1 (inside arrow function):', this.testProp1)

    console.log('');

    return this;
  }
}

TestConstructor1.prototype.testProtoProp1 = 'test_proto_val1';

const testObj1 = new TestConstructor1();
testObj1();

console.log('');

console.log('testProp1 (object method)', testObj1.testProp1);
console.log('testProtoProp1 (object method)', testObj1.testProtoProp1);

console.log('');

console.log('testProp1 (object executed method)', testObj1().testProp1);
console.log('testProtoProp1 (object executed method)', testObj1().testProtoProp1);

console.log('');

testObj1().testProp1 = 7;
testObj1().testProtoProp1 = 'new val';

console.log('testProp1 (object executed method, prop update)', testObj1().testProp1)
console.log('testProtoProp1 (object executed method, prop update)', testObj1().testProtoProp1)

console.log('------');

// everything new here - no anomalies
const testObj2 = new TestConstructor1();
testObj2();

console.log(testObj2().testProtoProp1);


