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

class MetaMasterServerClass {
    #maxNumberOfPossibleProcesses = 0;
    #maxNumberOfProcessesPerType = 0;

    #totalNumberOfProcesses = 0;

    #calcNumberOfChildProcesses() {
        const rawNumberOfProcesses = (1 + CHILD_SERVER_PROCESS_INITIAL_COEFFICIENT) * CURRENT_NUMBER_OF_CPU_CORES;
        return Math.round(MathUtilClass.clamp(MIN_CHILD_PROCESSES, MAX_CHILD_PROCESSES, rawNumberOfProcesses));
    }

    #startServersCluster(type) {
        for (
            let processCnt = 0;
            (
                processCnt < this.#maxNumberOfProcessesPerType &&
                this.#totalNumberOfProcesses < this.#maxNumberOfPossibleProcesses
            );
            processCnt++
        ) {
            console.log(`MASTER: Initiating '${type}' child server - ${this.#totalNumberOfProcesses + 1}`);

            cluster.setupMaster({
                args: [`--type=${type}`,]
            });
            cluster.fork();

            this.#totalNumberOfProcesses += 1;
        }
    }

    #startHTTPServersCluster() {
        this.#startServersCluster(HTTP_CHILD_SERVER_TYPE);
    }

    #startHTTPSServersCluster() {
        this.#startServersCluster(HTTPS_CHILD_SERVER_TYPE);
    }

    #startWebSocketServersCluster() {
        this.#startServersCluster(WEB_SOCKET_CHILD_SERVER_TYPE);
    }

    startCluster() {
        this.#startHTTPServersCluster();
        this.#startHTTPSServersCluster();
        this.#startWebSocketServersCluster();
    }

    constructor() {
        this.#maxNumberOfPossibleProcesses = this.#calcNumberOfChildProcesses();
        this.#maxNumberOfProcessesPerType = Math.round(this.#maxNumberOfPossibleProcesses / 3);
    }
}

module.exports = MetaMasterServerClass;