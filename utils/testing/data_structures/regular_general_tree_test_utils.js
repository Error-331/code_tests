const assert = require('assert').strict;

function checkTree(tree, root) {
    assert.deepStrictEqual(tree.root, root);
}

module.exports.checkTree = checkTree;
