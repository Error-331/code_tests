'use strict';

export default async () => {
    const I = x => x;
    const K = x => y => x;

    const A = f => x => f(x);
    const T = x => f => f(x);
    const W = f => x => f(x)(x);
    const C = f => y => x => f(x)(y);
    const B = f => g => x => f(g(x));
    const S = f => g => x => f(x)(g(x));
    const P = f => g => x => y => f(g(x))(g(y));

    console.log('Combinator functions');
    console.log('====================');
    console.log('');

    console.log('Function I():');

    console.log('');

    console.log('x => x () 9 =', I(9));
    console.log('x => x () null =', I(null));
    console.log('x => x () undefined =', I(undefined));

    console.log('');
    console.log('x => x () x =', I(I));
    console.log('x => x () x () 9 =', I(I)(9));

    console.log('');

    console.log('Function K():');

    console.log('');

    console.log('K(9)(2) =', K(9)(2));
    console.log('K(I)(9)(2) =', K(I)(9)(2));

    console.log('');

    console.log('Other combinations:');

    console.log('');
    console.log('A(x => x + 2)(2) =', A(x => x + 2)(2));
    console.log('T(5)(x => x + 3) =', T(5)(x => x + 3));
    console.log('W(x => y => x + y + 5)(10) =', W(x => y => x + y + 5)(10));
    console.log('C(x => y => x + y + 5)(10) =', C(y => x => x + 5 - y)(10)(3));
    console.log('B(x => x / 2)(x => x - 15)(25) =', B(x => x / 2)(x => x - 15)(25));
    console.log('S(x => y => x + y)(x => x - 10)(35) =', S(x => y => x + y)(x => x - 10)(35));
    console.log('P(x => y => y - x)(x => x + 3)(25)(40) =', P(x => y => y - x)(x => x + 3)(25)(40));

    console.log('');
    console.log('--------------------------------------------------------');
    console.log('');
}