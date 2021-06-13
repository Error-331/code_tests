const assert = require('assert').strict;

function checkRegularLinkedListEmpty(linkedList) {
    assert.strictEqual(linkedList.size, 0);
    assert.strictEqual(linkedList.isEmpty, true);
    assert.strictEqual(linkedList.head, null);
    assert.strictEqual(linkedList.lastChild, null);
}

function checkRegularLinkedListNotEmpty(linkedList, size, head, lastChild) {
    assert.strictEqual(linkedList.size, size);
    assert.strictEqual(linkedList.isEmpty, false);
    assert.deepStrictEqual(linkedList.head.element, head);
    assert.deepStrictEqual(linkedList.lastChild.element, lastChild);
}

module.exports.checkRegularLinkedListEmpty = checkRegularLinkedListEmpty;
module.exports.checkRegularLinkedListNotEmpty = checkRegularLinkedListNotEmpty;
