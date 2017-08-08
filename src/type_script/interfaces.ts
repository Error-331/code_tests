'use strict';

export default async () => {
    // interface usage examples 1
    function TestFunction1(testObj: { testProp2: string }) {
        return testObj;
    }

    // interface usage example 2
    interface TestInterface1 {
        testProp1?: string;
        testProp2: number;
    }

    function TestFunction2(testObj: TestInterface1) {
        return testObj;
    }

    // interface usage example 3
    interface TestInterface2 {
        testProp1: string;
        testProp2: number;
    }

    // interface usage example 4
    interface TestInterface3 {
        testProp1?: string;
        testProp2?: number;
    }

    function TestFunction3(testObj: TestInterface3): {testProp3: string; testProp4: number} {
        return {
            testProp3: testObj.testProp1 ? testObj.testProp1 : 'none',
            testProp4: testObj.testProp2 ? testObj.testProp2 : 0
        }
    }

    // interface usage example 5
    interface TestInterface4 {
        readonly testProp1: number,
        readonly testProp2: number,
        readonly testProp3: ReadonlyArray<number>
    }

    // interface usage example 6
    interface TestInterface5 {
        testProp1?: number,
        testProp2?: number,
        [propName: number]: any
    }

    function TestFunction4(testObj: TestInterface5) {
        return testObj;
    }

    // interface usage example 7
    interface TestInterface6 {
        (testParam1: number, testParam2: number) : Array<number>
    }

    // interface usage example 8
    interface TestInterface7 {
        readonly [index: number]: string;
    }

    // interface usage example 9
    interface TestInterface8 {
        [index: string]: number
    }

    // interface usage example 10
    interface TestInterface9 {
        testProp1: string,
        testProp2: number,

        testMethod1(testParam1: number, testParam2: number): number
    }

    // interface usage example 11
    interface TestInterface10 {
        testProp1: string
    }

    interface TestInterface11 {
        testProp2: number
    }

    interface TestInterface12 extends TestInterface10, TestInterface11 {
        testProp3: number
    }

    let testObj1 = {testProp1: 10, testProp2: 'test_prop_1_val'};
    let testObj2 = {testProp1: 'test_prop_1_val', testProp2: 331};
    let testObj3: TestInterface2 = { testProp1: 'test_prop_val_1', testProp2: 20 };
    let testObj4 = {testProp14: 'testProp1Value'};
    let testObj5: TestInterface4 = {testProp1: 331, testProp2: 42, testProp3: [1, 2, 3]};
    let testObj6 = {testProp1: 2, testProp4: 33};
    let testObj7: TestInterface12 = {testProp1: 'testPropValue1', testProp2: 12, testProp3: 33};
    let testObj8 = <TestInterface12>{};

    testObj8.testProp1 = 'testPropValue1';
    testObj8.testProp2 = 13;
    testObj8.testProp3 = 26;

    let testFunction5: TestInterface6;
    testFunction5 = (testParam1: number, testParam2: number) => {
        return [testParam1, testParam2];
    };

    let testArray1: TestInterface7 = ['Kostya', 'Pavel'];
    let testArray2: TestInterface8 = {};

    testArray2['Sergei'] = 32;
    testArray2['Maksim'] = 23;

    class TestClass1 implements TestInterface9 {
        testProp1: string;
        testProp2: number;

        constructor(testPram1: string, testParam2: number) {
            this.testProp1 = testPram1;
            this.testProp2 = testParam2;
        }

        public testMethod1(testParam1: number, testParam2: number): number {
            return testParam1 + testParam2;
        }
    }

    // example of how interface can extend class
    let testClass1Obj = new TestClass1('testClass1Obj1', 1);

    class TestClass2 {
        private testProp1: number
    }

    interface TestInterface13 extends TestClass2 {
        testMethod1();
    }

    class TestClass3 extends TestClass2 {
        testMethod1() {
        }
    }

    class TestClass4 extends TestClass3 implements TestInterface13 {
    }

    // class TestClass5 implements TestInterface13 {} - cannot be accomplished

    // example of hybrid types (interface)
    interface TestInterface14 {
        (testProp1: string): number;
        testProp2: Date;
        testFunction1(): void;
    }

    function testFunction6(): TestInterface14 {
        let testVar1 = <TestInterface14>function (testProp1: string) { };
        testVar1.testProp2 = new Date();
        testVar1.testFunction1 = function () { };
        return testVar1;
    }

    console.log('TypeScript interfaces examples');
    console.log('==============================');
    console.log('');

    console.log('Example output of function with inline interface definition:', TestFunction1(testObj1));
    console.log('Example output of function with external interface definition:', TestFunction2(testObj2));
    console.log('');

    console.log('Example object with defined interface', testObj3);
    console.log('');

    console.log('Example output of function with external interface definition and definition of return type:', TestFunction3(testObj4));
    console.log('');

    console.log('Example object with defined interface (with readonly properties)', testObj5);
    console.log('');

    console.log('Example output of function with external interface definition and object parameter supplied with interface parameter:', TestFunction4(testObj6 as TestInterface5));
    console.log('Example output of function with external interface that defines function:', testFunction5(43, 52));
    console.log('');

    console.log('Example output of array with external interface that defines readonly number index:', testArray1);
    console.log('Example output of array with external interface that defines string index:', testArray2);
    console.log('');

    console.log('Example output of class that implements specific interface:', testClass1Obj);
    console.log('');

    console.log('Example output of object that implements interface that inherits from multiple interfaces', testObj7);
    console.log('');

    console.log('Example output of object to which was assigned empty object with specific interface and then properties to this object were assigned', testObj8);
    console.log('');

    console.log('');
    console.log('--------------------------------------------------------');
    console.log('');
}