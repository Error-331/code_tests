'use strict';

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
    console.log('--------------------------------------------------------');
    console.log('');
}