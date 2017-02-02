'use strict';

export default async () => {
    const testObj1 = {
        testProp1: 'test prop 1 val',
        testProp2: 'test prop 2 val',
        testProp3: 'test prop 3 val'
    };

    const testObj2 = {
        testProp3: 'test prop 3 val',
        testProp4: 'test prop 4 val'
    };

    const testObj3 = {
        testProp1: 'test prop 1 new val',
        testProp4: 'test prop 4 new val'
    };

    console.log('TypeScript rest/spread testing');
    console.log('==============================');
    console.log('');

    console.log('Rest example 1: ');
    console.log('');

    const {testProp2, ...restProps} = testObj1;

    console.log('Test property 2 - ', testProp2);
    console.log('Rest - ', restProps);

    console.log('');
    console.log('');

    console.log('Spread example 1: ');
    console.log('');

    const testCombinedObj1 = {...testObj1, ...testObj2};

    console.log('Combined object - ', testCombinedObj1);

    console.log('');
    console.log('');

    console.log('Spread example 2: ');
    console.log('');

    const testShallowCopy1 = {...testObj1};

    console.log('Shallow copy - ', testShallowCopy1);

    console.log('');
    console.log('--------------------------------------------------------');
    console.log('');

    return true;
}