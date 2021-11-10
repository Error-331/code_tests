// external imports

// internal imports

// implementation
class RegularLinkedListNodeClass {
    #element = null;
    #next = null;

    clear() {
        this.#element = null;
    }

    unlink() {
        this.#next = null;
    }

    abandon() {
        this.clear();
        this.unlink();
    }

    destroy() {
        typeof this.#element === 'object' ? this.#element?.destroy() : null;
        typeof this.#next === 'object' ?  this.#next?.destroy() : null;

        this.abandon();
    }

    get element() {
        return this.#element;
    }

    get next() {
        return this.#next;
    }

    set next(node) {
        this.#next = node;
    }

    constructor(element) {
        this.#element = element;
    }
}

// export
module.exports = RegularLinkedListNodeClass;
