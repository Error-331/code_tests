'use strict';

import { Subject } from 'rxjs';

async function testCase1() {
    return new Promise((resolve) => {
        const testSubject1 = new Subject();

        testSubject1.subscribe(nextVal => {
            console.log(`Next val (subject 1): ${nextVal}`);
        });

        testSubject1.next('test val 1...');
        testSubject1.next('test val 2...');
        testSubject1.next('test val 3...');

        setTimeout(() => {
            testSubject1.next('test val...timeout...');
            testSubject1.complete();
            resolve();
        }, 1500);
    });
}

async function testCase2()
{
    return new Promise((resolve) => {
        const testSubject2 = new Subject();

        const testObserver2 = testSubject2.subscribe(nextVal => {
            console.log(`Next val (subject 2): ${nextVal}`);
        });

        testSubject2.next('test val 1...');
        testSubject2.next('test val 2...');
        testSubject2.next('test val 3...');

        const intervalId = setInterval(() => {
            testSubject2.next('test val...interval...');
        }, 1000);

        setTimeout(() => {
            clearInterval(intervalId);
            console.log('Unsubscribing from subject 2...');

            testObserver2.unsubscribe();
            resolve();
        }, 3100);
    });
}

async function testCase3()
{
    return new Promise((resolve) => {
        const testSubject3 = new Subject();

        const testObserver31 = testSubject3.subscribe({
            next(nextVal) { console.log(`Next val (subject 3-1): ${nextVal}`) },
            error(error) { console.error('Error occurred (subject 3-1): ' + error); },
            complete() { console.log('Flow is ended (subject 3-1)'); } // may not be called if unsubscribed
        });

        const testObserver32 = testSubject3.subscribe({
            next(nextVal) { console.log(`Next val (subject 3-2): ${nextVal}`) },
            error(error) { console.error('Error occurred (subject 3-2): ' + error); },
            complete() { console.log('Flow is ended (subject 3-2)'); } // may not be called if unsubscribed
        });

        testSubject3.next('test val 1...');
        testSubject3.next('test val 2...');
        testSubject3.next('test val 3...');

        const intervalId = setInterval(() => {
            testSubject3.next('test val...interval...');
        }, 1000);

        setTimeout(() => {
            testSubject3.complete();
        }, 3100);

        setTimeout(() => {
            clearInterval(intervalId);
            console.log('Unsubscribing from subject 3...');

            testObserver31.unsubscribe();
            testObserver32.unsubscribe();

            resolve();
        }, 3200);
    });
}

async function testCase4()
{
    return new Promise((resolve) => {
        const testSubject4 = new Subject();

        const testObserver4_1 = testSubject4.subscribe({
            next(nextVal) { console.log(`Next val (subject 4-1): ${nextVal}`) },
            error(error) { console.error('Error occurred (subject 4-1): ' + error); },
            complete() { console.log('Flow is ended (subject 4-1)'); } // may not be called if unsubscribed
        });

        let testObserver4_2;

        setTimeout(() => {
            testObserver4_2 = testSubject4.subscribe({
                next(nextVal) { console.log(`Next val (subject 4-2): ${nextVal}`) },
                error(error) { console.error('Error occurred (subject 4-2): ' + error); },
                complete() { console.log('Flow is ended (subject 4-2)'); } // may not be called if unsubscribed
            });
        }, 4000);

        testSubject4.next('test val 1...');
        testSubject4.next('test val 2...');
        testSubject4.next('test val 3...');

        let valueCounter = 0;

        const intervalId = setInterval(() => {
            testSubject4.next(`test val ${valueCounter}...interval...`);
            valueCounter += 1;
        }, 2000);

        setTimeout(() => {
            clearInterval(intervalId);
            console.log('Unsubscribing from subject 4...');

            testObserver4_1.unsubscribe();
            testObserver4_2.unsubscribe();
            resolve();
        }, 10000);
    });
}

async function testCase5()
{
    return new Promise((resolve) => {
        const testSubject5 = new Subject();

        let testObserver5_1;
        let testObserver5_2;

        setTimeout(() => {
            testObserver5_1 = testSubject5.subscribe(
                (nextVal) => { console.log(`Next val (subject 5-1): ${nextVal}`) },
                (error) => { console.error('Error occurred (subject 5-1): ' + error); },
                () => { console.log('Flow is ended (subject 5-1)'); } // may not be called if unsubscribed
            );

            testObserver5_2 = testSubject5.subscribe(
                (nextVal) => { console.log(`Next val (subject 5-2): ${nextVal}`) },
                (error) => { console.error('Error occurred (subject 5-2): ' + error); },
                () => { console.log('Flow is ended (subject 5-2)'); } // may not be called if unsubscribed
            );
        }, 4000);

        testSubject5.next('test val 1...');
        testSubject5.next('test val 2...');
        testSubject5.next('test val 3...');

        let valueCounter = 0;

        const intervalId = setInterval(() => {
            testSubject5.next(`test val ${valueCounter}...interval...`);
            valueCounter += 1;
        }, 1000);

        setTimeout(() => {
            clearInterval(intervalId);
            console.log('Unsubscribing from subject 5...');

            testObserver5_1.unsubscribe();
            testObserver5_2.unsubscribe();
            resolve();
        }, 10000);
    });
}

export default async () => {
    console.log('"RxJS" library tests (subject basics)');
    console.log('=====================================');
    console.log('');

    console.log('Case 1 (simple single subject/observer):');
    console.log('');
    await testCase1();

    console.log('');
    console.log('Case 2 (simple single subject/observer, periodic updates):');
    console.log('');
    await testCase2();

    console.log('');
    console.log('Case 3 (Two  sync subject/observer, periodic updates):');
    console.log('');
    await testCase3();

    console.log('');
    console.log('Case 4 (Two out of sync subject/observer (second began to listen later), periodic updates):');
    console.log('');
    await testCase4();

    console.log('');
    console.log('Case 5 (Two sync subject/observer (both began to listen later), periodic updates):');
    console.log('');
    await testCase5();

    console.log('');
    console.log('--------------------------------------------------------');
    console.log('');
}
