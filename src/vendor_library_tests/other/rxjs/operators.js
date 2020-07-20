'use strict';

import { Observable, of } from 'rxjs';
import { map, reduce, filter } from 'rxjs/operators';

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

        const testObserver2 = filter((val) => val % 2 === 0)(testObservable2).subscribe(nextVal => {
            console.log(`Next val (observer 2): ${nextVal}`);
        });

        setTimeout(() => {
            testObserver2.unsubscribe();
        }, 4000);
    });
}

async function testCase3() {
    return new Promise((resolve) => {
        const testObservable3 = of(1, 2, 3, 4, 5);

        const testObserver3 = testObservable3
            .pipe(reduce(
                (acc, current) => {
                    acc += current * 10;
                    return acc;
                }, 0)
            )
            .subscribe(nextVal => {
            console.log(`Next val (observer 3): ${nextVal}`);
        });

        setTimeout(() => {
            testObserver3.unsubscribe();
            resolve();
        }, 4000);
    });
}

export default async () => {
    console.log('"RxJS" library tests (operators)');
    console.log('================================');
    console.log('');

    console.log('Case 1 (single observable/observer, map operator):');
    console.log('');
    //await testCase1();

    console.log('');
    console.log('Case 2 (single observable/observer, filter operator):');
    console.log('');
    //await testCase2();

    console.log('');
    console.log('Case 3 (single observable/observer (of), reduce operator):');
    console.log('');
    await testCase3();


    console.log('');
    console.log('--------------------------------------------------------');
    console.log('');
}