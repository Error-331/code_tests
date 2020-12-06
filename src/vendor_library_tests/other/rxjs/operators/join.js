'use strict';

import { Observable, merge, combineLatest } from 'rxjs';
import { startWith, withLatestFrom } from 'rxjs/operators';

async function testCase1()
{
    return new Promise((resolve) => {

        // region actual example code
        const testObservable1_1 = new Observable(subscriber => {
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
                console.log('Unsubscribing from observable 1-1...');
                resolve();
            };
        });

        const testObservable1_2 = new Observable(subscriber => {
            subscriber.next(10);
            subscriber.next(20);
            subscriber.next(30);

            let testValue = 40;

            const intervalId = setInterval(() => {
                subscriber.next(testValue);
                testValue += 1;
            }, 1500);

            return function unsubscribe() {
                clearInterval(intervalId);
                console.log('Unsubscribing from observable 1-2...');
                resolve();
            };
        });

        const testObserver1 = merge(testObservable1_1, testObservable1_2)
            .subscribe(nextVal => {
                console.log(`Next val (observer 1): ${nextVal}`);
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
        const testObservable2 = new Observable(subscriber => {
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
                console.log('Unsubscribing from observable 2...');
                resolve();
            };
        });

        const testObserver2 = testObservable2
            .pipe(startWith(-3, -2, -1, 0))
            .subscribe(nextVal => {
                console.log(`Next val (observer 2): ${nextVal}`);
            });

        setTimeout(() => {
            testObserver2.unsubscribe();
        }, 5000);

        // endregion
    });
}

async function testCase3()
{
    return new Promise((resolve) => {

        // region actual example code
        const testObservable3_1 = new Observable(subscriber => {
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
                console.log('Unsubscribing from observable 3-1...');
            };
        });

        const testObservable3_2 = new Observable(subscriber => {
            subscriber.next(10);
            subscriber.next(20);
            subscriber.next(30);

            let testValue = 40;

            const intervalId = setInterval(() => {
                subscriber.next(testValue);
                testValue += 10;
            }, 1200);

            return function unsubscribe() {
                clearInterval(intervalId);
                console.log('Unsubscribing from observable 3-2...');
            };
        });

        const testObserver3 = combineLatest(testObservable3_1, testObservable3_2)
            .subscribe(nextVal => {
                console.log(`Next val (observer 3): ${nextVal}`);
            });

        setTimeout(() => {
            testObserver3.unsubscribe();

            resolve();
        }, 5000);

        // endregion
    });
}

async function testCase4()
{
    return new Promise((resolve) => {

        // region actual example code
        const testObservable4_1 = new Observable(subscriber => {
            let testValue = 1;

            const intervalId = setInterval(() => {
                subscriber.next(testValue);
                testValue += 1;
            }, 1000);

            return function unsubscribe() {
                clearInterval(intervalId);
                console.log('Unsubscribing from observable 4-1...');
            };
        });

        const testObservable4_2 = new Observable(subscriber => {
            let testValue = 10;

            const intervalId = setInterval(() => {
                subscriber.next(testValue);
                testValue += 10;
            }, 1500);

            return function unsubscribe() {
                clearInterval(intervalId);
                console.log('Unsubscribing from observable 4-2...');
            };
        });

        const testObserver4 = testObservable4_2.pipe(withLatestFrom(testObservable4_1))
            .subscribe(nextVal => {
                console.log(`Next val (observer 4): ${nextVal}`);
            });

        setTimeout(() => {
            testObserver4.unsubscribe();

            resolve();
        }, 8000);

        // endregion
    });
}

async function testCase5()
{
    return new Promise((resolve) => {

        // region actual example code
        const testObservable5_1 = new Observable(subscriber => {
            let testValue = 1;

            const intervalId = setInterval(() => {
                subscriber.next(testValue);
                testValue += 1;
            }, 1000);

            return function unsubscribe() {
                clearInterval(intervalId);
                console.log('Unsubscribing from observable 5-1...');
            };
        });

        const testObservable5_2 = new Observable(subscriber => {
            let testValue = 10;

            const intervalId = setInterval(() => {
                subscriber.next(testValue);
                testValue += 10;
            }, 1500);

            return function unsubscribe() {
                clearInterval(intervalId);
                console.log('Unsubscribing from observable 5-2...');
            };
        });

        const testObserver4 = testObservable5_2.pipe(withLatestFrom(testObservable5_1, (first, second) => ({prop1: first, prop2: second })))
            .subscribe(nextVal => {
                console.log(`Next val (observer 5): ${nextVal}`);
            });

        setTimeout(() => {
            testObserver4.unsubscribe();

            resolve();
        }, 8000);

        // endregion
    });
}

export default async () => {
    console.log('"RxJS" library tests (transformation operators)');
    console.log('===============================================');
    console.log('');

    console.log('Case 1 (single observer, two observables, merge operator):');
    console.log('');
    await testCase1();

    console.log('');
    console.log('Case 2 (single observer/observable, startWith operator):');
    console.log('');
    await testCase2();

    console.log('');
    console.log('Case 2 (one observer, two observables, combineLatest operator):');
    console.log('');
    await testCase3();

    console.log('');
    console.log('Case 4 (one observer, two observables, withLatestFrom operator):');
    console.log('');
    await testCase4();

    console.log('');
    console.log('Case 5 (one observer, two observables, withLatestFrom operator with custom func):');
    console.log('');
    await testCase5();

    console.log('');
    console.log('--------------------------------------------------------');
    console.log('');
}
