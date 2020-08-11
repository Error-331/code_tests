'use strict';

import { Observable } from 'rxjs';
import { toArray } from 'rxjs/operators';

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

export default async () => {
    console.log('"RxJS" library tests (utility operators)');
    console.log('========================================');
    console.log('');

    console.log('');
    console.log('Case 1 (single observable/observer, toArray operator):');
    console.log('');
    await testCase1();

    console.log('');
    console.log('--------------------------------------------------------');
    console.log('');
}
