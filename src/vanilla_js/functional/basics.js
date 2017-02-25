'use strict';

// https://medium.com/@dtipson/everything-reduced-transducers-in-javascript-8ea3459bc7f9#.ceuos3ljq

export default async () => {
    const _Nothing = () => ({
        map: f => _Nothing()
    });

    const _Something = x => ({
        map: f => _Something(f(x))
    });

    const Nothing = _Nothing();

    const mapper = transformerFunction => (accumulator, item) => accumulator.concat(transformerFunction(item));
    const reduce = (reducer, accumulatorStart, accumulator) => accumulator.reduce(reducer, accumulatorStart);
    const filter = transformerFunction => (accumulator, item) => transformerFunction(item) ? accumulator.concat(item) : accumulator;

    const mapping = transformerFunction => reducingFunction => (accumulator, item) => reducingFunction(accumulator, transformerFunction(item, accumulator));
    const filtering = transformerFunction => reducingFunction => (accumulator, item) => transformerFunction(item, accumulator) ? reducingFunction(accumulator, item) : accumulator;

    const compose = (reducingFunction1, reducingFunction2) => x => reducingFunction1(reducingFunction2(x));

    const concat = (array, value) => array.concat([value]);
    const sum = (val1, val2) => val1 + val2;

    const divideByThree = mapping(x=>x/3);// returns a transducer
    const keepOnlyIntegers = filtering(x => x % 1 === 0); //returns a transducer

    const divBy3andOnlyIntegers = compose(divideByThree, keepOnlyIntegers);

    console.log('Functional programming basics');
    console.log('=============================');
    console.log('');

    Nothing.map(x => x + 1).map(x => x + 10).map(x => console.log('Nothing.map(x => x + 1).map(x => x + 10) =', x));
    _Something(7).map(x => x + 1).map(x => x + 1).map(x => console.log('Something(7).map(x => x + 1).map(x => x + 1) =' ,x));

    const maybeFive = () => ~~(Math.random() + 0.5) ? _Something(5) : Nothing;

    console.log('');
    console.log('Maybe five or maybe not');

    maybeFive().map(x => x + 1).map(x => console.log('maybeFive().map(x => x + 1) =' , x));

    console.log('');

    console.log('Mapper/reducer example (incrementer) - reduce(mapper(x => x+1), [], [1,2,3]) =', reduce(mapper(x => x+1), [], [1,2,3]));
    console.log('Filter/reducer example - reduce(filter(x => !!x), [], [1,null,2,3]) =', reduce(filter(x => !!x), [], [1,null,2,3]));

    console.log('');


    let transducerResult1 = [3,4,9,13,14,12].reduce(divBy3andOnlyIntegers(concat), []);
    console.log('"Divide by 3 and only integers" combined transducer result =', transducerResult1);

    let divBy3andOnlyIntegersAndSum = compose(divideByThree, keepOnlyIntegers)(sum);
    let transducerResult2 = reduce(divBy3andOnlyIntegersAndSum, 0, [3,4,9,13,14,12]);

    console.log('"Divide by 3 and only integers then sum the result" combined transducer result =', transducerResult2);

    console.log('');
    console.log('--------------------------------------------------------');
    console.log('');
}