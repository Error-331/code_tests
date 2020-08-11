'use strict';

import { Observable, interval } from 'rxjs';
import { filter, map, distinct, sample, sampleTime } from 'rxjs/operators';

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

        const testObserver1 = filter((val) => val % 2 === 0)(testObservable1).subscribe(nextVal => {
            console.log(`Next val (observer 1): ${nextVal}`);
        });

        setTimeout(() => {
            testObserver1.unsubscribe();
        }, 4000);

        // endregion
    });
}

async function testCase2()
{
    return new Promise((resolve) => {

        // region actual example code
        const testObservable2 = interval(1000)
            .pipe(
                map(_ => {
                    const originalNumber = Math.floor(Math.random() * Math.floor(4));
                    console.log(`Original number (random): ${originalNumber}`);

                    return originalNumber;
                }),
                distinct()
            );

        const testObserver1 = testObservable2.subscribe(nextVal => {
            console.log(`Next val (observer 2): ${nextVal}`);
        });

        setTimeout(() => {
            testObserver1.unsubscribe();
            resolve();
        }, 10000);

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
            }, 500);

            return function unsubscribe() {
                clearInterval(intervalId);
                console.log('Unsubscribing from observable 3-1...');
                resolve();
            };
        });

        const testObservable3_2 = new Observable(subscriber => {
            const intervalId = setInterval(() => {
                subscriber.next('event-1');
            }, 1500);

            return function unsubscribe() {
                clearInterval(intervalId);
                console.log('Unsubscribing from observable 3-2...');
                resolve();
            };
        });

        const testObserver3 = testObservable3_1
            .pipe(sample(testObservable3_2))
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

async function testCase4()
{
    return new Promise((resolve) => {

        // region actual example code
        const testObservable4 = new Observable(subscriber => {
            subscriber.next(1);
            subscriber.next(2);
            subscriber.next(3);

            let testValue = 4;

            const intervalId = setInterval(() => {
                subscriber.next(testValue);
                testValue += 1;
            }, 500);

            return function unsubscribe() {
                clearInterval(intervalId);
                console.log('Unsubscribing from observable 4...');
                resolve();
            };
        });

        const testObserver4 = testObservable4
            .pipe(sampleTime(1500))
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

export default async () => {
    console.log('"RxJS" library tests (filtering operators)');
    console.log('==========================================');
    console.log('');

    console.log('');
    console.log('Case 1 (single observable/observer, filter operator):');
    console.log('');
    await testCase1();

    console.log('');
    console.log('Case 2 (single observable/observer, distinct operator):');
    console.log('');
    await testCase2();

    console.log('');
    console.log('Case 3 (two observables, one observer, sample operator):');
    console.log('');
    await testCase3();

    console.log('');
    console.log('Case 4 (singe observable/observer, sampleTime operator):');
    console.log('');
    await testCase4();

    console.log('');
    console.log('--------------------------------------------------------');
    console.log('');
}
