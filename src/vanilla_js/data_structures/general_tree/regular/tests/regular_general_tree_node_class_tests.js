const assert = require('assert').strict;

const RegularGeneralTreeClass = require('./../code/regular_general_tree_class');
const RegularGeneralTreeNodeClass = require('./../code/regular_general_tree_node_class');

const {
    prepareDataForIterationTest,
    checkNode,
    checkRegularGeneralTreeNodeChildrenIterator,
    checkRegularGeneralTreeDestroyedNodeChildrenIterator
} = require('./../../../../../../utils/testing/data_structures/regular_general_tree_node_test_utils');

function testRegularGeneralTreeNodeCreatedSuccessfullyCase1() {
    let tree = new RegularGeneralTreeClass();
    let node = null;

    const data = 'test_val1';

    try {
        node = new RegularGeneralTreeNodeClass(tree, null, null, data);
    } catch (error) {
        assert.fail(`Cannot create a node; ${error.message}`);
    }

    checkNode(node, tree, null, data);
}

function testRegularGeneralTreeNodeCreatedSuccessfullyCase2() {
    let tree = new RegularGeneralTreeClass();
    let node = null;

    const data = 5;

    try {
        node = new RegularGeneralTreeNodeClass(tree, null, null, data);
    } catch (error) {
        assert.fail(`Cannot create a node; ${error.message}`);
    }

    checkNode(node, tree, null, data);
}

function testRegularGeneralTreeNodeCreatedSuccessfullyCase3() {
    let tree = new RegularGeneralTreeClass();

    let childNode = null;
    let parentNode = null;

    const data1 = 15;
    const data2 = 'test_val1';

    try {
        parentNode = new RegularGeneralTreeNodeClass(tree, null, null, data1);
        childNode = new RegularGeneralTreeNodeClass(tree, parentNode, null, data2);
    } catch (error) {
        assert.fail(`Cannot create a node; ${error.message}`);
    }

    checkNode(parentNode, tree, null, data1);
    checkNode(childNode, tree, parentNode, data2);
}

function testRegularGeneralTreeNodeSetDataCase1() {
    const data1 = 5;
    const data2 = 'test_val1';

    const tree = new RegularGeneralTreeClass();
    const node = new RegularGeneralTreeNodeClass(tree, null, null, data1);

    checkNode(node, tree, null, data1);

    node.data = data2;
    checkNode(node, tree, null, data2);
}

function testRegularGeneralTreeNodeSetDataCase2() {
    const data1 = 'test_val1';
    const data2 = 54;

    const tree = new RegularGeneralTreeClass();
    const node = new RegularGeneralTreeNodeClass(tree, null, null, data1);

    checkNode(node, tree, null, data1);

    node.data = data2;
    checkNode(node, tree, null, data2);
}

function testRegularGeneralTreeNodeGetChildAtCase1() {
    const data = 'test_val1';
    const childData = [5, 10, -5, 'test_val1'];
    const testIndex = 2;

    const tree = new RegularGeneralTreeClass();
    const parentNode = new RegularGeneralTreeNodeClass(tree, null, null, data);

    for (const childDataItem of childData) {
        parentNode.addChild(childDataItem);
    }

    const childNodeAtIndex = parentNode.getChildAt(testIndex);
    checkNode(childNodeAtIndex, tree, parentNode, childData[testIndex]);
}

function testRegularGeneralTreeNodeGetChildAtCase2() {
    const data = 'test_val1';
    const childData = [5, 10, -5, 'test_val1'];
    const testIndex = 3;

    const tree = new RegularGeneralTreeClass();
    const parentNode = new RegularGeneralTreeNodeClass(tree, null, null, data);

    for (const childDataItem of childData) {
        parentNode.addChild(childDataItem);
    }

    const childNodeAtIndex = parentNode.getChildAt(testIndex);
    checkNode(childNodeAtIndex, tree, parentNode, childData[testIndex]);
}

function testRegularGeneralTreeNodeGetChildAtCase3() {
    const data = 'test_val1';
    const childData = [5, 10, -5, 'test_val1'];
    const testIndex = 6;

    const tree = new RegularGeneralTreeClass();
    const parentNode = new RegularGeneralTreeNodeClass(tree, null, null, data);

    for (const childDataItem of childData) {
        parentNode.addChild(childDataItem);
    }

    const childNodeAtIndex = parentNode.getChildAt(testIndex);
    assert.strictEqual(childNodeAtIndex, undefined);
}

