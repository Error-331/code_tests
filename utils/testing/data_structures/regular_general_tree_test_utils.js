// external imports
const assert = require('assert').strict;

// internal imports

// implementation
function checkTree(tree, root) {
    assert.deepStrictEqual(tree.root, root);
}

// exports
module.exports.checkTree = checkTree;
