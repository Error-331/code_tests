const assert = require('assert').strict;

const RegularLinkedListClass = require('./../code/regular_linked_list_class');
const {
    checkRegularLinkedListEmpty,
    checkRegularLinkedListNotEmpty,
    checkRegularLinkedListItemAt,
    checkRegularLinkedListIndexOf,
    checkRegularLinkedListFind,
    checkRegularLinkedListItems,
    checkRegularLinkedListIterator,
} = require('./../../../../../../utils/testing/data_structures/regular_linked_list_class_test_utils');

const { checkRegularLinkedListNodeDestroyed } = require('./../../../../../../utils/testing/data_structures/regular_linked_list_node_class_test_utils');

function testLinkedListEmptyCase() {
    const linkedListObj = new RegularLinkedListClass();
    checkRegularLinkedListEmpty(linkedListObj);
}

function testLinkedListEmptyNotEmptyCase() {
    const linkedListObj = new RegularLinkedListClass();

    linkedListObj.push(5);
    linkedListObj.push(7);
    linkedListObj.push(-1);
    linkedListObj.push(10);

    checkRegularLinkedListNotEmpty(linkedListObj, 4, 5, 10)
}

function testLinkedListPushCase1() {
    const linkedListObj = new RegularLinkedListClass();
    linkedListObj.push(5);

    checkRegularLinkedListNotEmpty(linkedListObj, 1, 5, 5);
    checkRegularLinkedListItems(linkedListObj, [5]);
}

function testLinkedListPushCase2() {
    const linkedListObj = new RegularLinkedListClass();

    linkedListObj.push(5);
    linkedListObj.push(7);
    linkedListObj.push(-1);
    linkedListObj.push(10);

    checkRegularLinkedListNotEmpty(linkedListObj, 4, 5, 10);
    checkRegularLinkedListItems(linkedListObj, [5, 7, -1, 10]);
}

function testLinkedListInsertCase1() {
    const linkedListObj = new RegularLinkedListClass();

    linkedListObj.push(5);
    linkedListObj.push(7);
    linkedListObj.push(-1);
    linkedListObj.push(10);

    checkRegularLinkedListNotEmpty(linkedListObj, 4, 5, 10);
    checkRegularLinkedListItems(linkedListObj, [5, 7, -1, 10]);

    linkedListObj.insert(55, 1);

    checkRegularLinkedListNotEmpty(linkedListObj, 5, 5, 10);
    checkRegularLinkedListItems(linkedListObj, [5, 55, 7, -1, 10]);
}

function testLinkedListInsertCase2() {
    const linkedListObj = new RegularLinkedListClass();

    linkedListObj.push(74);
    linkedListObj.push(1);
    linkedListObj.push(-65);
    linkedListObj.push(-2);
    linkedListObj.push(88);

    checkRegularLinkedListNotEmpty(linkedListObj, 5, 74, 88);
    checkRegularLinkedListItems(linkedListObj, [74, 1, -65, -2, 88]);

    linkedListObj.insert(32, 3);

    checkRegularLinkedListNotEmpty(linkedListObj, 6, 74, 88);
    checkRegularLinkedListItems(linkedListObj, [74, 1, -65, 32, -2, 88]);
}

function testLinkedListInsertCase3() {
    const linkedListObj = new RegularLinkedListClass();

    linkedListObj.push(5);
    linkedListObj.push(7);
    linkedListObj.push(-1);
    linkedListObj.push(10);

    checkRegularLinkedListNotEmpty(linkedListObj, 4, 5, 10);
    checkRegularLinkedListItems(linkedListObj, [5, 7, -1, 10]);

    linkedListObj.insert(55, 0);

    checkRegularLinkedListNotEmpty(linkedListObj, 5, 55, 10);
    checkRegularLinkedListItems(linkedListObj, [55, 5, 7, -1, 10]);
}

