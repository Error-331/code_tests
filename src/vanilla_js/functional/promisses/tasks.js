'use strict';

// Article: https://medium.com/@dtipson/building-a-better-promise-3dd366f80c16#.v4ikdqq8f
// Library: https://github.com/folktale/data.task

export default async () => {
    console.log('Functional programming promises (tasks)');
    console.log('=======================================');
    console.log('');

    function Task(computation, cleanup) {
        this.fork = computation;
        this.cleanup = cleanup || function() {};
    }

    Task.prototype.of = function _of(b) {
        return new Task(function(_, resolve) {
            return resolve(b);
        });
    };

    Task.of = Task.prototype.of;

    Task.prototype.map = function _map(f) {
        let fork = this.fork;
        let cleanup = this.cleanup;

        return new Task(function(reject, resolve) {
            return fork(function(a) {
                return reject(a);
            }, function(b) {
                return resolve(f(b));
            });
        }, cleanup);
    };

    Task.prototype.chain = function _chain(f) {
        let fork = this.fork;
        let cleanup = this.cleanup;

        return new Task(function(reject, resolve) {
            return fork(function(a) {
                return reject(a);
            }, function(b) {
                return f(b).fork(reject, resolve);
            });
        }, cleanup);
    };


    return new Promise((generalResolve, generalReject) => {
        const examplesRun1 = () => {
            const testTimedOutFunction1 = () => {
                return new Task((reject, resolve) => {
                    console.log('"testTimedOutFunction1" called');

                    const token = setTimeout(_=>resolve(5), 1500);
                    return _ => clearTimeout(token);
                });
            };

            const testTimedOutFunction2 = () => {
                return new Task((reject, resolve) => {
                    console.log('"testTimedOutFunction2" called');

                    const token = setTimeout(_=>resolve(2), 1500);
                    return _ => clearTimeout(token);
                });
            };

            const tasksChain1 = testTimedOutFunction1().chain((result1) => {
                return testTimedOutFunction2().map((result2) => {
                    return result1 + result2;
                });
            });

            console.log('Complicated example 1 (map, chain)');
            console.log('');

            tasksChain1.fork(_ => _, chainResult => {
                console.log('Complicated example 1 result:', chainResult);
                console.log('');
                preResolve();
            });
        };

        const examplesRun2 = () => {

            console.log('Complicated example 2 (of, map)');

            let testTask1 = Task.of(8).map(x => x + 2);
            testTask1.fork(_ => _, result => {
                console.log('Complicated example 2 result:', result);
                setTimeout(() => preResolve(), 0)
            })
        };

        let resolveCount = 0;
        const totalResolves = 2;

        const preResolve = () => {
            if (resolveCount > totalResolves) {
                return;
            }

            switch(resolveCount) {
                case 0:
                    examplesRun1();
                    break;
                case 1:
                    examplesRun2();
                    break
            }

            resolveCount++;

            if (resolveCount === totalResolves) {
                console.log('');
                console.log('--------------------------------------------------------');
                console.log('');

                generalResolve();
            }
        };

        preResolve();
    });
}