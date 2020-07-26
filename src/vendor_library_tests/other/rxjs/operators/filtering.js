'use strict';

import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

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
                console.log('Unsubscribing from observable 2...');
                resolve();
            };
        });

        const testObserver1 = filter((val) => val % 2 === 0)(testObservable1).subscribe(nextVal => {
            console.log(`Next val (observer 2): ${nextVal}`);
        });

        setTimeout(() => {
            testObserver1.unsubscribe();
        }, 4000);
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
    console.log('--------------------------------------------------------');
    console.log('');
}
