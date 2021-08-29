const testParent1 = {
    testProp1: 'test_prop1_val1',
    testProp2: 'test_prop2_val1',
}

const testChild2Const = function() {};
testChild2Const.prototype = testParent1;
const testChild1 = new testChild2Const();

testChild1.testProp1 = 'child_new_prop1_val1';
testChild1.testProp2 = 'child_new_prop2_val1';
testChild1.testProp3 = 'child_new_prop3_val1';
testChild1.testProp4 = 'child_new_prop4_val1';

console.log('testParent1');
console.log(testParent1.testProp1);
console.log(testParent1.testProp2);
console.log(testParent1.testProp3);
console.log(testParent1.testProp4);

console.log('');

console.log('tesChild1');
console.log(testChild1.testProp1);
console.log(testChild1.testProp2);
console.log(testChild1.testProp3);
console.log(testChild1.testProp4);

console.log('');

delete testChild1.testProp1;
delete testChild1.testProp2;
delete testChild1.testProp3;
delete testChild1.testProp4;
delete testChild1.testProp5;

console.log('testParent1');
console.log(testParent1.testProp1);
console.log(testParent1.testProp2);
console.log(testParent1.testProp3);
console.log(testParent1.testProp4);

console.log('');

console.log('tesChild1');
console.log(testChild1.testProp1);
console.log(testChild1.testProp2);
console.log(testChild1.testProp3);
console.log(testChild1.testProp4);

console.log('');

console.log('testParent1 (props status)');
console.log(testParent1.hasOwnProperty('testProp1'));
console.log(testParent1.hasOwnProperty('testProp2'));
console.log(testParent1.hasOwnProperty('testProp3'));
console.log(testParent1.hasOwnProperty('testProp4'));

console.log('');

console.log('tesChild1 (props status)');
console.log(testChild1.hasOwnProperty('testProp1'));
console.log(testChild1.hasOwnProperty('testProp2'));
console.log(testChild1.hasOwnProperty('testProp3'));
console.log(testChild1.hasOwnProperty('testProp4'));