function testLinkedListInsertCase4() {
    const linkedListObj = new RegularLinkedListClass();

    linkedListObj.push(74);
    linkedListObj.push(1);
    linkedListObj.push(-65);
    linkedListObj.push(-2);
    linkedListObj.push(88);

    checkRegularLinkedListNotEmpty(linkedListObj, 5, 74, 88);
    checkRegularLinkedListItems(linkedListObj, [74, 1, -65, -2, 88]);

    linkedListObj.insert(32, 5);

    checkRegularLinkedListNotEmpty(linkedListObj, 6, 74, 32);
    checkRegularLinkedListItems(linkedListObj, [74, 1, -65, -2, 88, 32]);
}

function testLinkedListElementAtCase1() {
    const linkedListObj = new RegularLinkedListClass();

    linkedListObj.push(5);
    linkedListObj.push(7);
    linkedListObj.push(-1);
    linkedListObj.push(10);

    checkRegularLinkedListNotEmpty(linkedListObj, 4, 5, 10);

    checkRegularLinkedListItemAt(linkedListObj, 0, 5);
    checkRegularLinkedListItemAt(linkedListObj, 1, 7);
    checkRegularLinkedListItemAt(linkedListObj, 2, -1);
    checkRegularLinkedListItemAt(linkedListObj, 3, 10);
}

function testLinkedListElementAtCase2() {
    const linkedListObj = new RegularLinkedListClass();

    linkedListObj.push({key: 5, value: 65});
    linkedListObj.push({key: 7, value: -5});
    linkedListObj.push({key: -1, value: 65});
    linkedListObj.push({key: 10, value: -12});

    checkRegularLinkedListNotEmpty(linkedListObj, 4, {key: 5, value: 65}, {key: 10, value: -12});

    checkRegularLinkedListItemAt(linkedListObj, 0, {key: 5, value: 65});
    checkRegularLinkedListItemAt(linkedListObj, 1, {key: 7, value: -5});
    checkRegularLinkedListItemAt(linkedListObj, 2, {key: -1, value: 65});
    checkRegularLinkedListItemAt(linkedListObj, 3, {key: 10, value: -12});
}

function testLinkedListElementFindCase1() {
    const linkedListObj = new RegularLinkedListClass();

    linkedListObj.push(5);
    linkedListObj.push(7);
    linkedListObj.push(-1);
    linkedListObj.push(10);

    checkRegularLinkedListNotEmpty(linkedListObj, 4, 5, 10);

    checkRegularLinkedListFind(linkedListObj, 0, 5, 5);
    checkRegularLinkedListFind(linkedListObj, 1, 7, 7);
    checkRegularLinkedListFind(linkedListObj, 2, -1, -1);
    checkRegularLinkedListFind(linkedListObj, 3, 10, 10);
}

function testLinkedListElementFindCase2() {
    const comparator = (first, second) => first.value === second.value;

    const linkedListObj = new RegularLinkedListClass(comparator);

    linkedListObj.push({key: 5, value: 65});
    linkedListObj.push({key: 7, value: -5});
    linkedListObj.push({key: -1, value: 65});
    linkedListObj.push({key: 10, value: -12});

    checkRegularLinkedListNotEmpty(linkedListObj, 4, {key: 5, value: 65}, {key: 10, value: -12});

    checkRegularLinkedListFind(linkedListObj, 0, {key: 5, value: 65}, {key: 5, value: 65});
    checkRegularLinkedListFind(linkedListObj, 1, {key: 7, value: -5}, {key: 7, value: -5});
    checkRegularLinkedListFind(linkedListObj, 0, {key: -1, value: 65}, {key: 5, value: 65});
    checkRegularLinkedListFind(linkedListObj, 3, {key: 10, value: -12}, {key: 10, value: -12});
}

function testLinkedListElementFindCase3() {
    const comparator = (first, second) => first.key === second.key;

    const linkedListObj = new RegularLinkedListClass(comparator);

    linkedListObj.push({key: 5, value: 65});
    linkedListObj.push({key: 7, value: -5});
    linkedListObj.push({key: -1, value: 65});
    linkedListObj.push({key: 10, value: -12});

    checkRegularLinkedListNotEmpty(linkedListObj, 4, {key: 5, value: 65}, {key: 10, value: -12});

    checkRegularLinkedListFind(linkedListObj, 0, {key: 5, value: 65}, {key: 5, value: 65});
    checkRegularLinkedListFind(linkedListObj, 1, {key: 7, value: -5}, {key: 7, value: -5});
    checkRegularLinkedListFind(linkedListObj, 2, {key: -1, value: 65}, {key: -1, value: 65});
    checkRegularLinkedListFind(linkedListObj, 3, {key: 10, value: -12}, {key: 10, value: -12});
}

