'use strict';

export default () => {
    // interface usage examples 1
    function TestFunction1(testObj: { testProp2: string }) {
        console.log(testObj);
    }

    let testObj1 = {testProp1: 10, testProp2: 'test_prop_1_val'};
    TestFunction1(testObj1);

    // interface usage example 2
    interface TestInterface1 {
        testProp1?: string;
        testProp2: number;
    }

    function TestFunction2(testObj: TestInterface1) {
        console.log(testObj);
    }

    let testObj2 = {testProp1: 'test_prop_1_val', testProp2: 331};
    TestFunction2(testObj2);

    // interface usage example 3
    interface TestInterface2 {
        testProp1: string;
        testProp2: number;
    }

    let testObj3: TestInterface2 = { testProp1: 'test_prop_val_1', testProp2: 20 };
}