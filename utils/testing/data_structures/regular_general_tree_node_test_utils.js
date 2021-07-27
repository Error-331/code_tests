const assert = require('assert').strict;

function prepareDataForIterationTest(tree, parentNode, childData) {
    const destroyCallTracker = new assert.CallTracker();
    const dataForTest = [];
    const childNodes = [];

    for (let childDataItem of childData) {
        if (
            typeof childDataItem === 'object' &&
            childDataItem !== null &&
            childDataItem.destroy &&
            typeof childDataItem.destroy === 'function'
        ) {
            childDataItem = Object.assign({}, childDataItem);

            childDataItem.destroy = childDataItem.destroy.bind(childDataItem);
            childDataItem.destroy = destroyCallTracker.calls(childDataItem.destroy, 1);
        }

        dataForTest.push([
            tree,
            parentNode,
            childDataItem,
        ]);


        childNodes.push(parentNode.addChild(childDataItem));
    }

    return [ dataForTest, childNodes, destroyCallTracker ];
}

function checkNode(node, tree, parent, data) {
    assert.deepStrictEqual(node.tree, tree);
    assert.deepStrictEqual(node.parent, parent);
    assert.deepStrictEqual(node.data, data);
}

function checkRegularGeneralTreeNodeChildrenIterator(parentNode, testItems = []) {
    const iteratedNodeChildren = [];

    for (const childNode of parentNode.children) {
        iteratedNodeChildren.push(childNode);
    }

    assert.strictEqual(testItems.length, iteratedNodeChildren.length);

    for (let nodeCounter = 0; nodeCounter < iteratedNodeChildren.length; nodeCounter++) {
        checkNode(iteratedNodeChildren[nodeCounter], ...testItems[nodeCounter])
    }
}

function checkRegularGeneralTreeDestroyedNodeChildrenIterator(parentNode, childNodes = []) {
    checkNode(parentNode, null, null, null);
    assert.notStrictEqual(childNodes.length, 0);

    for (const childNode of childNodes) {
        checkNode(childNode, null, null, null);
    }

    const iteratedNodeChildren = [];

    for (const childNode of parentNode.children) {
        iteratedNodeChildren.push(childNode);
    }

    assert.strictEqual(0, iteratedNodeChildren.length);
}

module.exports.prepareDataForIterationTest = prepareDataForIterationTest;
module.exports.checkNode = checkNode;
module.exports.checkRegularGeneralTreeNodeChildrenIterator = checkRegularGeneralTreeNodeChildrenIterator;
module.exports.checkRegularGeneralTreeDestroyedNodeChildrenIterator = checkRegularGeneralTreeDestroyedNodeChildrenIterator;
