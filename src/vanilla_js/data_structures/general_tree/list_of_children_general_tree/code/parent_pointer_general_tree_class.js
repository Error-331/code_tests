'use strict';

/*

https://opendsa-server.cs.vt.edu/ODSA/Books/CS3/html/UnionFind.html

The ParentPointerGeneralTreeClass  has an array where each array position corresponds to one object in some collection. Each array element stores the array index for its parent. There are two main methods
to implement. Method union merges two sets together, where each set corresponds to a tree. Method find is used to find the ultimate root for a node.

An application using the union/find operations should store a set of n objects, where each object is assigned a unique index in the range 0 to n−1. The indices refer to the corresponding parent pointers
in the array. Class ParentPointerGeneralTreeClass creates and initializes the union/find array, and methods UNION and FIND take array indices as inputs.


5 0 0 5 3 -1 5 2 5 -1
A B C D E  F G H I  J

   F               J
  / \ \     \
 G   I D    A
       |   / \
       E  B   C
              |
              H

 */

class ParentPointerGeneralTreeClass {
    #nodeArray = [];

    find(currentNode) {
        while (array[currentNode] !== -1) {
            currentNode = array[currentNode];
        }

        return currentNode;
    }

    union(node1, node2) {
        const root1 = this.find(node1);
        const root2 = this.find(node2);
        
        if (root1 !== root2) {
            this.#nodeArray[root1] = root2;
        }

    }

    set tree(nodeArray) {
        this.#nodeArray = nodeArray;
    }

    constructor(size = 0) {
        for (let nodeCnt = 0; nodeCnt < size; nodeCnt++) {
            this.#nodeArray[nodeCnt] = -1;
        }
    }
}

module.exports = ParentPointerGeneralTreeClass;

