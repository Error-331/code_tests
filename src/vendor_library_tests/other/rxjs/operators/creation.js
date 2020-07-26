'use strict';

import { interval } from 'rxjs';

async function testCase1()
{
    return new Promise((resolve) => {
        const testObservable1 = interval(1000);

        const testObserver1 = testObservable1
            .subscribe(nextVal => {
                console.log(`Next val (observer 1): ${nextVal}`);
            });

        setTimeout(() => {
            testObserver1.unsubscribe();
        }, 5000);
    });
}

export default async () => {
    console.log('"RxJS" library tests (creation operators)');
    console.log('=========================================');
    console.log('');

    console.log('Case 1 (single observer/observable, interval operator):');
    console.log('');
    await testCase1();

    console.log('');
    console.log('--------------------------------------------------------');
    console.log('');
}
