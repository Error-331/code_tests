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

    assert.deepStrictEqual(linkedList.head.element.serialize?.() ?? linkedList.head.element, head.serialize?.() ?? head);
    assert.deepStrictEqual(linkedList.lastChild.element.serialize?.() ?? linkedList.lastChild.element, lastChild.serialize?.() ?? lastChild);
}

function checkRegularLinkedListElement(listElement, testElement) {
    assert.deepStrictEqual(testElement.serialize?.() ?? testElement, listElement.serialize?.() ?? listElement);
}

function checkRegularLinkedListItem(listNode, testNode) {
    checkRegularLinkedListElement(testNode.element.serialize?.() ?? testNode.element, listNode.element.serialize?.() ?? listNode.element);
}

function checkRegularLinkedListItemAt(linkedList, itemIndex, testItem) {
    const linkedListItem = linkedList.getNodeAt(itemIndex);
    checkRegularLinkedListElement(testItem, linkedListItem.element);
}

function checkRegularLinkedListFind(linkedList, itemIndex, testItemSearch, testItemStored) {
    checkRegularLinkedListItemAt(linkedList, itemIndex, testItemStored);

    const linkedListItem = linkedList.find(testItemSearch);
    assert.deepStrictEqual(linkedListItem.serialize?.() ?? linkedListItem, testItemStored.serialize?.() ?? testItemStored);
}

function checkRegularLinkedListIndexOf(linkedList, itemIndex, testItemSearch, testItemStored) {
    checkRegularLinkedListItemAt(linkedList, itemIndex, testItemStored);

    const linkedListItemIndex = linkedList.indexOf(testItemSearch);

    assert.strictEqual(linkedListItemIndex, itemIndex);
    checkRegularLinkedListItemAt(linkedList, linkedListItemIndex, testItemStored);
}

function checkRegularLinkedListItems(linkedList, testItems = []) {
    const testItemsLength = testItems.length;
    assert.strictEqual(linkedList.size, testItemsLength);

    for (let itemsCnt = 0; itemsCnt < testItemsLength; itemsCnt++) {
        const testItem = testItems[itemsCnt];
        const linkedListItem = linkedList.getNodeAt(itemsCnt).element;

        assert.deepStrictEqual(testItem.serialize?.() ?? testItem, linkedListItem.serialize?.() ?? linkedListItem);
    }
}

function checkRegularLinkedListIterator(linkedList, testItems = []) {
    const iteratedLinkedListItems = [];

    for (const node of linkedList) {
        iteratedLinkedListItems.push(node.element.serialize?.() ?? node.element);
    }

    assert.deepStrictEqual(testItems, iteratedLinkedListItems);
}

module.exports.checkRegularLinkedListEmpty = checkRegularLinkedListEmpty;
module.exports.checkRegularLinkedListNotEmpty = checkRegularLinkedListNotEmpty;

module.exports.checkRegularLinkedListElement = checkRegularLinkedListElement;
module.exports.checkRegularLinkedListItem = checkRegularLinkedListItem;
module.exports.checkRegularLinkedListFind = checkRegularLinkedListFind;
module.exports.checkRegularLinkedListItemAt = checkRegularLinkedListItemAt;
module.exports.checkRegularLinkedListIndexOf = checkRegularLinkedListIndexOf;

module.exports.checkRegularLinkedListItems = checkRegularLinkedListItems;
module.exports.checkRegularLinkedListIterator = checkRegularLinkedListIterator;
