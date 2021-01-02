'use strict';

import { Observable, merge, combineLatest, interval } from 'rxjs';
import { mergeAll, map } from 'rxjs/operators';

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
        const testObservable2_1 = new Observable(subscriber => {
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
                console.log('Unsubscribing from observable 2-1...');
            };
        });

        const testObservable2_2 = new Observable(subscriber => {
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
                console.log('Unsubscribing from observable 2-2...');
            };
        });

        const testObserver2 = combineLatest(testObservable2_1, testObservable2_2)
            .subscribe(nextVal => {
                console.log(`Next val (observer 2): ${nextVal}`);
            });

        setTimeout(() => {
            testObserver2.unsubscribe();

            resolve();
        }, 5000);

        // endregion
    });
}

async function testCase3()
{
    let id = 0;

    return new Promise((resolve) => {

        // region actual example code
        const testObserver3 = interval(2000).pipe(
            map(() => {
                return new Observable(subscriber => {
                    let currentId = id;
                    id = id + 1;

                    console.log(`Observables ${currentId}`);
                    subscriber.next(`Sub observables ${currentId}`);

                    const intervalId = setInterval(() => {
                        console.log(`Observable ${currentId}`);
                        subscriber.next(`Sub observable ${currentId}`);
                    }, 5000);

                    return () => clearInterval(intervalId)
                });
            })
        )
            .pipe(mergeAll())
            .subscribe(nextVal => {
                console.log(`Next val (observer 3): ${nextVal}`);
            });

        setTimeout(() => {
            testObserver3.unsubscribe();

            resolve();
        }, 10000);

        // endregion
    });
}

export default async () => {
    console.log('"RxJS" library tests (transformation operators)');
    console.log('===============================================');
    console.log('');

    console.log('Case 1 (single observer, two observables, merge operator):');
    console.log('');
 //   await testCase1();

    console.log('');
    console.log('Case 2 (one observer, two observables, combineLatest operator):');
    console.log('');
   // await testCase2();

    console.log('');
    console.log('Case 3 (one observer, one observable, multiple sub-observables, mergeAll operator):');
    console.log('');
    await testCase3();

    console.log('');
    console.log('--------------------------------------------------------');
    console.log('');
}