function testLinkedListElementIndexOfCase1() {
    const linkedListObj = new RegularLinkedListClass();

    linkedListObj.push(5);
    linkedListObj.push(7);
    linkedListObj.push(-1);
    linkedListObj.push(10);

    checkRegularLinkedListNotEmpty(linkedListObj, 4, 5, 10);

    checkRegularLinkedListIndexOf(linkedListObj, 0, 5, 5);
    checkRegularLinkedListIndexOf(linkedListObj, 1, 7, 7);
    checkRegularLinkedListIndexOf(linkedListObj, 2, -1, -1);
    checkRegularLinkedListIndexOf(linkedListObj, 3, 10, 10);
}

function testLinkedListElementIndexOfCase2() {
    const comparator = (first, second) => first.value === second.value;

    const linkedListObj = new RegularLinkedListClass(comparator);

    linkedListObj.push({key: 5, value: 65});
    linkedListObj.push({key: 7, value: -5});
    linkedListObj.push({key: -1, value: 65});
    linkedListObj.push({key: 10, value: -12});

    checkRegularLinkedListNotEmpty(linkedListObj, 4, {key: 5, value: 65}, {key: 10, value: -12});

    checkRegularLinkedListIndexOf(linkedListObj, 0, {key: 5, value: 65}, {key: 5, value: 65});
    checkRegularLinkedListIndexOf(linkedListObj, 1, {key: 7, value: -5}, {key: 7, value: -5});
    checkRegularLinkedListIndexOf(linkedListObj, 0, {key: -1, value: 65}, {key: 5, value: 65});
    checkRegularLinkedListIndexOf(linkedListObj, 3, {key: 10, value: -12}, {key: 10, value: -12});
}

function testLinkedListElementIndexOfCase3() {
    const comparator = (first, second) => first.key === second.key;

    const linkedListObj = new RegularLinkedListClass(comparator);

    linkedListObj.push({key: 5, value: 65});
    linkedListObj.push({key: 7, value: -5});
    linkedListObj.push({key: -1, value: 65});
    linkedListObj.push({key: 10, value: -12});

    checkRegularLinkedListNotEmpty(linkedListObj, 4, {key: 5, value: 65}, {key: 10, value: -12});

    checkRegularLinkedListIndexOf(linkedListObj, 0, {key: 5, value: 65}, {key: 5, value: 65});
    checkRegularLinkedListIndexOf(linkedListObj, 1, {key: 7, value: -5}, {key: 7, value: -5});
    checkRegularLinkedListIndexOf(linkedListObj, 2, {key: -1, value: 65}, {key: -1, value: 65});
    checkRegularLinkedListIndexOf(linkedListObj, 3, {key: 10, value: -12}, {key: 10, value: -12});
}

function testLinkedListRemoveAtCase1() {
    const linkedListObj = new RegularLinkedListClass();

    linkedListObj.push(5);
    linkedListObj.push(7);
    linkedListObj.push(-1);
    linkedListObj.push(10);

    checkRegularLinkedListNotEmpty(linkedListObj, 4, 5, 10);
    checkRegularLinkedListItems(linkedListObj, [5, 7, -1, 10]);

    linkedListObj.removeAt(2);

    checkRegularLinkedListNotEmpty(linkedListObj, 3, 5, 10);
    checkRegularLinkedListItems(linkedListObj, [5, 7, 10]);
}

function testLinkedListRemoveAtCase2() {
    const linkedListObj = new RegularLinkedListClass();

    linkedListObj.push(5);
    linkedListObj.push(7);
    linkedListObj.push(-1);
    linkedListObj.push(10);

    checkRegularLinkedListNotEmpty(linkedListObj, 4, 5, 10);
    checkRegularLinkedListItems(linkedListObj, [5, 7, -1, 10]);

    linkedListObj.removeAt(0);

    checkRegularLinkedListNotEmpty(linkedListObj, 3, 7, 10);
    checkRegularLinkedListItems(linkedListObj, [7, -1, 10]);
}

