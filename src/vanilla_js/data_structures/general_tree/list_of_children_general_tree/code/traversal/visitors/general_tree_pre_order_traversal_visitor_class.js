'use strict';

const GeneralTreeBaseTraverseVisitorClass = require('./general_tree_base_traversal_visitor_class');

class GeneralTreePreOrderTraversalVisitorClass extends GeneralTreeBaseTraverseVisitorClass {
    traverse(currentNode) {
        if (currentNode.parent === null) {
            this.printRootKey(currentNode)
        } else {
            this.printNodeKey(currentNode)
        }

        if (!currentNode.isLeaf()) {
            let tempNode = currentNode.leftmostChild();

            while (tempNode !== null) {
                this.traverse(tempNode);
                tempNode = tempNode.rightSibling();
            }
        }
    }
}
