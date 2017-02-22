'use strict';

export default async () => {
    const compose1 = f => g => x => f(g(x));
    const compose2 = (f, g) => x => f(g(x));

    console.log('Compose function basics');
    console.log('=======================');
    console.log('');

    console.log('compose1(x => x + 10)(x => x + 2)(6) =', compose1(x => x + 10)(x => x + 2)(6));
    console.log('compose2(x => x + 10, x => x + 2)(6) =', compose2(x => x + 10, x => x + 2)(6));

    console.log('');
    console.log('--------------------------------------------------------');
    console.log('');
}