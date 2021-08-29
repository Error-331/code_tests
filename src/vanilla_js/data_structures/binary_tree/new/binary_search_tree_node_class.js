'use strict';

class BinarySearchTreeNodeClass {
    #key = null;
    #parent = null;

    #left = null;
    #right = null;

    get key() {
        return this.#key;
    }

    get parent() {
        return this.#parent;
    }

    get left() {
        return this.#left;
    }

    get right() {
        return this.#right;
    }

    set left(left) {
        this.#left = left;
    }

    set right(right) {
        this.#right = right;
    }

    constructor(key, parent = null) {
        this.#key = key;
        this.#parent = parent;
    }
}

module.exports = BinarySearchTreeNodeClass;
