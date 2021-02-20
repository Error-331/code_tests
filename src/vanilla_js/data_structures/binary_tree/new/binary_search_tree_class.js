'use strict';

const BinarySearchTreeNodeClass = require('./binary_search_tree_node_class');

class BinarySearchTreeClass {
    #root = null;

    #insertNode(parent, key) {
        if (key < parent.key) {
            if (parent.left === null) {
                parent.left = new BinarySearchTreeNodeClass(key);
            } else {
                this.#insertNode(node.left, key);
            }
        } else {
            if (parent.right === null) {
                parent.right = new BinarySearchTreeNodeClass(key);
            } else {
                this.#insertNode(parent.right, key);
            }
        }
    }

    insert(key) {
        if (this.#root === null) {
            this.#root = new BinarySearchTreeNodeClass(key);
        } else {
            this.#insertNode(this.#root, key);
        }
    }

    get root() {
        return this.#root;
    }

    constructor() {

    }
}
