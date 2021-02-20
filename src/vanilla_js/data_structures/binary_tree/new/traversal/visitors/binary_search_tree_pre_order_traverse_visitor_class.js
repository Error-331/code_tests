'use strict';

const { BinarySearchTreeBaseTraverseVisitorClass } = require('./binary_search_tree_base_traverse_visitor_class');

class BinarySearchTreePreOrderTraverseVisitorClass extends BinarySearchTreeBaseTraverseVisitorClass{
    #preOrderTraverseNode(node) {
        if (node !== undefined && node !== null) {
            this.printNodeKey(node.key);
            this.#preOrderTraverseNode(node.left, callback);
            this.#preOrderTraverseNode(node.right, callback);
        }
    }

    traverse(binarySearchTree) {
        this.printRoot(binarySearchTree);
        this.#preOrderTraverseNode(binarySearchTree?.root);
    }
}

module.exports = BinarySearchTreePreOrderTraverseVisitorClass;
