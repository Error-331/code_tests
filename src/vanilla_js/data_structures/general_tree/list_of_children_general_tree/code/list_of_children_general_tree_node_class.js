'use strict';

const RegularLinkedListClass = require('../../../linked_list/regular/code/regular_linked_list_class');

class ListOfChildrenGeneralTreeNodeClass {
    #tree = null;

    #id = null;
    #key = null;

    #parent = null;
    #childrenLinkedList = null;

    insertFirst(key) {
        const newNode = new ListOfChildrenGeneralTreeNodeClass(this.#tree, this.#tree.nextNodeId, key, this, this.#childrenLinkedList.comparator);

        this.#tree.addNodeToNodeList(newNode);
        this.#childrenLinkedList.insert(newNode, 0);

        return newNode;
    }

    insertNext(key) {
        const newNode = new ListOfChildrenGeneralTreeNodeClass(this.#tree, this.#tree.nextNodeId, key, this, this.#childrenLinkedList.comparator);

        this.#tree.addNodeToNodeList(newNode);
        this.#childrenLinkedList.push(newNode);

        return newNode;
    }

    removeFirst() {
        if (this.#childrenLinkedList.head !== null) {
            const node = this.#childrenLinkedList.head;

            this.#tree.removeFromNodeListById(node.id);
            node.destroy();

            this.#childrenLinkedList.removeAt(0);
            return true;
        } else {
            return false;
        }
    }

    removeNext() {
        if (this.#childrenLinkedList.isEmpty !== true) {
            const node = this.#childrenLinkedList.lastChild;

            this.#tree.removeFromNodeListById(node.id);
            node.destroy();

            this.#childrenLinkedList.removeAt(this.#childrenLinkedList.size - 1);
            return true;
        } else {
            return false;
        }
    }

    destroy() {
        this.#tree.removeFromNodeListById(this.#id);

        this.#id = null;
        this.#key = null;

        this.#parent = null;

        this.#childrenLinkedList.destroy();
        this.#childrenLinkedList = null;
    }

    findChildBy(comparator) {
        let isFound = false;

        for (const child of this.#childrenLinkedList) {
            if (typeof comparator === 'function') {
                isFound = comparator(child.element);
            } else {
                isFound = comparator === child.element;
            }

            if (isFound) {
                return child;
            }
        }
    }

    childrenIterator() {
        if (this.#childrenLinkedList === null) {
            return {
                next: () => {
                    return {done: true};
                }
            }
        } else {
            return this.#childrenLinkedList[Symbol.iterator];
        }
    }

    getChildAt(index) {
        return this.#childrenLinkedList.getElementAt(index);
    }

    get id() {
        return this.#id;
    }

    get key() {
        return this.#key;
    }

    get parent() {
        return this.#parent;
    }

    get parentId() {
        return this.#parent?.id ?? null;
    }

    get isLeaf() {
        return this.#childrenLinkedList?.isEmpty ?? true;
    }

    get leftmostChild() {
        if (!this.isLeaf) {
            return this.#childrenLinkedList?.head;
        } else {
            return null;
        }
    }

    get rightSibling() {
        if (this.#parent === null) {
            return null;
        } else {
            return this.#parent.lastChild;
        }
    }

    set id(id) {
        this.#id = id;
    }

    set key(key) {
        this.#key = key;
    }

    set parent(parent) {
        this.#parent = parent;
    }

    constructor(tree, id, key, parent, comparator) {
        this.#tree = tree;

        this.#id = id;
        this.#key = key;

        this.#parent = parent;

        this.#childrenLinkedList = new RegularLinkedListClass(comparator);
    }
}

module.exports = ListOfChildrenGeneralTreeNodeClass;
