'use strict';

const cluster = require('cluster');

const MathUtilClass = require('./../utils/math_util_class');

const {
    CHILD_SERVER_PROCESS_INITIAL_COEFFICIENT,
    CURRENT_NUMBER_OF_CPU_CORES,

    MIN_CHILD_PROCESSES,
    MAX_CHILD_PROCESSES,

    HTTP_CHILD_SERVER_TYPE,
    HTTPS_CHILD_SERVER_TYPE,
    WEB_SOCKET_CHILD_SERVER_TYPE,
} = require('./../../constants/server_cluster_constants');

const { MASTER_INIT_SHUTDOWN } = require('./../../constants/cluster/master_messages_constants');

class MetaMasterServerClass {
    #isShuttingDown = false;

    #maxNumberOfPossibleProcesses = 0;
    #maxNumberOfProcessesPerType = 0;

    #totalNumberOfProcesses = 0;

    #httpServerWorkers = [];
    #httpsServerWorkers = [];
    #wsServerWorkers = [];

    async #onTerminate() {
        this.#isShuttingDown = true;
console.log('bzzzzzzzz');
        for (const id in cluster.workers) {

            cluster.workers[id].send(MASTER_INIT_SHUTDOWN);
        }

       // process.exit();
    }

    #onWorkerExit(worker, code, signal) {
        console.log('exit');
    }

    #onWorkerDisconnect(worker) {
        console.log('discon');
    }

    #calcNumberOfChildProcesses() {
        const rawNumberOfProcesses = (1 + CHILD_SERVER_PROCESS_INITIAL_COEFFICIENT) * CURRENT_NUMBER_OF_CPU_CORES;
        return Math.round(MathUtilClass.clamp(MIN_CHILD_PROCESSES, MAX_CHILD_PROCESSES, rawNumberOfProcesses));
    }

    #bindEventHandlers() {
        cluster.on('disconnect', this.#onWorkerDisconnect);
        cluster.on('exit', this.#onWorkerExit);

        process.on('SIGINT', this.#onTerminate.bind(this));
    }

    #startServersCluster(type) {
        let workers = [];

        cluster.setupMaster({
            args: [`--type=${type}`]
        });

        for (
            let processCnt = 0;
            (
                processCnt < this.#maxNumberOfProcessesPerType &&
                this.#totalNumberOfProcesses < this.#maxNumberOfPossibleProcesses
            );
            processCnt++
        ) {
            const worker = cluster.fork();
            console.log(`MASTER: Initiating '${type}' child server - ${this.#totalNumberOfProcesses + 1} (id - ${worker.id}, pid = ${worker.process.pid})`);

            workers.push(worker);
            this.#totalNumberOfProcesses += 1;
        }

        return workers;
    }

    #startHTTPServersCluster() {
        this.#httpServerWorkers = this.#startServersCluster(HTTP_CHILD_SERVER_TYPE);
    }

    #startHTTPSServersCluster() {
        this.#httpsServerWorkers = this.#startServersCluster(HTTPS_CHILD_SERVER_TYPE);
    }

    #startWebSocketServersCluster() {
        this.#wsServerWorkers = this.#startServersCluster(WEB_SOCKET_CHILD_SERVER_TYPE);
    }

    startCluster() {
        this.#startHTTPServersCluster();
        this.#startHTTPSServersCluster();
        this.#startWebSocketServersCluster();
    }

    constructor() {
        this.#maxNumberOfPossibleProcesses = this.#calcNumberOfChildProcesses();
        this.#maxNumberOfProcessesPerType = Math.round(this.#maxNumberOfPossibleProcesses / 3);

        this.#bindEventHandlers();
    }
}

module.exports = MetaMasterServerClass;
