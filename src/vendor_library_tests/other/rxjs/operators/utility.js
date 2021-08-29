'use strict';

import { Observable } from 'rxjs';
import { toArray, pluck } from 'rxjs/operators';

async function testCase1()
{
    return new Promise((resolve) => {

        // region actual example code
        const testObservable1 = new Observable(subscriber => {
            subscriber.next(1);
            subscriber.next(2);
            subscriber.next(3);

            let testValue = 4;

            const intervalId = setInterval(() => {
                subscriber.next(testValue);
                testValue += 1;
            }, 1000);

            setTimeout(() => {
                clearInterval(intervalId);
                subscriber.complete();
            },3000);

            return function unsubscribe() {
                clearInterval(intervalId);
                console.log('Unsubscribing from observable 1...');
            };
        });

        const testObserver1 = testObservable1
            .pipe(toArray())
            .subscribe({
                complete() { console.log('Flow is ended (observer 1)'); },
                next(nextVal) {  console.log(`Next val (observer 1): ${nextVal}`)}
            });

        setTimeout(() => {
            testObserver1.unsubscribe();
            resolve();
        }, 5000);

        // endregion
    });
}

async function testCase2()
{
    return new Promise((resolve) => {

        // region actual example code
        const testObservable2 = new Observable(subscriber => {
            subscriber.next({prop1: 1, prop2: 'a', prop3: '-'});
            subscriber.next({prop1: 2, prop3: '*'});
            subscriber.next({prop2: 'c', prop3: '|'});

            subscriber.complete();

            return function unsubscribe() {
                console.log('Unsubscribing from observable 2...');
            };
        });

        const testObserver2 = testObservable2
            .pipe(pluck('prop1'))
            .subscribe({
                complete() { console.log('Flow is ended (observer 2)'); },
                next(nextVal) {  console.log(`Next val (observer 2): ${nextVal}`)}
            });

        testObserver2.unsubscribe();
        resolve();

        // endregion
    });
}


export default async () => {
    console.log('"RxJS" library tests (utility operators)');
    console.log('========================================');
    console.log('');

    console.log('');
    console.log('Case 1 (single observable/observer, toArray operator):');
    console.log('');
   // await testCase1();

    console.log('');
    console.log('Case 2 (single observable/observer, pluck operator):');
    console.log('');
    await testCase2();

    console.log('');
    console.log('--------------------------------------------------------');
    console.log('');
}
