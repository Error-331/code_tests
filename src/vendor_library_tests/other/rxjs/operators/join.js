'use strict';

import { Observable, merge } from 'rxjs';

async function testCase1()
{
    return new Promise((resolve) => {
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
    console.log('--------------------------------------------------------');
    console.log('');
}
