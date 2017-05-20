console.log('Hoisting in non strict mode');
console.log('===========================');
console.log('');

function testFunction1() {
    testVariable1 = 'test_variable1_val_1';
}

testFunction1();

console.log('Instantiated but not declared variable inside a function is hoisted as global variable:', testVariable1);

console.log('');
console.log('--------------------------------------------------------');
console.log('');

