const RegularGeneralTreeClass = require('./../code/regular_general_tree_class');

const { checkTree } = require('./../../../../../../utils/testing/data_structures/regular_general_tree_test_utils');
const { checkNode } = require('./../../../../../../utils/testing/data_structures/regular_general_tree_node_test_utils');

function testRegularGeneralTreeNodeCreatedSuccessfullyCase1() {
    let tree = new RegularGeneralTreeClass();
    checkTree(tree, null)
}

function testRegularGeneralTreeNodeCreatedSuccessfullyCase2() {
    let tree = new RegularGeneralTreeClass();
    let node = null;

    const data = 'test_val1';

    node = tree.createNewRoot(null, data);

    checkNode(node, tree, null, data);
    checkTree(tree, node);
}

function testRegularGeneralTreeCreateNewRootCase1() {
    let tree = new RegularGeneralTreeClass();
    let node = null;

    const data = 'test_val1';

    node = tree.createNewRoot(null, data);
    checkNode(node, tree, null, data);
}

function testRegularGeneralTreeCreateNewRootCase2() {
    let tree = new RegularGeneralTreeClass();
    let node = null;

    const data1 = 'test_val1';
    const data2 = 5;

    node = tree.createNewRoot(null, data1);
    checkNode(node, tree, null, data1);

    node = tree.createNewRoot(null, data2);
    checkNode(node, tree, null, data2);
}

function testRegularGeneralTreeGetRootCase1() {
    let tree = new RegularGeneralTreeClass();
    let node = null;

    const data = 'test_val1';

    node = tree.createNewRoot(null, data);
    checkNode(node, tree, null, data);

    node = tree.root;
    checkNode(node, tree, null, data);
}

function testRegularGeneralTreeGetRootCase2() {
    let tree = new RegularGeneralTreeClass();
    let node = null;

    const data1 = 'test_val1';
    const data2 = 5;

    node = tree.createNewRoot(null, data1);
    checkNode(node, tree, null, data1);

    node = tree.root;
    checkNode(node, tree, null, data1);

    node = tree.createNewRoot(null, data2);
    checkNode(node, tree, null, data2);

    node = tree.root;
    checkNode(node, tree, null, data2);
}

testRegularGeneralTreeNodeCreatedSuccessfullyCase1();
testRegularGeneralTreeNodeCreatedSuccessfullyCase2();

testRegularGeneralTreeCreateNewRootCase1();
testRegularGeneralTreeCreateNewRootCase2();

testRegularGeneralTreeGetRootCase1();
testRegularGeneralTreeGetRootCase2();

