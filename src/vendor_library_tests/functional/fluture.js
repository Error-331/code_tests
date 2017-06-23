'use strict';

import Future from 'fluture';
import S from 'sanctuary';

export default async () => {

    console.log('"Fluture" library tests');
    console.log('=======================');
    console.log('');

    const timeoutFunction1 = (reject, resolve) => {
        const timerId = setTimeout(() => {
            console.log('"timeoutFunction1" resolve');
            resolve();
        }, 2000);

        return () => {
            console.log('"timeoutFunction1" cancel');
            clearTimeout(timerId);
            reject();
        };
    };

    console.log('Timeout future example 1 fork...');

    await new Promise((resolvePromise, rejectPromise) => {
        let timeoutFutureExample = Future(timeoutFunction1);
        timeoutFutureExample.fork(rejectPromise, resolvePromise);
    });

    console.log('');

    try {
        console.log('Timeout future example 1 fork and cancel...');

        await new Promise((resolvePromise, rejectPromise) => {
            let timeoutFutureExample = Future(timeoutFunction1);
            let cancellationFunction = timeoutFutureExample.fork(rejectPromise, resolvePromise);

            setTimeout(() => cancellationFunction(), 1000);
        });
    } catch(error) {
    }

    console.log('');

    await new Promise((resolvePromise, rejectPromise) => {
        console.log('Example of "of"...');

        let futureExample = Future.of('temp val 1');
        futureExample.fork(x => console.log('reject:', x), x => {console.log('of:', x); resolvePromise()});
    });

    console.log('');

    await new Promise((resolvePromise, rejectPromise) => {
        console.log('Example of "never"...');

        let futureExample = Future.never;
        futureExample.fork(x => {console.log('reject:', x); rejectPromise()}, x => {console.log('of:', x); resolvePromise()});

        console.log('...so...never is never');
        resolvePromise()
    });

    console.log('');

    try {
        await new Promise((resolvePromise, rejectPromise) => {
            console.log('Example of "reject"...');

            let futureExample = Future.reject('temp val 2');
            futureExample.fork(x => {console.log('reject:', x); rejectPromise()}, x => {console.log('of:', x); resolvePromise()});
        });
    } catch(error) {
    }

    console.log('');

    await new Promise((resolvePromise, rejectPromise) => {
        console.log('Example of "after"...');

        let futureExample = Future.after(500, 'temp val 3');
        futureExample.fork(x => console.log('reject:', x), x => {console.log('after:', x); resolvePromise()});
    });

    console.log('');

    try {
        await new Promise((resolvePromise, rejectPromise) => {
            console.log('Example of "rejectAfter"...');

            let futureExample = Future.rejectAfter(500, 'temp val 4');
            futureExample.fork(x => {console.log('rejectAfter:', x); rejectPromise()}, x => {console.log('after:', x); resolvePromise()});
        });
    } catch(error) {
    }

    console.log('');

    await new Promise((resolvePromise, rejectPromise) => {
        console.log('Example of "of"...');

        let futureExample = Future.of('temp val 5');
        futureExample.fork(x => {console.log('rejectAfter:', x); rejectPromise()}, x => {console.log('after:', x); resolvePromise()});
    });

    console.log('');

    await new Promise((resolvePromise, rejectPromise) => {
        console.log('Example of "of"...');

        let futureExample = Future.of('temp val 5');
        futureExample.fork(x => {console.log('rejectAfter:', x); rejectPromise()}, x => {console.log('after:', x); resolvePromise()});
    });

    console.log('');

    await new Promise((resolvePromise, rejectPromise) => {
        console.log('Example of "fold"...');

        Future.of('temp val 1').fold(x => 'resolved_folded_val1', x => x).value(x => {console.log('after fold/value:', x);  resolvePromise()});
    });

    console.log('');

    await new Promise((resolvePromise, rejectPromise) => {
        console.log('Example 1 of "do"...');

        Future.do(function*(){
            const firstVal1 = yield Future.after(300, 'temp_val 1');
            const secondVal2 = yield Future.after(300, 'temp_val 2 ' + firstVal1);

            return secondVal2 + ' - combined';
        }).fork(x => {console.log('rejectAfter:', x); rejectPromise()}, x => {console.log('after(all futures executed):', x); resolvePromise()});
    });

    console.log('');

    await new Promise((resolvePromise, rejectPromise) => {
        console.log('Example 2 of "do" (rejection)...');

        Future.do(function*(){
            const attempt = Future.fold(x => x, x => x + ' resolved');

            const firstVal1 = yield Future.after(300, 'temp_val 1');
            const secondVal2 = yield attempt(Future.reject(new Error('test error 1')));

            if (typeof secondVal2 === 'object') {
                return false;
            } else {
                return firstVal1;
            }
        }).fork(x => {console.log('rejectAfter:', x); rejectPromise()}, x => {console.log('after(all futures executed):', x); resolvePromise()});
    });

    console.log('');
    console.log('--------------------------------------------------------');
    console.log('');
}