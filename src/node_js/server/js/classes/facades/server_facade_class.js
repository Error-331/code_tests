'use strict';

class ServerFacadeClass {
    #server = null;
    #parentServerFacade = null;

    get parentServerFacade() {
        return this.#parentServerFacade;
    }

    get server() {
        if (this.parentServerFacade !== undefined && this.parentServerFacade !== null) {
            return this.parentServerFacade.server;
        } else {
            return this.#server;
        }
    }

    set parentServerFacade(parentServerFacade) {
        this.#parentServerFacade = parentServerFacade;
    }

    set server(server) {
        this.#server = server;
    }

    constructor(parentServerFacade) {
        this.parentServerFacade = parentServerFacade;
    }
}

module.exports = ServerFacadeClass;
