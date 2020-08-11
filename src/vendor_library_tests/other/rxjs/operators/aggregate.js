'use strict';

import { of } from 'rxjs';
import { reduce } from 'rxjs/operators';

async function testCase1() {
    return new Promise((resolve) => {

        // region actual example code
        const testObservable1 = of(1, 2, 3, 4, 5);

        const testObserver1 = testObservable1
            .pipe(reduce(
                (acc, current) => {
                    acc += current * 10;
                    return acc;
                }, 0)
            )
            .subscribe(nextVal => {
                console.log(`Next val (observer 1): ${nextVal}`);
            });

        setTimeout(() => {
            testObserver1.unsubscribe();
            resolve();
        }, 4000);

        // endregion

    });
}

export default async () => {
    console.log('"RxJS" library tests (aggregate operators)');
    console.log('==========================================');
    console.log('');

    console.log('');
    console.log('Case 1 (single observable/observer (of), reduce operator):');
    console.log('');
    await testCase1();

    console.log('');
    console.log('--------------------------------------------------------');
    console.log('');
}
