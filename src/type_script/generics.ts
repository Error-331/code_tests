'use strict';

export default async () => {

    function identityFunction1<providedType>(arg: providedType): providedType {
        return arg;
    }

    function identityFunction2<providedType>(arg: providedType[]): providedType[] {
        console.log(`identityFunction2() arg length - ${arg.length}`);
        return arg;
    }

    function identityFunction3<providedType>(arg: Array<providedType>): Array<providedType> {
        console.log(`identityFunction3() arg length - ${arg.length}`);
        return arg;
    }

    const identityFunction3Holder1: <someProvidedType>(arg: Array<someProvidedType>) => Array<someProvidedType> = identityFunction3;

    interface TestInterface1 {
        <someProvidedType>(arg: Array<someProvidedType>): Array<someProvidedType>;
    }

    interface TestInterface2<someProvidedType> {
        (arg: someProvidedType): someProvidedType;
    }

    const identityFunction3Holder2: TestInterface1 = identityFunction3;
    const identityFunction1Holder3: TestInterface2<string> = identityFunction1;

    class TestClass1<providedType> {
        testProp1: providedType;
        testMethod1: (x: providedType, y: providedType) => providedType;
    }

    class TestClass2 extends TestClass1<any> {
        testProp2: string;
    }

    let testClass1Obj1 = new TestClass1<number>();
    testClass1Obj1.testProp1 = 245;
    testClass1Obj1.testMethod1 = function(x, y) { return x + y; };

    interface TestInterface3 {
        length: number;
    }

    function identityFunction4<providedType extends TestInterface3>(arg: providedType): providedType {
        console.log(`identityFunction4() arg length - ${arg.length}`);
        return arg;
    }

    function getKeyValue<providedType, providedKey extends keyof providedType>(usrObj: providedType, usrKey: providedKey) {
        return usrObj[usrKey];
    }

    const testObject1 = {a: 5, b: 7};

    function createClassFunction1<providedType>(providedClass: {new(): providedType; }): providedType {
        return new providedClass();
    }

    function createClassFunction2<providedClassType extends TestClass1<any>>(providedClass: new () => providedClassType): providedClassType {
        return new providedClass();
    }

    console.log('Generics examples');
    console.log('=================');
    console.log('');

    console.log('identityFunction1<string>("testString1") -', identityFunction1<string>('testString1'));
    console.log('identityFunction1("testString2") -', identityFunction1('testString2'));

    console.log('');

    identityFunction2([1, 2, 3]);
    identityFunction2(['test1', 'test2', 'test3']);

    console.log('');

    identityFunction3([1, 2, 3]);
    identityFunction3(['test1', 'test2', 'test3']);

    console.log('');

    identityFunction3Holder1([1, 2, 3]);
    identityFunction3Holder1(['test1', 'test2', 'test3']);

    console.log('');

    identityFunction3Holder2([1, 2, 3]);
    identityFunction3Holder2(['test1', 'test2', 'test3']);

    console.log('');

    console.log('identityFunction1Holder3("testString1") -', identityFunction1Holder3('testString1'));
    console.log('identityFunction1Holder3("testString2") -', identityFunction1Holder3('testString2'));

    console.log('');

    console.log('testClass1Obj1.testProp1 - ', testClass1Obj1.testProp1);
    console.log('testClass1Obj1.testMethod1(5, 8) -', testClass1Obj1.testMethod1(5, 8));

    console.log('');

    identityFunction4([1, 2, 3]);
    identityFunction4(['test1', 'test2', 'test3']);

    console.log('');

    console.log('getKeyValue(testObject1, "a")) -',  getKeyValue(testObject1, 'a'));
    console.log('getKeyValue(testObject1, "b") -', getKeyValue(testObject1, 'b'));

    console.log('');

    console.log(createClassFunction1(TestClass1));
    console.log(createClassFunction2(TestClass2));

    console.log('');
    console.log('--------------------------------------------------------');
    console.log('');
}