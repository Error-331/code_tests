'use strict';

class BinarySearchTreeBaseTraverseVisitorClass {
    printRoot(binarySearchTree) {
        console.log('Root:', binarySearchTree?.root?.key ?? 'no root node');
    }

    printNodeKey(key) {
        console.log(key, ' ');
    }
}

module.exports = BinarySearchTreeBaseTraverseVisitorClass;
