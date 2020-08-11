'use strict';

import { EventEmitter } from 'events';
import { interval, range, fromEvent } from 'rxjs';

async function testCase1()
{
    return new Promise((resolve) => {

        // region actual example code
        const testObservable1 = interval(1000);

        const testObserver1 = testObservable1
            .subscribe(nextVal => {
                console.log(`Next val (observer 1): ${nextVal}`);
            });

        setTimeout(() => {
            testObserver1.unsubscribe();
            resolve();
        }, 5000);

        // endregion
    });
}

async function testCase2()
{
    return new Promise((resolve) => {
        // region actual example code

        const testObservable2 = range(5,25);

        const testObserver2 = testObservable2
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
    return new Promise((resolve) => {

        // region actual example code
        const eventEmitter = new EventEmitter();

        const testObserver3 = fromEvent(eventEmitter, 'event-1')
            .subscribe(eventValue => console.log(`Event (event-1) received with value: ${eventValue}`));

        let counter = 0;

        const intervalId = setInterval(() => {
            eventEmitter.emit('event-1', counter);
            counter++;
        }, 1000);

        setTimeout(() => {
            testObserver3.unsubscribe();
            clearInterval(intervalId);

            resolve();
        }, 5000);

        // endregion
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
    console.log('Case 2 (single observer/observable, range operator):');
    console.log('');
    await testCase2();

    console.log('');
    console.log('Case 3 (single observer/observable, fromEvent operator):');
    console.log('');
    await testCase3();

    console.log('');
    console.log('--------------------------------------------------------');
    console.log('');
}