function testLinkedListRemoveAtCase3() {
    const linkedListObj = new RegularLinkedListClass();

    linkedListObj.push(5);
    linkedListObj.push(7);
    linkedListObj.push(-1);
    linkedListObj.push(10);

    checkRegularLinkedListNotEmpty(linkedListObj, 4, 5, 10);
    checkRegularLinkedListItems(linkedListObj, [5, 7, -1, 10]);

    linkedListObj.removeAt(3);

    checkRegularLinkedListNotEmpty(linkedListObj, 3, 5, -1);
    checkRegularLinkedListItems(linkedListObj, [5, 7, -1]);
}

function testLinkedListRemoveCase1() {
    const linkedListObj = new RegularLinkedListClass();

    linkedListObj.push(5);
    linkedListObj.push(7);
    linkedListObj.push(-1);
    linkedListObj.push(10);

    checkRegularLinkedListNotEmpty(linkedListObj, 4, 5, 10);

    checkRegularLinkedListIndexOf(linkedListObj, 0, 5, 5);
    checkRegularLinkedListIndexOf(linkedListObj, 1, 7, 7);
    checkRegularLinkedListIndexOf(linkedListObj, 2, -1, -1);
    checkRegularLinkedListIndexOf(linkedListObj, 3, 10, 10);

    linkedListObj.remove(-1);

    checkRegularLinkedListNotEmpty(linkedListObj, 3, 5, 10);

    checkRegularLinkedListIndexOf(linkedListObj, 0, 5, 5);
    checkRegularLinkedListIndexOf(linkedListObj, 1, 7, 7);
    checkRegularLinkedListIndexOf(linkedListObj, 2, 10, 10);
}

function testLinkedListRemoveCase2() {
    const comparator = (first, second) => first.value === second.value;

    const linkedListObj = new RegularLinkedListClass(comparator);

    linkedListObj.push({key: 5, value: 65});
    linkedListObj.push({key: 7, value: -5});
    linkedListObj.push({key: -1, value: 65});
    linkedListObj.push({key: 10, value: -12});

    checkRegularLinkedListNotEmpty(linkedListObj, 4, {key: 5, value: 65}, {key: 10, value: -12});

    checkRegularLinkedListIndexOf(linkedListObj, 0, {key: 5, value: 65}, {key: 5, value: 65});
    checkRegularLinkedListIndexOf(linkedListObj, 1, {key: 7, value: -5}, {key: 7, value: -5});
    checkRegularLinkedListIndexOf(linkedListObj, 0, {key: -1, value: 65}, {key: 5, value: 65});
    checkRegularLinkedListIndexOf(linkedListObj, 3, {key: 10, value: -12}, {key: 10, value: -12});

    linkedListObj.remove({key: -1, value: 65});

    checkRegularLinkedListNotEmpty(linkedListObj, 3, {key: 7, value: -5}, {key: 10, value: -12});

    checkRegularLinkedListIndexOf(linkedListObj, 0, {key: 7, value: -5}, {key: 7, value: -5});
    checkRegularLinkedListIndexOf(linkedListObj, 1, {key: -1, value: 65}, {key: -1, value: 65});
    checkRegularLinkedListIndexOf(linkedListObj, 2, {key: 10, value: -12}, {key: 10, value: -12});
}

