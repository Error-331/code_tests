// should be runned in browser
// should run fine
var testFuncCallCount = 0;

function testFunc1(testVar1) {
    console.log(`testFunc1: ${testVar1}`);
    this.testFuncCallCount += 1;
}

for (let cnt1 = 0; cnt1 < 10; cnt1++) {
    if (cnt1 > 5) {
        testFunc1( cnt1 );
    }
}

console.log(this.testFuncCallCount); // 4