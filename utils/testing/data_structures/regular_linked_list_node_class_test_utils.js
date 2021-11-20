// external imports
const assert = require('assert').strict;

// internal imports

// implementation
function checkRegularLinkedListNodeDestroyed(linkedListNode) {
    assert.strictEqual(linkedListNode.element, null);
    assert.strictEqual(linkedListNode.next, null);
}

// exports
module.exports.checkRegularLinkedListNodeDestroyed = checkRegularLinkedListNodeDestroyed;
