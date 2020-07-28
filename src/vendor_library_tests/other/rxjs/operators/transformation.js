'use strict';

import { Observable } from 'rxjs';
import { map, scan } from 'rxjs/operators';

async function testCase1()
{
    return new Promise((resolve) => {
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

        const testObserver1 = map((val) => val * 10)(testObservable1).subscribe(nextVal => {
            console.log(`Next val (observer 1): ${nextVal}`);
        });

        setTimeout(() => {
            testObserver1.unsubscribe();
        }, 3100);
    });
}

async function testCase2()
{
    return new Promise((resolve) => {
        const testObservable2 = new Observable(subscriber => {
            subscriber.next(10);
            subscriber.next(20);
            subscriber.next(30);

            let testValue = 40;

            const intervalId = setInterval(() => {
                subscriber.next(testValue);
                testValue += 10;
            }, 1000);

            return function unsubscribe() {
                clearInterval(intervalId);
                console.log('Unsubscribing from observable 2...');
                resolve();
            };
        });

        const testObserver2 = scan((acc, val) => acc + val)(testObservable2).subscribe(nextVal => {
            console.log(`Next val (observer 2): ${nextVal}`);
        });

        setTimeout(() => {
            testObserver2.unsubscribe();
        }, 5000);
    });
}

export default async () => {
    console.log('"RxJS" library tests (transformation operators)');
    console.log('==============================================');
    console.log('');

    console.log('Case 1 (single observable/observer, map operator):');
    console.log('');
    await testCase1();

    console.log('');
    console.log('Case 2 (single observable/observer, scan operator):');
    console.log('');
    await testCase2();

    console.log('');
    console.log('--------------------------------------------------------');
    console.log('');
}