function testRegularGeneralTreeIsLeafCase1() {
    const data1 = 5;
    const data2 = 'test_val1';

    const tree = new RegularGeneralTreeClass();
    const parentNode = new RegularGeneralTreeNodeClass(tree, null, null, data1);

    checkNode(parentNode, tree, null, data1);
    assert.strictEqual(parentNode.isLeaf, true);

    const childNode = parentNode.addChild(data2);
    assert.strictEqual(parentNode.isLeaf, false);

    checkNode(childNode, tree, parentNode, data2);
    assert.strictEqual(childNode.isLeaf, true);
}

function testRegularGeneralTreeIsLeafCase2() {
    const data1 = 5;
    const data2 = 'test_val1';

    const tree = new RegularGeneralTreeClass();
    const parentNode = new RegularGeneralTreeNodeClass(tree, null, null, data1);

    checkNode(parentNode, tree, null, data1);
    assert.strictEqual(parentNode.isLeaf, true);

    const childNode = new RegularGeneralTreeNodeClass(tree, parentNode, null, data2);
    assert.strictEqual(parentNode.isLeaf, true);

    checkNode(childNode, tree, parentNode, data2);
    assert.strictEqual(childNode.isLeaf, true);
}

function testRegularGeneralTreeNodeGetLeftmostChildCase1() {
    const data1 = 5;
    const data2 = 'test_val1';
    const data3 = 'test_val2';

    const tree = new RegularGeneralTreeClass();
    const parentNode = new RegularGeneralTreeNodeClass(tree, null, null, data1);

    checkNode(parentNode, tree, null, data1);

    const childNode1 = parentNode.addChild(data2);
    const childNode2 = parentNode.addChild(data3);

    checkNode(childNode1, tree, parentNode, data2);
    checkNode(childNode2, tree, parentNode, data3);

    const leftmostChild = parentNode.leftmostChild;
    checkNode(leftmostChild, tree, parentNode, data2);
}

function testRegularGeneralTreeNodeGetLeftmostChildCase2() {
    const data1 = 43;
    const data2 = 'test_val_5';
    const data3 = 'test_val_7';

    const tree = new RegularGeneralTreeClass();
    const parentNode = new RegularGeneralTreeNodeClass(tree, null, null, data1);

    checkNode(parentNode, tree, null, data1);

    const childNode1 = parentNode.addChild(data2);
    const childNode2 = parentNode.addChild(data3);

    checkNode(childNode1, tree, parentNode, data2);
    checkNode(childNode2, tree, parentNode, data3);

    const leftmostChild = parentNode.leftmostChild;
    checkNode(leftmostChild, tree, parentNode, data2);
}

function testRegularGeneralTreeNodeGetLeftmostChildCase3() {
    const data1 = 43;

    const tree = new RegularGeneralTreeClass();
    const parentNode = new RegularGeneralTreeNodeClass(tree, null, null, data1);

    checkNode(parentNode, tree, null, data1);

    const leftmostChild = parentNode.leftmostChild;
    assert.strictEqual(leftmostChild, null);
}

function testRegularGeneralTreeNodeGetRightmostChildCase1() {
    const data1 = 5;
    const data2 = 'test_val1';
    const data3 = 'test_val2';

    const tree = new RegularGeneralTreeClass();
    const parentNode = new RegularGeneralTreeNodeClass(tree, null, null, data1);

    checkNode(parentNode, tree, null, data1);

    const childNode1 = parentNode.addChild(data2);
    const childNode2 = parentNode.addChild(data3);

    checkNode(childNode1, tree, parentNode, data2);
    checkNode(childNode2, tree, parentNode, data3);

    const rightmostChild = parentNode.rightmostChild;
    checkNode(rightmostChild, tree, parentNode, data3);
}

function testRegularGeneralTreeNodeGetRightmostChildCase2() {
    const data1 = 43;
    const data2 = 'test_val_5';
    const data3 = 'test_val_7';

    const tree = new RegularGeneralTreeClass();
    const parentNode = new RegularGeneralTreeNodeClass(tree, null, null, data1);

    checkNode(parentNode, tree, null, data1);

    const childNode1 = parentNode.addChild(data2);
    const childNode2 = parentNode.addChild(data3);

    checkNode(childNode1, tree, parentNode, data2);
    checkNode(childNode2, tree, parentNode, data3);

    const rightmostChild = parentNode.rightmostChild;
    checkNode(rightmostChild, tree, parentNode, data3);
}

function testRegularGeneralTreeNodeGetRightmostChildCase3() {
    const data1 = 43;

    const tree = new RegularGeneralTreeClass();
    const parentNode = new RegularGeneralTreeNodeClass(tree, null, null, data1);

    checkNode(parentNode, tree, null, data1);

    const rightmostChild = parentNode.rightmostChild;
    assert.strictEqual(rightmostChild, null);
}

