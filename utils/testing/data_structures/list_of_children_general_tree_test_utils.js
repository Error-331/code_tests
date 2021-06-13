const assert = require('assert').strict;

function checkTreeNodeCount(tree, count) {
    assert.strictEqual(tree.nodeCount, count);
}

function checkCleanTree(tree) {
    assert.strictEqual(tree.nodeCount, 0);
}

module.exports.checkTreeNodeCount = checkTreeNodeCount;
module.exports.checkCleanTree = checkCleanTree;
