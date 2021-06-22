// external imports

// internal imports

// implementation
class RegularLinkedListNodeClass {
    #element = null;
    #next = null;

    destroy() {
        typeof this.#element === 'object' ? this.#element?.destroy() : null;
        typeof this.#next === 'object' ?  this.#next?.destroy() : null;

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
