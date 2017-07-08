'use strict';

import Future from 'fluture';
import S from 'sanctuary';

export default async () => {

    const timeoutFunction = (funcName, delay) => Future((reject, resolve) => {
        const timerId = setTimeout(() => {
            resolve(funcName);
        }, delay);

        return () => {
            clearTimeout(timerId);
            reject(funcName);
        };
    });

    const testFunc1 = userCallback => Future.both(timeoutFunction('timeoutFunction1', 1000), timeoutFunction('timeoutFunction2', 2000)).fork(error => console.error(error), _ => userCallback(S.Right(_)));

    console.log('"Fluture/Sanctuary" library tests');
    console.log('=================================');
    console.log('');


    await new Promise((resolvePromise, rejectPromise) => {
        testFunc1(S.either(_ => _, funcResult => {
            console.log('Functions executed in parallel(both):', funcResult);
            resolvePromise();
        }));
    });

    console.log('');
    console.log('--------------------------------------------------------');
    console.log('');
}