'use strict';

// Binary tree methods, tests etc.

// binary tree node class implementation
class BinaryTreeNode {
    constructor(key = null, value = null, parent = null, leftChild = null, rightChild = null) {
        [this.key, this.value, this.parent, this.leftChild, this.rightChild] = [key, value, parent, leftChild, rightChild];
    }
}

// binary tree class implementation
class BinaryTree {
    constructor() {

    }

    static inorderTreeWalk(bNode = null, callBack) {
        if (bNode === null) {
            return;
        }

        this.inorderTreeWalk(bNode.leftChild, callBack);
        callBack(bNode);
        this.inorderTreeWalk(bNode.rightChild, callBack);
    }

    static recursiveKeySearch(bNode = null, keyToSearch) {
        if (bNode === null || keyToSearch === bNode.key) {
            return bNode;
        }

        return keyToSearch < bNode.key ? this.recursiveKeySearch(bNode.leftChild, keyToSearch) : this.recursiveKeySearch(bNode.rightChild, keyToSearch);
    }

    static iterativeKeySearch(bNode = null, keyToSearch) {
        while (bNode !== null && keyToSearch !== bNode.key) {
            bNode = keyToSearch < bNode.key ? bNode.leftChild : bNode.rightChild;
        }

        return bNode;
    }

    static insertNode(rootNode, nodeToInsert) {
        let parentNode = null;
        let tempNode = rootNode;

        while(tempNode !== null) {
            parentNode = tempNode;
            tempNode = nodeToInsert.key < tempNode.key ? tempNode.leftChild : tempNode.rightChild;
        }

        nodeToInsert.parent = parentNode;

        if (parentNode === null) {
            rootNode = nodeToInsert;
        } else {
            if (nodeToInsert.key < parentNode.key) {
                parentNode.leftChild = nodeToInsert;
            } else {
                parentNode.rightChild = nodeToInsert;
            }
        }

        return nodeToInsert;
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

// additional nodes (used in insertion operations)
let BTNode1_4_9 = new BinaryTreeNode(9, 'V4_9', null, null, null);
let BTNode1_4_7 = new BinaryTreeNode(7, 'V4_7', null, null, null);

let BTNode2_5_7 = new BinaryTreeNode(7, 'V5_7', null, null, null);
let BTNode2_5_6 = new BinaryTreeNode(6, 'V5_6', null, null, null);

console.log('Binary tree "inorder tree walk"');
console.log('===============================');

console.log('Tree 1: ');
console.log('');
BinaryTree.inorderTreeWalk(BTNode1_1_5, binaryTreeWalkCallback);

console.log('');
console.log('------------------------------------------');
console.log('');

console.log('Tree 2: ');
console.log('');
BinaryTree.inorderTreeWalk(BTNode2_1_2, binaryTreeWalkCallback);

console.log('');
console.log('');

console.log('Binary tree "recursive search"');
console.log('==============================');

console.log('');
console.log('Tree 1 (key 8)');
console.log('--------------');
console.log('');

let foundNode = BinaryTree.recursiveKeySearch(BTNode1_1_5, 8);
console.log(`Node found (key: ${foundNode.key}, value: ${foundNode.value})`);

console.log('');
console.log('Tree 1 (key 5)');
console.log('--------------');
console.log('');

foundNode = BinaryTree.recursiveKeySearch(BTNode1_1_5, 5);
console.log(`Node found (key: ${foundNode.key}, value: ${foundNode.value})`);

console.log('');
console.log('Tree 2 (key 5)');
console.log('--------------');
console.log('');

foundNode = BinaryTree.recursiveKeySearch(BTNode2_1_2, 5);
console.log(`Node found (key: ${foundNode.key}, value: ${foundNode.value})`);

console.log('');
console.log('Tree 2 (key 8)');
console.log('--------------');
console.log('');

foundNode = BinaryTree.recursiveKeySearch(BTNode2_1_2, 8);
console.log(`Node found (key: ${foundNode.key}, value: ${foundNode.value})`);

console.log('');
console.log('');

console.log('Binary tree "iterative search"');
console.log('==============================');

console.log('');
console.log('Tree 1 (key 8)');
console.log('--------------');
console.log('');

foundNode = BinaryTree.iterativeKeySearch(BTNode1_1_5, 8);
console.log(`Node found (key: ${foundNode.key}, value: ${foundNode.value})`);

console.log('');
console.log('Tree 1 (key 5)');
console.log('--------------');
console.log('');

foundNode = BinaryTree.iterativeKeySearch(BTNode1_1_5, 5);
console.log(`Node found (key: ${foundNode.key}, value: ${foundNode.value})`);

console.log('');
console.log('Tree 2 (key 5)');
console.log('--------------');
console.log('');

foundNode = BinaryTree.iterativeKeySearch(BTNode2_1_2, 5);
console.log(`Node found (key: ${foundNode.key}, value: ${foundNode.value})`);

console.log('');
console.log('Tree 2 (key 8)');
console.log('--------------');
console.log('');

foundNode = BinaryTree.iterativeKeySearch(BTNode2_1_2, 8);
console.log(`Node found (key: ${foundNode.key}, value: ${foundNode.value})`);

console.log('');
console.log('');

console.log('Binary tree node insertion');
console.log('==========================');

console.log('');
console.log('Tree 1 (nodes 1_4_9 and 1_4_7)');
console.log('------------------------------');
console.log('');

BinaryTree.insertNode(BTNode1_1_5, BTNode1_4_9);
BinaryTree.insertNode(BTNode1_1_5, BTNode1_4_7);
BinaryTree.inorderTreeWalk(BTNode1_1_5, binaryTreeWalkCallback);

console.log('');
console.log('Tree 2 (nodes 1_4_9 and 1_4_7)');
console.log('------------------------------');
console.log('');

BinaryTree.insertNode(BTNode2_1_2, BTNode2_5_7);
BinaryTree.insertNode(BTNode2_1_2, BTNode2_5_6);

BinaryTree.inorderTreeWalk(BTNode2_1_2, binaryTreeWalkCallback);