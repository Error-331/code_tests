'use strict';

// https://medium.com/@dtipson/creating-an-es6ish-compose-in-javascript-ac580b95104a#.x91cllly4

export default async () => {
    const compose1 = f => g => x => f(g(x));
    const compose2 = (f, g) => x => f(g(x));

    const composeES6 = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)));

    console.log('Compose function basics');
    console.log('=======================');
    console.log('');

    console.log('compose1(x => x + 10)(x => x + 2)(6) =', compose1(x => x + 10)(x => x + 2)(6));
    console.log('compose2(x => x + 10, x => x + 2)(6) =', compose2(x => x + 10, x => x + 2)(6));

    console.log('');

    console.log('composeES6(x => x - 8, x => x + 10, x => x * 10)(4) =',composeES6(x => x - 8, x => x + 10, x => x * 10)(4));
    console.log('composeES6(x => x + 2, (x, y) => x * y)(4, 10) =', composeES6(x => x + 2, (x, y) => x * y)(4, 10));

    console.log('');
    console.log('--------------------------------------------------------');
    console.log('');
}