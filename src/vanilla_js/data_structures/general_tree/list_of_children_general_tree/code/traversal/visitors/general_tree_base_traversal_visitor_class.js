'use strict';

class GeneralTreeBaseTraverseVisitorClass {
    printRootKey(node) {
        console.log('Root:', node?.key ?? 'no root node');
    }

    printNodeKey(key) {
        console.log(key, ' ');
    }
}

module.exports = GeneralTreeBaseTraverseVisitorClass;
