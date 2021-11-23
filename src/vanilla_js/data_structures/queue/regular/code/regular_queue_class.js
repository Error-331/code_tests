// external imports

// local imports

// implementation
class RegularQueueClass {
    #itemsCount = 0;
    #nextItemId = 0;
    #items = {};

    enqueue(item) {
        this.#items[this.#itemsCount] = item;
        this.#itemsCount++;
    }

    dequeue() {
        if (this.isEmpty) {
            return null;
        }

        const result = this.#items[this.#nextItemId];
        delete this.#items[this.#nextItemId];

        this.#nextItemId++;

        if (this.#nextItemId >= this.#itemsCount) {
            this.clear();
        }

        return result;
    }

    peek() {
        if (this.isEmpty) {
            return null;
        }
        return this.#items[this.#nextItemId];
    }

    clear() {
        this.#items = {};
        this.#itemsCount = 0;
        this.#nextItemId = 0;
    }

    [Symbol.iterator]() {
        let nextItemId = this.#nextItemId;
        const queue = this;

        return {
            next: function () {
                if (nextItemId >= queue.#itemsCount) {
                    return {done: true};
                } else {
                    const id = nextItemId;
                    const item = queue.#items[nextItemId];

                    nextItemId += 1;

                    return {value: {id, item}, done: false};
                }
            }
        }
    }

    get size() {
        return this.#itemsCount - this.#nextItemId;
    }

    get isEmpty() {
        return this.size === 0;
    }

    get nextItemId() {
        return this.#nextItemId;
    }

    constructor() {
    }
}

// export
module.exports = RegularQueueClass;
