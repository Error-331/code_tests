// external imports
const assert = require('assert').strict;

// internal imports

// implementation
function checkNodeBase(node, id, key, parent, isLeaf) {
    assert.strictEqual(node.id, id);
    assert.strictEqual(node.key, key);

    assert.strictEqual(node.parent, parent);
    assert.strictEqual(node.isLeaf, isLeaf);
}

function checkNodeChildSibling(node, nodeSpec) {
    if (nodeSpec === null) {
        assert.strictEqual(node, null);
    } else {
        const { id, key, parent, isLeaf } = nodeSpec;
        return checkNodeBase(node, id, key, parent, isLeaf);
    }
}

// exports
module.exports.checkNodeBase = checkNodeBase;
module.exports.checkNodeChildSibling = checkNodeChildSibling;
