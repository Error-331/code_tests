const testRecursion1 = () => process.nextTick(testRecursion1);
testRecursion1(); // setInterval will never run

const testRecursion2 = () => setImmediate(testRecursion2);
testRecursion2(); // setInterval will run

setInterval(() => console.log('test'), 10);
