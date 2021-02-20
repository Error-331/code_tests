const assert = require('assert').strict;

const ListOfChildrenGeneralTreeClass = require('./../code/list_of_children_general_tree_class');

const { checkTreeNodeCount, checkCleanTree } = require('./../../../utils/list_of_children_general_tree_test_utils');
const { checkNodeBase, checkNodeChildSibling } = require('./../../../utils/list_of_children_general_tree_node_test_utils');

function case1() {
    const treeObj = new ListOfChildrenGeneralTreeClass(null);
    const rootNode = treeObj.addNewRoot('test_node_key1');

    assert.strictEqual(treeObj.nextNodeId, 1);
    checkTreeNodeCount(treeObj, 1);

    checkNodeBase(rootNode, 0, 'test_node_key1', null, true);

    checkNodeChildSibling(rootNode.leftmostChild, null);
    checkNodeChildSibling(rootNode.rightSibling, null);

    treeObj.clear();
    checkCleanTree(treeObj);

    checkNodeBase(rootNode, null, null, null, true);
}

function testSingleRootNodeDestroyedCase() {
    const treeObj = new ListOfChildrenGeneralTreeClass(null);
    const rootNode = treeObj.addNewRoot('test_node_key1');

    rootNode.destroy();
    checkNodeBase(rootNode, null, null, null, true);

    checkCleanTree(treeObj);
}

function testInsertNextTwoChildrenToRootCase() {
    const treeObj = new ListOfChildrenGeneralTreeClass(null);
    const rootNode = treeObj.addNewRoot('test_node_key1');

    const childNode1 = rootNode.insertNext('test_sub_node_key1');
    checkNodeBase(childNode1, 1, 'test_sub_node_key1', rootNode, true);

    const childNode2 = rootNode.insertNext('test_sub_node_key2');
    checkNodeBase(childNode2, 2, 'test_sub_node_key2', rootNode, true);

    checkNodeBase(rootNode, 0, 'test_node_key1', null, false);
    checkTreeNodeCount(treeObj, 3);
}


case1();
testSingleRootNodeDestroyedCase();
testInsertNextTwoChildrenToRootCase();
