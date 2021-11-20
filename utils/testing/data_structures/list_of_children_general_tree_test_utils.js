// external imports
const assert = require('assert').strict;

// internal imports

// implementation
function checkTreeNodeCount(tree, count) {
    assert.strictEqual(tree.nodeCount, count);
}

function checkCleanTree(tree) {
    assert.strictEqual(tree.nodeCount, 0);
}

// exports
module.exports.checkTreeNodeCount = checkTreeNodeCount;
module.exports.checkCleanTree = checkCleanTree;
