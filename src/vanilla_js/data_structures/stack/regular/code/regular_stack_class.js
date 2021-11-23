// external imports

// internal imports

// implementation
class RegularStackClass {
    #count = 0;
    #items = {};

    push(element) {
        this.#items[this.#count] = element;
        this.#count += 1;
    }

    pop() {
        if (this.isEmpty) {
            return null;
        }

        this.#count -= 1;

        const result = this.#items[this.#count];
        delete this.#items[this.#count];

        return result;
    }

    peek() {
        if (this.isEmpty) {
            return null;
        }

        return this.#items[this.#count - 1];
    }

    clear() {
        this.#items = {};
        this.#count = 0;
    }

    [Symbol.iterator]() {
        let nextItemId = this.#count - 1;
        const stack = this;

        return {
            next: function() {
                if (stack.size === 0 || nextItemId < 0) {
                    return {done: true};
                } else {
                    const id = nextItemId;
                    const item = stack.#items[nextItemId];

                    nextItemId -= 1;

                    return {value: {id, item}, done: false}
                }
            }
        }
    }

    get isEmpty() {
        return this.#count === 0;
    }

    get size() {
        return this.#count;
    }

    constructor() {
    }
}

// export
module.exports = RegularStackClass;
