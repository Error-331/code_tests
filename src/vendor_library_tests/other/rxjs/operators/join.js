'use strict';

import { Observable, merge, combineLatest } from 'rxjs';
import { startWith, withLatestFrom } from 'rxjs/operators';


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

            return function unsubscribe() {
                clearInterval(intervalId);
                console.log('Unsubscribing from observable 1...');
                resolve();
            };
        });

        const testObserver1 = testObservable1
            .pipe(startWith(-3, -2, -1, 0))
            .subscribe(nextVal => {
                console.log(`Next val (observer 2): ${nextVal}`);
            });

        setTimeout(() => {
            testObserver1.unsubscribe();
        }, 5000);

        // endregion
    });
}

async function testCase2()
{
    return new Promise((resolve) => {

        // region actual example code
        const testObservable2_1 = new Observable(subscriber => {
            let testValue = 1;

            const intervalId = setInterval(() => {
                subscriber.next(testValue);
                testValue += 1;
            }, 1000);

            return function unsubscribe() {
                clearInterval(intervalId);
                console.log('Unsubscribing from observable 2-1...');
            };
        });

        const testObservable2_2 = new Observable(subscriber => {
            let testValue = 10;

            const intervalId = setInterval(() => {
                subscriber.next(testValue);
                testValue += 10;
            }, 1500);

            return function unsubscribe() {
                clearInterval(intervalId);
                console.log('Unsubscribing from observable 2-2...');
            };
        });

        const testObserver4 = testObservable2_2.pipe(withLatestFrom(testObservable2_1))
            .subscribe(nextVal => {
                console.log(`Next val (observer 2): ${nextVal}`);
            });

        setTimeout(() => {
            testObserver4.unsubscribe();

            resolve();
        }, 8000);

        // endregion
    });
}

async function testCase3()
{
    return new Promise((resolve) => {

        // region actual example code
        const testObservable3_1 = new Observable(subscriber => {
            let testValue = 1;

            const intervalId = setInterval(() => {
                subscriber.next(testValue);
                testValue += 1;
            }, 1000);

            return function unsubscribe() {
                clearInterval(intervalId);
                console.log('Unsubscribing from observable 3-1...');
            };
        });

        const testObservable3_2 = new Observable(subscriber => {
            let testValue = 10;

            const intervalId = setInterval(() => {
                subscriber.next(testValue);
                testValue += 10;
            }, 1500);

            return function unsubscribe() {
                clearInterval(intervalId);
                console.log('Unsubscribing from observable 3-2...');
            };
        });

        const testObserver3 = testObservable3_2.pipe(withLatestFrom(testObservable3_1, (first, second) => ({prop1: first, prop2: second })))
            .subscribe(nextVal => {
                console.log(`Next val (observer 3): ${nextVal}`);
            });

        setTimeout(() => {
            testObserver3.unsubscribe();

            resolve();
        }, 8000);

        // endregion
    });
}

export default async () => {
    console.log('"RxJS" library tests (transformation operators)');
    console.log('===============================================');
    console.log('');

    console.log('');
    console.log('Case 1 (single observer/observable, startWith operator):');
    console.log('');
    await testCase1();

    console.log('');
    console.log('Case 2 (one observer, two observables, withLatestFrom operator):');
    console.log('');
    await testCase2();

    console.log('');
    console.log('Case 3 (one observer, two observables, withLatestFrom operator with custom func):');
    console.log('');
    await testCase3();

    console.log('');
    console.log('--------------------------------------------------------');
    console.log('');
}
