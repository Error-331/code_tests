'use strict';

const { BinarySearchTreeBaseTraverseVisitorClass } = require('./binary_search_tree_base_traverse_visitor_class');

class BinarySearchTreeInOrderTraverseVisitorClass extends BinarySearchTreeBaseTraverseVisitorClass{
    #inOrderTraverseNode(node) {
        if (node !== undefined && node !== null) {
            this.#inOrderTraverseNode(node.left, callback);
            this.printNodeKey(node.key);
            this.#inOrderTraverseNode(node.right, callback);
        }
    }

    traverse(binarySearchTree) {
        this.printRoot(binarySearchTree);
        this.#inOrderTraverseNode(binarySearchTree?.root);
    }

}

module.exports = BinarySearchTreeInOrderTraverseVisitorClass;
