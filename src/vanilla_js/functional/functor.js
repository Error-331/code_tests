'use strict';

// https://medium.com/@dtipson/functors-freedom-from-failure-f4abe6251b75
// https://gist.github.com/branneman/d0e98a1372bbaba6d93f#file-algebraic-data-types-js-L36-L52

import Identity from './../../library/js/functional/algebraic_data_types/identity';
import Const from './../../library/js/functional/algebraic_data_types/const';
import Maybe from './../../library/js/functional/algebraic_data_types/maybe';
import Either from './../../library/js/functional/algebraic_data_types/either';

export default async () => {
    console.log('Functional programming functor');
    console.log('==============================');
    console.log('');

    Function.prototype.map = function(fn) { // Functor
        return function(val) {
            return fn(this(val));
        }.bind(this);
    };

    let testFunc1 = function(tempVal) {
        return tempVal - 1;
    };

    let testFunc2 = function(tempVal) {
        if (tempVal) {
            return 5 * tempVal;
        } else {
            return null;
        }
    };

    console.log('Identity.of(4).map(x => x / 2).map(x => x * 10):', Identity.of(4).map(x => x / 2).map(x => x * 10));
    console.log('Const.of(10).map(x => x / 2).map(x => x * 10):', Const.of(10).map(x => x / 2).map(x => x * 10));
    console.log('');

    console.log('Identity.of(5).map(x => x * 2).chain(Maybe.of).map(x => x / 2):', Identity.of(5).map(x => x * 2).chain(Maybe.of).map(x => x / 2));
    console.log('Identity.of(5).map(x => null).chain(Maybe.of).map(x => x / 2):', Identity.of(5).map(x => null).chain(Maybe.of).map(x => x / 2));
    console.log('');

    console.log('Identity.of(2).map(x => x + 2).map(x => x => x).ap(Maybe.of(5)).map(x => x * 2) - right:', Identity.of(2).map(x => x + 2).map(x => x => x).ap(Maybe.of(5)).map(x => x * 2));
    console.log('Identity.of(2).map(x => x + 2).map(x => x => x).ap(Maybe.of(null)).map(x => x * 2) - right:', Identity.of(2).map(x => x + 2).map(x => x => x).ap(Maybe.of(null)).map(x => x * 2));
    console.log('Identity.of(null).map(x => x => x).ap(Maybe.of(5)).map(x => x * 2) - right:', Identity.of(null).map(x => x => x).ap(Maybe.of(5)).map(x => x * 2));
    console.log('Identity.of(2).map(x => x => x).ap(Maybe.of(null)).map(x => x * 2) - right:', Identity.of(2).map(x => x => x).ap(Maybe.of(null)).map(x => x * 2));
    console.log('');

    console.log('Maybe.of(x => x + 5).ap(Identity.of(5)):', Maybe.of(x => x + 5).ap(Identity.of(5)));
    console.log('Maybe.of(x => x + 5).ap(Const.of(5)):', Maybe.of(x => x + 5).ap(Const.of(5)));
    console.log('');

    console.log('Identity.of(x => x / 2).ap(Maybe.of(10)):', Identity.of(x => x / 2).ap(Maybe.of(10)));
    console.log('Identity.of(x => x / 2).ap(Maybe.of(null)):', Identity.of(x => x / 2).ap(Maybe.of(null)));
    console.log('');

    console.log('Const.of(x => x / 2).ap(Maybe.of(10)):', Const.of(x => x / 2).ap(Maybe.of(10)));
    console.log('Const.of(x => x / 2).ap(Maybe.of(null)):', Const.of(x => x / 2).ap(Maybe.of(null)));
    console.log('');

    console.log('Either(null, 7):', Either(null, 7));
    console.log('Either(7, null):', Either(7, null));
    console.log('');

    console.log('Identity.of(x => x / 2).ap(Either(null, 7)):', Identity.of(x => x / 2).ap(Either(null, 7)));
    console.log('Identity.of(x => x / 2).ap(Either(7, null)):', Identity.of(x => x / 2).ap(Either(7, null)));
    console.log('');

    console.log('Const.of(x => x / 2).ap(Either(null, 7)):', Const.of(x => x / 2).ap(Either(null, 7)));
    console.log('Const.of(x => x / 2).ap(Either(7, null)):', Const.of(x => x / 2).ap(Either(7, null)));
    console.log('');

    console.log('testFunc1().map(x => x * 2)(4):', testFunc1.map(x => x * 2)(4));
    console.log('testFunc1.map(x => x + 10)(5):', testFunc1.map(x => x + 10)(5));
    console.log('');

    console.log('testFunc2().map(Maybe.of)(5).map(x => x * 2):', testFunc2.map(Maybe.of)(5).map(x => x * 2));
    console.log('testFunc2().map(Maybe.of)().map(x => x / 2):', testFunc2.map(Maybe.of)().map(x => x / 2));
    console.log('');

    console.log('');
    console.log('--------------------------------------------------------');
    console.log('');
}