function testRegularGeneralTreeNodeFindChildByDataCase1() {
    const data = 'test_val1';
    const childData = [5, 10, -5, 'test_val1'];

    const tree = new RegularGeneralTreeClass();
    const parentNode = new RegularGeneralTreeNodeClass(tree, null, null, data);
    const [ dataForTest ] = prepareDataForIterationTest(tree, parentNode, childData);

    const requiredNode = parentNode.findChildByData(-5);
    checkNode(requiredNode, ...dataForTest[2]);
}

function testRegularGeneralTreeNodeFindChildByDataCase2() {
    const data = 'test_val1';
    const childData = [5, 10, -5, 'test_val1'];

    const tree = new RegularGeneralTreeClass();
    const parentNode = new RegularGeneralTreeNodeClass(tree, null, null, data);
    const [ dataForTest ] = prepareDataForIterationTest(tree, parentNode, childData);

    const requiredNode = parentNode.findChildByData('test_val1');
    checkNode(requiredNode, ...dataForTest[3]);
}

function testRegularGeneralTreeNodeFindChildByDataCase3() {
    const data = 'test_val1';
    const childData = [5, 10, -5, 'test_val1'];

    const tree = new RegularGeneralTreeClass();
    const parentNode = new RegularGeneralTreeNodeClass(tree, null, null, data);
    prepareDataForIterationTest(tree, parentNode, childData);

    const requiredNode = parentNode.findChildByData(543);
    assert.strictEqual(requiredNode, null);
}

function testRegularGeneralTreeNodeChildrenIteratorCase1() {
    const data = 'test_val1';
    const childData = [5, 10, -5, 'test_val1'];

    const tree = new RegularGeneralTreeClass();
    const parentNode = new RegularGeneralTreeNodeClass(tree, null, null, data);
    const [ dataForTest ] = prepareDataForIterationTest(tree, parentNode, childData);

    checkRegularGeneralTreeNodeChildrenIterator(parentNode, dataForTest);
}

function testRegularGeneralTreeNodeChildrenIteratorCase2() {
    const data = 'test_val1';
    const childData = [{prop1: 'test_sub_prop1'}, 64, null, 'test_val2'];

    const tree = new RegularGeneralTreeClass();
    const parentNode = new RegularGeneralTreeNodeClass(tree, null, null, data);
    const [ dataForTest ] = prepareDataForIterationTest(tree, parentNode, childData);

    checkRegularGeneralTreeNodeChildrenIterator(parentNode, dataForTest);
}

function testRegularGeneralTreeNodeDestroyedCase1() {
    const data = 'test_val1';
    const childData = [5, 10, -5, 'test_val1'];

    const tree = new RegularGeneralTreeClass();
    const parentNode = new RegularGeneralTreeNodeClass(tree, null, null, data);
    const [ dataForTest, childNodes ] = prepareDataForIterationTest(tree, parentNode, childData);

    checkRegularGeneralTreeNodeChildrenIterator(parentNode, dataForTest);
    parentNode.destroy();

    checkRegularGeneralTreeDestroyedNodeChildrenIterator(parentNode, childNodes);
}

function testRegularGeneralTreeNodeDestroyedCase2() {
    const data = 'test_val1';
    const childData = [
        {
            prop1 : 'test_sub_val1',
            destroy: function() { this.prop1 = null }
        },

        {
            prop1 : 'test_sub_val2',
            destroy: function() { this.prop1 = null }
        },

        {
            prop1 : 'test_sub_val3',
            destroy: function() { this.prop1 = null }
        }
    ];


    const tree = new RegularGeneralTreeClass();
    const parentNode = new RegularGeneralTreeNodeClass(tree, null, null, data);
    const [ dataForTest, childNodes, destroyCallTracker ] = prepareDataForIterationTest(tree, parentNode, childData);

    checkRegularGeneralTreeNodeChildrenIterator(parentNode, dataForTest);
    parentNode.destroy();

    checkRegularGeneralTreeDestroyedNodeChildrenIterator(parentNode, childNodes);
    destroyCallTracker.verify();
}

