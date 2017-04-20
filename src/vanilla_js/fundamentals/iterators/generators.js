'use strict';

import {generateSync} from './../../../library/js/async/generator_promise';

export default async () => {
    console.log('Generators usage');
    console.log('================');
    console.log('');

    function* exampleGeneratorFunction1()
    {
        yield 1;
        yield 2;
        yield 3;
        yield 4;
        yield 5;
    }

    function* exampleGeneratorFunction2()
    {
        let val1 = yield 331;
        let val2 = yield val1 + 1;
        let val3 = yield val2 + 2;

        yield val3 + 3;
    }

    function* exampleGeneratorFunction3() {
        try {
            yield 'yield val - 331';
        }
        catch (error) {
            console.log('handled exception 1 -', error);
        }

        try {
            yield 'yield val - 332';
        } catch (error) {
            console.log('handled exception 1 -', error);
        }
    }

    function* exampleGeneratorFunction4() {
        yield 6;
        yield 7;
        yield 8;
    }

    function* exampleGeneratorFunction5() {
        yield* exampleGeneratorFunction1();
        yield* exampleGeneratorFunction4();

        yield* [9, 10];
    }

    console.log('Simple generator example 1:');
    console.log('');

    let generatorFunctionInstance1 = exampleGeneratorFunction1();
    for (let counter1 = 0; counter1 < 5; counter1++) {console.log('yielded value -', generatorFunctionInstance1.next().value);}

    console.log('');
    console.log('done - ', generatorFunctionInstance1.next().done);
    console.log('');

    console.log('Simple generator example 2 (using "Symbol.iterator"):');
    console.log('');

    let generatorFunctionInstance2 = exampleGeneratorFunction1();
    let generatorIterable1 = generatorFunctionInstance2[Symbol.iterator]();
    for (let counter1 = 0; counter1 < 5; counter1++) {console.log('yielded value -', generatorIterable1.next().value);}

    console.log('');
    console.log('done - ', generatorIterable1.next().done);
    console.log('');

    console.log('Simple generator example 3 (params for next()):');

    let generatorFunctionInstance3 = exampleGeneratorFunction2();

    console.log('yielded value -', generatorFunctionInstance3.next().value);
    console.log('yielded value -', generatorFunctionInstance3.next(7).value);
    console.log('yielded value -', generatorFunctionInstance3.next(15).value);
    console.log('yielded value -', generatorFunctionInstance3.next(80).value);

    console.log('');
    console.log('done -', generatorFunctionInstance3.next().done);
    console.log('');

    console.log('Simple generator example 4 (return(value)):');
    console.log('');

    let generatorFunctionInstance4 = exampleGeneratorFunction1();
    for (let counter1 = 0; counter1 < 5; counter1++) {
        if (counter1 === 3) {
            console.log('returned value -', generatorFunctionInstance4.return(331).value);
        }

        console.log('yielded value -', generatorFunctionInstance4.next().value);
    }

    console.log('');
    console.log('done - ', generatorFunctionInstance4.next().done);
    console.log('');

    console.log('Simple generator example 5 (throw()):');
    console.log('');

    let generatorFunctionInstance5 = exampleGeneratorFunction3();

    console.log(generatorFunctionInstance5.next().value);
    console.log(generatorFunctionInstance5.throw('exception 1').value);

    console.log('done - ', generatorFunctionInstance5.throw('exception 2').done);
    console.log('');

    console.log('Simple generator example 6 ("yield*"):');
    console.log('');

    let generatorFunctionInstance6 = exampleGeneratorFunction5();
    for (let counter1 = 0; counter1 < 10; counter1++) {console.log('yielded value -', generatorFunctionInstance6.next().value);}

    console.log('');
    console.log('done - ', generatorFunctionInstance6.next().done);
    console.log('');

    console.log('Simple generator example 7 ("for...of"):');
    console.log('');


    for(let yieldedValue of exampleGeneratorFunction1())
    {
        console.log('yielded value -', yieldedValue);
    }

    console.log('');
    console.log('Simple generator example 6 (...spread):');
    console.log('');

    let yieldedValues1 = [...exampleGeneratorFunction1()];
    console.log('yielded values -', yieldedValues1);

    console.log('');
    console.log('Example usage of generators and promises:');
    console.log('');

    const longSum = (param1, param2) => new Promise((resolve) => {
        setTimeout(() => resolve(param1 + param2), 1000);
    });

    const longSubtract = (param1, param2) => new Promise((resolve) => {
        setTimeout(() => resolve(param1 - param2), 1000);
    });

    const asyncFunc = generateSync(function* () {
        const result1 = yield longSum(...arguments);
        const result2 = yield longSubtract(...arguments);

        yield result1 * result2;
    });


    await asyncFunc(10, 20).then(val => console.log('final value -', val));
    console.log('');

    console.log('--------------------------------------------------------');
    console.log('');
}