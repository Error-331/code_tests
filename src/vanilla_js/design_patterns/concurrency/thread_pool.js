class ParallelTaskClass {
    constructor(taskIndex) {
        this.index = taskIndex;
        this.timeout = Math.floor(Math.random() * (7000 - 3000)) + 3000;
    }

    run() {
        console.log(`Task ${this.index} starting...`);

        return new Promise((resolve) => {
            setTimeout(() => {
                console.log(`Task ${this.index} finished (${this.timeout})...`);
                resolve(this.index);
            }, this.timeout);
        });
    }
}

class WorkerClass {
    constructor(workerPoll, index) {
        this.workerPoll = workerPoll;
        this.index = index;
    }

    runTask(task) {
        console.log(`Worker ${this.index} about to run task ${task.index}`);

        task
            .run()
            .then(() => this.workerPoll.notify(this))
    }
}

class WorkerPollClass {
    constructor(maxWorkers) {
        this.maxWorkers = maxWorkers;
        this.queue = [];
        this.workders = [];

        for (let workerIndex = 0; workerIndex < this.maxWorkers; workerIndex++) {
            this.workders.push(new WorkerClass(this, workerIndex));
        }
    }

    runTasks(tasks) {
        this.queue = tasks;

        for (let workerCount = 0; workerCount < this.maxWorkers; workerCount++) {
            if (this.queue.length === 0) {
                return;
            }

            this.workders[workerCount].runTask(this.queue.pop())
        }
    }

    notify(worker) {
        if (this.queue.length > 0) {
            worker.runTask(this.queue.pop())
        }
    }
}

const workerPool = new WorkerPollClass(5);
const tasks = [];

for (let taskCounter = 0; taskCounter < 20; taskCounter++) {
    tasks.push(new ParallelTaskClass(taskCounter))
}

workerPool.runTasks(tasks);


