'use strict';

export default async () => {

    enum TestEnum1 {
        testEnum1Val1,
        testEnum1Val2,
        testEnum1Val3
    }

    enum TestEnum2 {
        testEnum2Val1 = 5,
        testEnum2Val2 = -32,
        testEnum2Val3 = 64
    }

    const enum TestEnum3 {
        testEnum3Val1,
        testEnum3Val2,
        testEnum3Val3,
        testEnum3Val4 = 34
    }

    console.log('Enums examples');
    console.log('==============');
    console.log('');


    console.log(`TestEnum1.${TestEnum1[TestEnum1.testEnum1Val1]} = ${TestEnum1.testEnum1Val1}`);
    console.log(`TestEnum2.${TestEnum1[TestEnum1.testEnum1Val2]} = ${TestEnum1.testEnum1Val2}`);

    console.log('');

    console.log(`TestEnum2.${TestEnum2[TestEnum2.testEnum2Val1]} = ${TestEnum2.testEnum2Val1}`);
    console.log(`TestEnum2.${TestEnum2[TestEnum2.testEnum2Val1]} = ${TestEnum2.testEnum2Val2}`);

    console.log('');

    console.log(`TestEnum3.testEnum3Val1 = ${TestEnum3.testEnum3Val1}`);
    console.log(`TestEnum3.testEnum3Val2 = ${TestEnum3.testEnum3Val2}`);
    console.log(`TestEnum3.testEnum3Val4 = ${TestEnum3.testEnum3Val4}`);

    console.log('');
    console.log('--------------------------------------------------------');
    console.log('');
}