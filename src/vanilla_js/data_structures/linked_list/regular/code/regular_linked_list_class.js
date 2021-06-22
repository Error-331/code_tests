// external imports

// internal imports
const RegularLinkedListNodeClass = require('./regular_linked_list_node_class');

// implementation
class RegularLinkedListClass {
    #head = null;
    #count = 0;

    #comparator = (first, second) => first === second;

    indexOf(element) {
        let current = this.#head;

        for (let nodeCounter = 0; nodeCounter < this.#count && current !== null; nodeCounter++) {
            if (this.#comparator(element, current.element)) {
                return nodeCounter;
            }

            current = current.next;
        }

        return -1;
    }

    push(element) {
        const node = new RegularLinkedListNodeClass(element);

        if (this.#head == null) {
            this.#head = node;
        } else {
            let current = this.#head;

            while (current.next !== null) {
                current = current.next;
            }

            current.next = node;
        }

        this.#count++;
    }

    removeAt(index) {
        if (index >= 0 && index < this.#count) {
            let current = this.#head;

            if (index === 0) {
                this.#head = current.next;
            } else {
                const previous = this.getElementAt(index - 1);
                current = previous.next;
                previous.next = current.next;
            }

            this.#count--;
            return current.element;
        }

        return null;
    }

    insert(element, index) {
        if (index >= 0 && index <= this.#count) {
            const node = new RegularLinkedListNodeClass(element);

            if (index === 0) {
                node.next = this.head;
                this.#head = node;
            } else {
                const previous = this.getElementAt(index - 1);

                node.next = previous.next;
                previous.next = node;
            }

            this.#count++;
            return node;
        }

        return null;
    }

    remove(element) {
        const index = this.indexOf(element);
        return this.removeAt(index);
    }

    destroy() {
        this.#head?.destroy();
        this.#head = null;
        this.#count = 0;

        this.#comparator = null;
    }

    toString() {
        if (this.#head == null) {
            return '';
        }

        let objString = `${this.#head.element}`;
        let current = this.#head.next;

        for (let nodeCounter = 1; nodeCounter < this.size && current !== null; nodeCounter++) {
            objString = `${objString},${current.element}`;
            current = current.next;
        }

        return objString;
    }

    [Symbol.iterator]() {
        let nodeCounter = 0;
        let node = null;

        return {
            next: () => {
                if (nodeCounter >= this.#count) {
                    return { done: true };
                } else if (nodeCounter === 0) {
                    nodeCounter += 1;
                    node = this.#head;

                    return node === null ? { done: true } : { value: node, done: false };
                } else {
                    node = node.next;

                    if (node === null) {
                        return { done: true };
                    } else {
                        nodeCounter += 1;
                        return { value: node, done: false };
                    }
                }
            }
        }
    }

    getElementAt(index) {
        if (index >= 0 && index <= this.#count) {
            let node = this.#head;

            for (let nodeCounter = 0; nodeCounter < index && node !== null; nodeCounter++) {
                node = node.next;
            }

            return node;
        }

        return null;
    }

    get comparator() {
        return this.#comparator;
    }

    get size() {
        return this.#count;
    }

    get isEmpty() {
        return this.size === 0;
    }

    get head() {
        return this.#head;
    }

    get lastChild() {
        if (!this.isEmpty) {
            return this.getElementAt(this.size - 1);
        } else {
            return null;
        }
    }

    constructor(comparator) {
        this.#comparator = comparator ?? this.#comparator;
    }
}

module.exports = RegularLinkedListClass;
