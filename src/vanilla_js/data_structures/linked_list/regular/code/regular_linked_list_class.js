// external imports

// internal imports
const RegularLinkedListNodeClass = require('./regular_linked_list_node_class');

// implementation
class RegularLinkedListClass {
    #head = null;
    #count = 0;

    #comparator = (first, second) => first === second;

    findNode(element) {
        for (const node of this) {
            if (this.#comparator(element, node.element)) {
                return node;
            }
        }

        return null;
    }

    find(element) {
        return this.findNode(element)?.element;
    }

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
        return node;
    }

    insertBeforeHead(element) {
        const node = new RegularLinkedListNodeClass(element);
        node.next = this.head;

        this.#head = node;
        this.#count++;

        return node;
    }

    insertAfterNode(previousNode, element) {
        const node = new RegularLinkedListNodeClass(element);

        node.next = previousNode.next;
        previousNode.next = node;

        this.#count++;
        return node;
    }

    insert(element, index) {
        if (index >= 0 && index <= this.#count) {
            if (index === 0) {
                return this.insertBeforeHead(element);
            } else {
                const previous = this.getNodeAt(index - 1);
                return this.insertAfterNode(previous, element);
            }
        }

        return null;
    }

    removeHeadNode() {
        const node = this.#head;
        this.#head = node.next;

        const currentElement = node.element;
        node.abandon();

        this.#count--;
        return currentElement;
    }

    removeNextNode(previousNode) {
        const currentNode = previousNode.next
        previousNode.next = currentNode.next;

        const currentElement = currentNode.element;
        currentNode.abandon();

        this.#count--;
        return currentElement;
    }

    removeAt(index) {
        if (index >= 0 && index < this.#count) {
            if (index === 0) {
                return this.removeHeadNode();
            } else {
                const previous = this.getNodeAt(index - 1);
                return this.removeNextNode(previous);

            }
        }

        return null;
    }

    remove(element) {
        let previousNode = null;

        for (const node of this) {
            if (this.#comparator(element, node.element)) {
                if (previousNode === null) {
                    return this.removeHeadNode();
                } else {
                    return this.removeNextNode(previousNode);
                }
            }

            previousNode = node;
        }

        return null;
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

        let objString = `${this.#head.element.toString?.()}`;
        let current = this.#head.next;

        for (let nodeCounter = 1; nodeCounter < this.size && current !== null; nodeCounter++) {
            objString = `${objString},${current.element.toString?.() ?? current.element}`;
            current = current.next;
        }

        return objString;
    }

    toArray() {
        const elementsArray = [];

        for (const node of this) {
            elementsArray.push(node.element);
        }

        return elementsArray;
    }

    [Symbol.iterator]() {
        let nodeCounter = 0;
        let node = null;

        const linkedList = this;

        return {
            next: function() {
                if (nodeCounter >= linkedList.#count) {
                    return { done: true };
                } else if (nodeCounter === 0) {
                    nodeCounter += 1;
                    node = linkedList.#head;

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

    getNodeAt(index) {
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
            return this.getNodeAt(this.size - 1);
        } else {
            return null;
        }
    }

    set comparator(comparator) {
        this.#comparator = comparator;
    }

    constructor(comparator) {
        this.#comparator = comparator ?? this.#comparator;
    }
}

// exports
module.exports = RegularLinkedListClass;
