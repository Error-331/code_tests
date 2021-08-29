'use strict';

const ListOfChildrenGeneralTreeNodeClass = require('./list_of_children_general_tree_node_class');

class ListOfChildrenGeneralTreeClass {
    #nodeList = null;
    #comparator = null;

    #fixNodeIndices() {
        this.#nodeList.forEach((node, index) => node.id = index);
    }

    clear() {
        this.#nodeList.forEach(node => node.destroy());
        this.#nodeList = [];
    }

    newLeftChild(key) {
        const root = this.root;

        if (root === null) {
            throw new Error('Tree does not have a root');
        }

        const leftChild = new ListOfChildrenGeneralTreeNodeClass(this, this.nextNodeId, key, root, this.#comparator);
        this.addNodeToNodeList(leftChild);

        return leftChild;
    }

    addNewRoot(key, leftChild = null, rightChild = null) {
        if (this.root === null) {
            const root = new ListOfChildrenGeneralTreeNodeClass(this, this.nextNodeId, key, null, this.#comparator);
            this.addNodeToNodeList(root);

            return root;
        } else {

        }
    }

    addNodeToNodeList(node) {
        this.#nodeList.push(node);
    }

    removeFromNodeListById(nodeId) {
        this.#nodeList.splice(nodeId, 1);
        this.#fixNodeIndices();
    }

    get root() {
        return this.#nodeList.find(node => node.parentId === null) ?? null;
    }

    get nextNodeId() {
        return this.#nodeList.length;
    }

    get nodeCount() {
        return this.nextNodeId;
    }

    constructor(comparator) {
        this.#nodeList = [];
        this.#comparator = comparator;
    }
}

module.exports = ListOfChildrenGeneralTreeClass;
