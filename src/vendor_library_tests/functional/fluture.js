'use strict';

import Future from 'fluture';

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
        let timeoutFutureExample1 = Future(timeoutFunction1);
        timeoutFutureExample1.fork(rejectPromise, resolvePromise);
    });

    console.log('');

    try {
        console.log('Timeout future example 1 fork and cancel...');

        await new Promise((resolvePromise, rejectPromise) => {
            let timeoutFutureExample1 = Future(timeoutFunction1);
            let cancellationFunction = timeoutFutureExample1.fork(rejectPromise, resolvePromise);

            setTimeout(() => cancellationFunction(), 1000);
        });
    } catch(error) {
    }

    console.log('');

    await new Promise((resolvePromise, rejectPromise) => {
        console.log('Example of "of"...');

        let futureExample1 = Future.of('temp val 1');
        futureExample1.fork(x => console.log('reject:', x), x => {console.log('of:', x); resolvePromise()});
    });

    console.log('');

    await new Promise((resolvePromise, rejectPromise) => {
        console.log('Example of "never"...');

        let futureExample1 = Future.never;
        futureExample1.fork(x => {console.log('reject:', x); rejectPromise()}, x => {console.log('of:', x); resolvePromise()});

        console.log('...so...never is never');
        resolvePromise()
    });

    console.log('');

    try {
        await new Promise((resolvePromise, rejectPromise) => {
            console.log('Example of "reject"...');

            let futureExample1 = Future.reject('temp val 2');
            futureExample1.fork(x => {console.log('reject:', x); rejectPromise()}, x => {console.log('of:', x); resolvePromise()});
        });
    } catch(error) {
    }

    console.log('');

    await new Promise((resolvePromise, rejectPromise) => {
        console.log('Example of "after"...');

        let futureExample1 = Future.after(500, 'temp val 3');
        futureExample1.fork(x => console.log('reject:', x), x => {console.log('after:', x); resolvePromise()});
    });

    console.log('');

    try {
        await new Promise((resolvePromise, rejectPromise) => {
            console.log('Example of "rejectAfter"...');

            let futureExample1 = Future.rejectAfter(500, 'temp val 4');
            futureExample1.fork(x => console.log('rejectAfter:', x), x => {console.log('after:', x); resolvePromise()});
        });
    } catch(error) {
    }

    console.log('');

    console.log('');
    console.log('--------------------------------------------------------');
    console.log('');
}