'use strict';

// Binary tree methods, tests etc.

// binary tree node class implementation
class BinaryTreeNode {
    constructor(key, value, parent, leftChild, rightChild) {
        this.key = key === undefined ? null : key;
        this.value = value === undefined ? null : value;

        this.parent = parent === undefined ? null : parent;
        this.leftChild = leftChild === undefined ? null : leftChild;
        this.rightChild = rightChild === undefined ? null : rightChild;
    }
}

// binary tree class implementation
class BinaryTree {
    constructor() {

    }

    static inorderTreeWalk(bNode, callBack) {
        if (bNode === null) {
            return;
        }

        this.inorderTreeWalk(bNode.leftChild, callBack);
        callBack(bNode);
        this.inorderTreeWalk(bNode.rightChild, callBack);
    }
}

// helper functions
const binaryTreeWalkCallback = (bNode) => {
    console.log(bNode.value);
};

// mock data
//
// example binary tree 1

/*
    5
   / \
  3   7
 / \   \
2   5   8

 */

let BTNode1_3_2 = new BinaryTreeNode(2, 'V3_2', null, null, null);
let BTNode1_3_5 = new BinaryTreeNode(5, 'V3_5', null, null, null);
let BTNode1_3_8 = new BinaryTreeNode(8, 'V3_8', null, null, null);

let BTNode1_2_3 = new BinaryTreeNode(3, 'V2_3', null, BTNode1_3_2, BTNode1_3_5);
let BTNode1_2_7 = new BinaryTreeNode(7, 'V2_7', null, null, BTNode1_3_8);

BTNode1_3_2.parent = BTNode1_2_3;
BTNode1_3_5.parent = BTNode1_2_3;

BTNode1_3_8.parent = BTNode1_2_7;

let BTNode1_1_5 = new BinaryTreeNode(5, 'V1_5', null, BTNode1_2_3, BTNode1_2_7);

BTNode1_2_3.parent = BTNode1_1_5;
BTNode1_2_7.parent = BTNode1_1_5;

// example binary tree 2

/*
 2
  \
   3
    \
     7
    / \
   5   8
  /
 5
 */

let BTNode2_5_5 = new BinaryTreeNode(5, 'V5_5', null, null, null);

let BTNode2_4_5 = new BinaryTreeNode(5, 'V4_5', null, BTNode2_5_5, null);
let BTNode2_4_8 = new BinaryTreeNode(8, 'V4_8', null, null, null);

BTNode2_5_5.parent = BTNode2_4_5;

let BTNode2_3_7 = new BinaryTreeNode(7, 'V3_7', null, BTNode2_4_5, BTNode2_4_8);

BTNode2_4_5.parent = BTNode2_3_7;
BTNode2_4_8.parent = BTNode2_3_7;

let BTNode2_2_3 = new BinaryTreeNode(3, 'V2_3', null, null, BTNode2_3_7);

BTNode2_3_7.parent = BTNode2_2_3;

let BTNode2_1_2 = new BinaryTreeNode(2, 'V1_2', null, null, BTNode2_2_3);

BTNode2_2_3.parent = BTNode2_1_2;

console.log('Binary tree "inorder tree walk"');
console.log('===============================');

console.log('Tree 1: ');
BinaryTree.inorderTreeWalk(BTNode1_1_5, binaryTreeWalkCallback);

console.log('------------------------------------------');

console.log('Tree 2: ');
BinaryTree.inorderTreeWalk(BTNode2_1_2, binaryTreeWalkCallback);