function testRegularGeneralTreeNodeDestroyedCase3() {
    const data = 'test_val1';
    const childData1 = [
        {
            prop1 : 'test_sub_val1',
            destroy: function() { this.prop1 = null }
        },

        {
            prop1 : 'test_sub_val2',
            destroy: function() { this.prop1 = null }
        },

        {
            prop1 : 'test_sub_val3',
            destroy: function() { this.prop1 = null }
        }
    ];

    const childData2 = [
        {
            prop2 : 'test_sub_sub_val1',
            destroy: function() { this.prop2 = null }
        },

        {
            prop2 : 'test_sub_sub_val2',
            destroy: function() { this.prop2 = null }
        },

        {
            prop2 : 'test_sub_sub_val3',
            destroy: function() { this.prop2 = null }
        }
    ];

    const childData3 = [
        {
            prop3 : 'test_sub_sub_sub_val1',
            destroy: function() { this.prop3 = null }
        },

        {
            prop3 : 'test_sub_sub_sub_val2',
            destroy: function() { this.prop3 = null }
        },

        {
            prop3 : 'test_sub_sub_sub_val3',
            destroy: function() { this.prop3 = null }
        }
    ];

    const tree = new RegularGeneralTreeClass();
    const parentNode = new RegularGeneralTreeNodeClass(tree, null, null, data);
    const destroyCallTrackers = [];

    const subChildNodesStore = [];
    const subSubChildNodesStore = [];

    const [ dataForTest, childNodes, destroyCallTracker ] = prepareDataForIterationTest(tree, parentNode, childData1);
    destroyCallTrackers.push(destroyCallTracker);

    checkRegularGeneralTreeNodeChildrenIterator(parentNode, dataForTest);

    for (const childNode of childNodes) {
        const [ childDataForTest, subChildNodes, childDestroyCallTracker ] = prepareDataForIterationTest(tree, childNode, childData2);

        destroyCallTrackers.push(childDestroyCallTracker);
        subChildNodesStore.push(subChildNodes);

        checkRegularGeneralTreeNodeChildrenIterator(childNode, childDataForTest);

        for (const subChildNode of subChildNodes) {
            const [ subChildDataForTest, subSubChildNodes, subChildDestroyCallTracker ] = prepareDataForIterationTest(tree, subChildNode, childData3);

            destroyCallTrackers.push(subChildDestroyCallTracker);
            subSubChildNodesStore.push(subSubChildNodes);

            checkRegularGeneralTreeNodeChildrenIterator(subChildNode, subChildDataForTest);
        }
    }

    parentNode.destroy();
    for (const destroyCallTrackerItem of destroyCallTrackers) {
        destroyCallTrackerItem.verify();
    }

    checkRegularGeneralTreeDestroyedNodeChildrenIterator(parentNode, childNodes);

    for (let childNodesCounter1 = 0; childNodesCounter1 < childNodes.length; childNodesCounter1++) {
        const childNode = childNodes[childNodesCounter1];
        const subChildNodes = subChildNodesStore[childNodesCounter1];

        checkRegularGeneralTreeDestroyedNodeChildrenIterator(childNode, subChildNodes);

        for (let subChildNodesCounter1 = 0; subChildNodesCounter1 < subChildNodes.length; subChildNodesCounter1++) {
            const subChildNode = subChildNodes[subChildNodesCounter1];
            const subSubChildNodes = subSubChildNodesStore[subChildNodesCounter1];

            checkRegularGeneralTreeDestroyedNodeChildrenIterator(subChildNode, subSubChildNodes);
        }
    }
}

testRegularGeneralTreeNodeCreatedSuccessfullyCase1();
testRegularGeneralTreeNodeCreatedSuccessfullyCase2();
testRegularGeneralTreeNodeCreatedSuccessfullyCase3();

testRegularGeneralTreeNodeSetDataCase1();
testRegularGeneralTreeNodeSetDataCase2();

testRegularGeneralTreeNodeGetChildAtCase1();
testRegularGeneralTreeNodeGetChildAtCase2();
testRegularGeneralTreeNodeGetChildAtCase3();

testRegularGeneralTreeIsLeafCase1();
testRegularGeneralTreeIsLeafCase2();

testRegularGeneralTreeNodeGetLeftmostChildCase1();
testRegularGeneralTreeNodeGetLeftmostChildCase2();
testRegularGeneralTreeNodeGetLeftmostChildCase3();

testRegularGeneralTreeNodeGetRightmostChildCase1();
testRegularGeneralTreeNodeGetRightmostChildCase2();
testRegularGeneralTreeNodeGetRightmostChildCase3();

testRegularGeneralTreeNodeFindChildByDataCase1();
testRegularGeneralTreeNodeFindChildByDataCase2();
testRegularGeneralTreeNodeFindChildByDataCase3();

testRegularGeneralTreeNodeChildrenIteratorCase1();
testRegularGeneralTreeNodeChildrenIteratorCase2();

testRegularGeneralTreeNodeDestroyedCase1();
testRegularGeneralTreeNodeDestroyedCase2();
testRegularGeneralTreeNodeDestroyedCase3();
