// external imports

// internal imports

// implementation
class RegularLinkedListNodeClass {
    #element = null;
    #next = null;

    constructor(element) {
        this.#element = element;
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
}

// export
export { RegularLinkedListNodeClass };
export default RegularLinkedListNodeClass;
