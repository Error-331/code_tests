// external imports

// internal imports

// implementation
class RegularGraphVertexClass {
    #id = null;
    #data = null;

    destroy() {
        typeof this.#data === 'object' ? this.#data?.destroy() : null;

        this.#id = null;
        this.#data = null;
    }

    serialize() {
        return {
            id: this.#id,
            data: this.#data
        }
    }

    toString() {
        return `{id: ${this.#id}, data: ${this.#data}}`;
    }

    get id() {
        return this.#id;
    }

    get data() {
        return this.#data;
    }

    constructor(id, data) {
        this.#id = id;
        this.#data = data;
    }
}

// exports
module.exports = RegularGraphVertexClass;
