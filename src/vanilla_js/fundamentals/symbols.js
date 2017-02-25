'use strict';

export default async () => {

    console.log('Symbol usage');
    console.log('============');
    console.log('');

    let symbol1 = Symbol('Example symbol 1');
    let symbol2 = Symbol('Example symbol 2');

    let symbol1CopyDesc = Symbol('Example symbol 1');

    let obj1 = {
        [symbol1]: 'obj1 symbol prop 1 value',
        [symbol2]: 'obj1 symbol prop 2 value',
        [Symbol.for('Example symbol 3')]: 'obj1 prop 3 value'
    };

    let obj2 = {
        prop1: 'obj2 prop 1 value',
        [Symbol.for('Example symbol 3')]: 'obj2 prop 3 value'
    };

    Object.defineProperty(obj2, symbol1, {
        enumerable: false,
        value: 'obj2 symbol prop 1 value'
    });

    Object.defineProperty(obj2, symbol2, {
        enumerable: false,
        value: 'obj2 symbol prop 2 value'
    });

    console.log('symbol1 === symbol2 :', symbol1 === symbol2);
    console.log('symbol1 === symbol1CopyDesc  :', symbol1 === symbol1CopyDesc);

    console.log('');

    console.log('typeof symbol1 =', typeof symbol1);

    console.log('');

    console.log('obj1[symbol1] =', obj1[symbol1]);
    console.log('obj1[symbol2] =', obj1[symbol2]);

    console.log('');
    console.log('getOwnPropertySymbols(obj1) =', Object.getOwnPropertySymbols(obj1));
    console.log('');
    console.log('getOwnPropertySymbols(obj2) =', Object.getOwnPropertySymbols(obj2));
    console.log('');

    console.log('Symbol for "Example symbol 3" (obj1) = ', obj1[Symbol.for('Example symbol 3')]);
    console.log('Symbol for "Example symbol 3" (obj2) = ', obj2[Symbol.for('Example symbol 3')]);

    console.log('');
    console.log('--------------------------------------------------------');
    console.log('');
}