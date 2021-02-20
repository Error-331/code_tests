// external imports

// internal imports

// implementation
class RegularLinkedListNodeClass {
    #element = null;
    #next = null;

    destroy() {
        this.#element?.destroy();
        this.#next?.destroy();

        this.#element = null;
        this.#next = null;
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