function testLinkedListRemoveCase3() {
    const comparator = (first, second) => first.key === second.key;

    const linkedListObj = new RegularLinkedListClass(comparator);

    linkedListObj.push({key: 5, value: 65});
    linkedListObj.push({key: 7, value: -5});
    linkedListObj.push({key: -1, value: 65});
    linkedListObj.push({key: 10, value: -12});

    checkRegularLinkedListNotEmpty(linkedListObj, 4, {key: 5, value: 65}, {key: 10, value: -12});

    checkRegularLinkedListIndexOf(linkedListObj, 0, {key: 5, value: 65}, {key: 5, value: 65});
    checkRegularLinkedListIndexOf(linkedListObj, 1, {key: 7, value: -5}, {key: 7, value: -5});
    checkRegularLinkedListIndexOf(linkedListObj, 2, {key: -1, value: 65}, {key: -1, value: 65});
    checkRegularLinkedListIndexOf(linkedListObj, 3, {key: 10, value: -12}, {key: 10, value: -12});

    linkedListObj.remove({key: -1, value: 65});

    checkRegularLinkedListNotEmpty(linkedListObj, 3, {key: 5, value: 65}, {key: 10, value: -12});

    checkRegularLinkedListIndexOf(linkedListObj, 0, {key: 5, value: 65}, {key: 5, value: 65});
    checkRegularLinkedListIndexOf(linkedListObj, 1, {key: 7, value: -5}, {key: 7, value: -5});
    checkRegularLinkedListIndexOf(linkedListObj, 2, {key: 10, value: -12}, {key: 10, value: -12});
}

function testLinkedListIteratorCase1() {
    const linkedListObj = new RegularLinkedListClass();
    const linkedListValues = [5, 7, -1, 10];

    linkedListObj.push(linkedListValues[0]);
    linkedListObj.push(linkedListValues[1]);
    linkedListObj.push(linkedListValues[2]);
    linkedListObj.push(linkedListValues[3]);

    checkRegularLinkedListIterator(linkedListObj, linkedListValues);
}

function testLinkedListIteratorCase2() {
    const linkedListObj = new RegularLinkedListClass();
    const linkedListValues = [74, 1, -65, -2, 88];

    linkedListObj.push(linkedListValues[0]);
    linkedListObj.push(linkedListValues[1]);
    linkedListObj.push(linkedListValues[2]);
    linkedListObj.push(linkedListValues[3]);
    linkedListObj.push(linkedListValues[4]);

    checkRegularLinkedListIterator(linkedListObj, linkedListValues)
}

function testLinkedListToStringCase() {
    const linkedListObj = new RegularLinkedListClass();

    linkedListObj.push(5);
    linkedListObj.push(7);
    linkedListObj.push(-1);
    linkedListObj.push(10);

    checkRegularLinkedListNotEmpty(linkedListObj, 4, 5, 10);
    checkRegularLinkedListItems(linkedListObj, [5, 7, -1, 10]);

    assert.strictEqual(linkedListObj.toString(), '5,7,-1,10');
}

function testLinkedListDestroyedCase() {
    const linkedListObj = new RegularLinkedListClass();

    linkedListObj.push(5);
    linkedListObj.push(7);
    linkedListObj.push(-1);
    linkedListObj.push(10);

    checkRegularLinkedListNotEmpty(linkedListObj, 4, 5, 10);

    const iteratedLinkedListNodes = [];

    for (const node of linkedListObj) {
        iteratedLinkedListNodes.push(node);
    }

    linkedListObj.destroy();
    checkRegularLinkedListEmpty(linkedListObj);

    for (const node of iteratedLinkedListNodes) {
        checkRegularLinkedListNodeDestroyed(node);
    }
}

testLinkedListEmptyCase();
testLinkedListEmptyNotEmptyCase();

testLinkedListPushCase1();
testLinkedListPushCase2();

testLinkedListInsertCase1();
testLinkedListInsertCase2();
testLinkedListInsertCase3();
testLinkedListInsertCase4();

testLinkedListElementAtCase1();
testLinkedListElementAtCase2();

testLinkedListElementFindCase1();
testLinkedListElementFindCase2();
testLinkedListElementFindCase3();

testLinkedListElementIndexOfCase1();
testLinkedListElementIndexOfCase2();
testLinkedListElementIndexOfCase3();

testLinkedListRemoveAtCase1();
testLinkedListRemoveAtCase2();
testLinkedListRemoveAtCase3();

testLinkedListRemoveCase1();
testLinkedListRemoveCase2();
testLinkedListRemoveCase3();

testLinkedListIteratorCase1();
testLinkedListIteratorCase2();

testLinkedListToStringCase();
testLinkedListDestroyedCase();
