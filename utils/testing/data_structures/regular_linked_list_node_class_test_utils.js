const assert = require('assert').strict;

function checkRegularLinkedListNodeDestroyed(linkedListNode) {
    assert.strictEqual(linkedListNode.element, null);
    assert.strictEqual(linkedListNode.next, null);
}

module.exports.checkRegularLinkedListNodeDestroyed = checkRegularLinkedListNodeDestroyed;
