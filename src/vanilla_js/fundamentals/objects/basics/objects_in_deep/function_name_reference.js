// should run fine
function testFunc1(testVar1) {
    console.log(`testFunc1: ${testVar1}`);

    if (!testFunc1.testFuncCallCount) {
        testFunc1.testFuncCallCount = 0;
    }

    testFunc1.testFuncCallCount += 1;
}

for (let cnt1 = 0; cnt1 < 10; cnt1++) {
    if (cnt1 > 5) {
        testFunc1( cnt1 );
    }
}

console.log( testFunc1.testFuncCallCount ); // 4