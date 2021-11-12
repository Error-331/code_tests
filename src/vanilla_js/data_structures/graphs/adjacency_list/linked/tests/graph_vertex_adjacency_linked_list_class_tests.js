// external imports
const assert = require('assert').strict;

// internal imports
const GraphVertexAdjacencyLinkedListClass = require('./../code/graph_vertex_adjacency_linked_list_class');
const RegularGraphVertexClass = require('./../../../vertex/regular/code/regular_graph_vertex_class');
const {
    checkRegularLinkedListNotEmpty,
    checkRegularLinkedListItems,
    checkRegularLinkedListElement,
} = require('./../../../../../../../utils/testing/data_structures/regular_linked_list_class_test_utils');

// implementation
function testGraphVertexAdjacencyListInsertAfterVertexCase1() {
    const adjacencyLinkedList = new GraphVertexAdjacencyLinkedListClass();

    const vertex1 = new RegularGraphVertexClass(1, 5);
    const vertex2 = new RegularGraphVertexClass(2, 7);
    const vertex3 = new RegularGraphVertexClass(3, -1);
    const vertex4 = new RegularGraphVertexClass(4, 10);

    adjacencyLinkedList.insertAfterVertex(vertex1);
    adjacencyLinkedList.insertAfterVertex(vertex2, vertex1);
    adjacencyLinkedList.insertAfterVertex(vertex3, vertex2);
    adjacencyLinkedList.insertAfterVertex(vertex4, vertex3);

    checkRegularLinkedListNotEmpty(adjacencyLinkedList, 4, vertex1, vertex4);
    checkRegularLinkedListItems(adjacencyLinkedList, [vertex1, vertex2, vertex3, vertex4]);
}

function testGraphVertexAdjacencyListInsertAfterVertexCase2() {
    const adjacencyLinkedList = new GraphVertexAdjacencyLinkedListClass();

    const vertex1 = new RegularGraphVertexClass(1, 74);
    const vertex2 = new RegularGraphVertexClass(2, 1);
    const vertex3 = new RegularGraphVertexClass(3, -65);
    const vertex4 = new RegularGraphVertexClass(4, -2);
    const vertex5 = new RegularGraphVertexClass(5, 88);

    adjacencyLinkedList.insertAfterVertex(vertex1);
    adjacencyLinkedList.insertAfterVertex(vertex2, vertex1);
    adjacencyLinkedList.insertAfterVertex(vertex3, vertex2);
    adjacencyLinkedList.insertAfterVertex(vertex4, vertex3);
    adjacencyLinkedList.insertAfterVertex(vertex5, vertex4);

    checkRegularLinkedListNotEmpty(adjacencyLinkedList, 5, vertex1, vertex5);
    checkRegularLinkedListItems(adjacencyLinkedList, [vertex1, vertex2, vertex3, vertex4, vertex5]);
}

function testGraphVertexAdjacencyListInsertDataAfterVertexCase1() {
    const adjacencyLinkedList = new GraphVertexAdjacencyLinkedListClass();

    const vertex1 = new RegularGraphVertexClass(1, 5);
    const vertex2 = new RegularGraphVertexClass(2, 7);
    const vertex3 = new RegularGraphVertexClass(3, -1);
    const vertex4 = new RegularGraphVertexClass(4, 10);

    adjacencyLinkedList.insertDataAfterVertex(1, 5);
    adjacencyLinkedList.insertDataAfterVertex(2, 7, vertex1);
    adjacencyLinkedList.insertDataAfterVertex(3, -1, vertex2);
    adjacencyLinkedList.insertDataAfterVertex(4, 10, vertex3);

    checkRegularLinkedListNotEmpty(adjacencyLinkedList, 4, vertex1, vertex4);
    checkRegularLinkedListItems(adjacencyLinkedList, [vertex1, vertex2, vertex3, vertex4]);
}

function testGraphVertexAdjacencyListInsertDataAfterVertexCase2() {
    const adjacencyLinkedList = new GraphVertexAdjacencyLinkedListClass();

    const vertex1 = new RegularGraphVertexClass(1, 74);
    const vertex2 = new RegularGraphVertexClass(2, 1);
    const vertex3 = new RegularGraphVertexClass(3, -65);
    const vertex4 = new RegularGraphVertexClass(4, -2);
    const vertex5 = new RegularGraphVertexClass(5, 88);

    adjacencyLinkedList.insertDataAfterVertex(1, 74);
    adjacencyLinkedList.insertDataAfterVertex(2, 1, vertex1);
    adjacencyLinkedList.insertDataAfterVertex(3, -65, vertex2);
    adjacencyLinkedList.insertDataAfterVertex(4, -2, vertex3);
    adjacencyLinkedList.insertDataAfterVertex(5, 88, vertex4);

    checkRegularLinkedListNotEmpty(adjacencyLinkedList, 5, vertex1, vertex5);
    checkRegularLinkedListItems(adjacencyLinkedList, [vertex1, vertex2, vertex3, vertex4, vertex5]);
}

function testGraphVertexAdjacencyListPushVertexDataCase1() {
    const adjacencyLinkedList = new GraphVertexAdjacencyLinkedListClass();

    const vertex1 = new RegularGraphVertexClass(1, 5);
    const vertex2 = new RegularGraphVertexClass(2, 7);
    const vertex3 = new RegularGraphVertexClass(3, -1);
    const vertex4 = new RegularGraphVertexClass(4, 10);

    adjacencyLinkedList.pushVertexData(1, 5);
    adjacencyLinkedList.pushVertexData(2, 7);
    adjacencyLinkedList.pushVertexData(3, -1);
    adjacencyLinkedList.pushVertexData(4, 10);

    checkRegularLinkedListNotEmpty(adjacencyLinkedList, 4, vertex1, vertex4);
    checkRegularLinkedListItems(adjacencyLinkedList, [vertex1, vertex2, vertex3, vertex4]);
}

function testGraphVertexAdjacencyListPushVertexDataCase2() {
    const adjacencyLinkedList = new GraphVertexAdjacencyLinkedListClass();

    const vertex1 = new RegularGraphVertexClass(1, 74);
    const vertex2 = new RegularGraphVertexClass(2, 1);
    const vertex3 = new RegularGraphVertexClass(3, -65);
    const vertex4 = new RegularGraphVertexClass(4, -2);
    const vertex5 = new RegularGraphVertexClass(5, 88);

    adjacencyLinkedList.pushVertexData(1, 74);
    adjacencyLinkedList.pushVertexData(2, 1);
    adjacencyLinkedList.pushVertexData(3, -65);
    adjacencyLinkedList.pushVertexData(4, -2);
    adjacencyLinkedList.pushVertexData(5, 88);

    checkRegularLinkedListNotEmpty(adjacencyLinkedList, 5, vertex1, vertex5);
    checkRegularLinkedListItems(adjacencyLinkedList, [vertex1, vertex2, vertex3, vertex4, vertex5]);
}

function testGraphVertexAdjacencyListRemoveVertexCase1() {
    const adjacencyLinkedList = new GraphVertexAdjacencyLinkedListClass();

    const vertex1 = new RegularGraphVertexClass(1, 5);
    const vertex2 = new RegularGraphVertexClass(2, 7);
    const vertex3 = new RegularGraphVertexClass(3, -1);
    const vertex4 = new RegularGraphVertexClass(4, 10);

    adjacencyLinkedList.pushVertexData(1, 5);
    adjacencyLinkedList.pushVertexData(2, 7);
    adjacencyLinkedList.pushVertexData(3, -1);
    adjacencyLinkedList.pushVertexData(4, 10);

    checkRegularLinkedListNotEmpty(adjacencyLinkedList, 4, vertex1, vertex4);
    checkRegularLinkedListItems(adjacencyLinkedList, [vertex1, vertex2, vertex3, vertex4]);

    let removedVertex = adjacencyLinkedList.removeVertex(vertex3);
    checkRegularLinkedListElement(vertex3,  removedVertex);

    checkRegularLinkedListNotEmpty(adjacencyLinkedList, 3, vertex1, vertex4);
    checkRegularLinkedListItems(adjacencyLinkedList, [vertex1, vertex2, vertex4]);

    removedVertex = adjacencyLinkedList.removeVertex(vertex2);
    checkRegularLinkedListElement(vertex2,  removedVertex);

    checkRegularLinkedListNotEmpty(adjacencyLinkedList, 2, vertex1, vertex4);
    checkRegularLinkedListItems(adjacencyLinkedList, [vertex1, vertex4]);
}

function testGraphVertexAdjacencyListRemoveVertexCase2() {
    const adjacencyLinkedList = new GraphVertexAdjacencyLinkedListClass();

    const vertex1 = new RegularGraphVertexClass(1, 74);
    const vertex2 = new RegularGraphVertexClass(2, 1);
    const vertex3 = new RegularGraphVertexClass(3, -65);
    const vertex4 = new RegularGraphVertexClass(4, -2);
    const vertex5 = new RegularGraphVertexClass(5, 88);

    adjacencyLinkedList.pushVertexData(1, 74);
    adjacencyLinkedList.pushVertexData(2, 1);
    adjacencyLinkedList.pushVertexData(3, -65);
    adjacencyLinkedList.pushVertexData(4, -2);
    adjacencyLinkedList.pushVertexData(5, 88);

    checkRegularLinkedListNotEmpty(adjacencyLinkedList, 5, vertex1, vertex5);
    checkRegularLinkedListItems(adjacencyLinkedList, [vertex1, vertex2, vertex3, vertex4, vertex5]);

    let removedVertex = adjacencyLinkedList.removeVertex(vertex4);
    checkRegularLinkedListElement(vertex4, removedVertex);

    checkRegularLinkedListNotEmpty(adjacencyLinkedList, 4, vertex1, vertex5);
    checkRegularLinkedListItems(adjacencyLinkedList, [vertex1, vertex2, vertex3, vertex5]);

    removedVertex = adjacencyLinkedList.removeVertex(vertex5);
    checkRegularLinkedListElement(vertex5, removedVertex);

    checkRegularLinkedListNotEmpty(adjacencyLinkedList, 3, vertex1, vertex3);
    checkRegularLinkedListItems(adjacencyLinkedList, [vertex1, vertex2, vertex3]);
}

function testGraphVertexAdjacencyListRemoveVertexByIdCase1() {
    const adjacencyLinkedList = new GraphVertexAdjacencyLinkedListClass();

    const vertex1 = new RegularGraphVertexClass(1, 5);
    const vertex2 = new RegularGraphVertexClass(2, 7);
    const vertex3 = new RegularGraphVertexClass(3, -1);
    const vertex4 = new RegularGraphVertexClass(4, 10);

    adjacencyLinkedList.pushVertexData(1, 5);
    adjacencyLinkedList.pushVertexData(2, 7);
    adjacencyLinkedList.pushVertexData(3, -1);
    adjacencyLinkedList.pushVertexData(4, 10);

    checkRegularLinkedListNotEmpty(adjacencyLinkedList, 4, vertex1, vertex4);
    checkRegularLinkedListItems(adjacencyLinkedList, [vertex1, vertex2, vertex3, vertex4]);

    let removedVertex = adjacencyLinkedList.removeVertexById(3);
    checkRegularLinkedListElement(vertex3,  removedVertex);

    checkRegularLinkedListNotEmpty(adjacencyLinkedList, 3, vertex1, vertex4);
    checkRegularLinkedListItems(adjacencyLinkedList, [vertex1, vertex2, vertex4]);

    removedVertex = adjacencyLinkedList.removeVertexById(2);
    checkRegularLinkedListElement(vertex2,  removedVertex);

    checkRegularLinkedListNotEmpty(adjacencyLinkedList, 2, vertex1, vertex4);
    checkRegularLinkedListItems(adjacencyLinkedList, [vertex1, vertex4]);
}

function testGraphVertexAdjacencyListRemoveVertexByIdCase2() {
    const adjacencyLinkedList = new GraphVertexAdjacencyLinkedListClass();

    const vertex1 = new RegularGraphVertexClass(1, 74);
    const vertex2 = new RegularGraphVertexClass(2, 1);
    const vertex3 = new RegularGraphVertexClass(3, -65);
    const vertex4 = new RegularGraphVertexClass(4, -2);
    const vertex5 = new RegularGraphVertexClass(5, 88);

    adjacencyLinkedList.pushVertexData(1, 74);
    adjacencyLinkedList.pushVertexData(2, 1);
    adjacencyLinkedList.pushVertexData(3, -65);
    adjacencyLinkedList.pushVertexData(4, -2);
    adjacencyLinkedList.pushVertexData(5, 88);

    checkRegularLinkedListNotEmpty(adjacencyLinkedList, 5, vertex1, vertex5);
    checkRegularLinkedListItems(adjacencyLinkedList, [vertex1, vertex2, vertex3, vertex4, vertex5]);

    let removedVertex = adjacencyLinkedList.removeVertexById(4);
    checkRegularLinkedListElement(vertex4, removedVertex);

    checkRegularLinkedListNotEmpty(adjacencyLinkedList, 4, vertex1, vertex5);
    checkRegularLinkedListItems(adjacencyLinkedList, [vertex1, vertex2, vertex3, vertex5]);

    removedVertex = adjacencyLinkedList.removeVertexById(5);
    checkRegularLinkedListElement(vertex5, removedVertex);

    checkRegularLinkedListNotEmpty(adjacencyLinkedList, 3, vertex1, vertex3);
    checkRegularLinkedListItems(adjacencyLinkedList, [vertex1, vertex2, vertex3]);
}

function testGraphVertexAdjacencyListFindVertexNodeCase1() {
    const adjacencyLinkedList = new GraphVertexAdjacencyLinkedListClass();

    const vertex1 = new RegularGraphVertexClass(1, 5);
    const vertex2 = new RegularGraphVertexClass(2, 7);
    const vertex3 = new RegularGraphVertexClass(3, -1);
    const vertex4 = new RegularGraphVertexClass(4, 10);

    adjacencyLinkedList.pushVertexData(1, 5);
    adjacencyLinkedList.pushVertexData(2, 7);
    adjacencyLinkedList.pushVertexData(3, -1);
    adjacencyLinkedList.pushVertexData(4, 10);

    checkRegularLinkedListNotEmpty(adjacencyLinkedList, 4, vertex1, vertex4);
    checkRegularLinkedListItems(adjacencyLinkedList, [vertex1, vertex2, vertex3, vertex4]);

    let foundVertexNode = adjacencyLinkedList.findVertexNode(vertex2);
    checkRegularLinkedListElement(foundVertexNode.element, vertex2);

    foundVertexNode = adjacencyLinkedList.findVertexNode(vertex4);
    checkRegularLinkedListElement(foundVertexNode.element, vertex4);
}

function testGraphVertexAdjacencyListFindVertexNodeCase2(){
    const adjacencyLinkedList = new GraphVertexAdjacencyLinkedListClass();

    const vertex1 = new RegularGraphVertexClass(1, 74);
    const vertex2 = new RegularGraphVertexClass(2, 1);
    const vertex3 = new RegularGraphVertexClass(3, -65);
    const vertex4 = new RegularGraphVertexClass(4, -2);
    const vertex5 = new RegularGraphVertexClass(5, 88);

    adjacencyLinkedList.pushVertexData(1, 74);
    adjacencyLinkedList.pushVertexData(2, 1);
    adjacencyLinkedList.pushVertexData(3, -65);
    adjacencyLinkedList.pushVertexData(4, -2);
    adjacencyLinkedList.pushVertexData(5, 88);

    checkRegularLinkedListNotEmpty(adjacencyLinkedList, 5, vertex1, vertex5);
    checkRegularLinkedListItems(adjacencyLinkedList, [vertex1, vertex2, vertex3, vertex4, vertex5]);

    let foundVertexNode = adjacencyLinkedList.findVertexNode(vertex1);
    checkRegularLinkedListElement(foundVertexNode.element, vertex1);

    foundVertexNode = adjacencyLinkedList.findVertexNode(vertex5);
    checkRegularLinkedListElement(foundVertexNode.element, vertex5);
}

function testGraphVertexAdjacencyListGetVertexAfterCase1() {
    const adjacencyLinkedList = new GraphVertexAdjacencyLinkedListClass();

    const vertex1 = new RegularGraphVertexClass(1, 5);
    const vertex2 = new RegularGraphVertexClass(2, 7);
    const vertex3 = new RegularGraphVertexClass(3, -1);
    const vertex4 = new RegularGraphVertexClass(4, 10);

    adjacencyLinkedList.pushVertexData(1, 5);
    adjacencyLinkedList.pushVertexData(2, 7);
    adjacencyLinkedList.pushVertexData(3, -1);
    adjacencyLinkedList.pushVertexData(4, 10);

    checkRegularLinkedListNotEmpty(adjacencyLinkedList, 4, vertex1, vertex4);
    checkRegularLinkedListItems(adjacencyLinkedList, [vertex1, vertex2, vertex3, vertex4]);

    let foundVertexNode = adjacencyLinkedList.getVertexAfter(vertex1);
    checkRegularLinkedListElement(foundVertexNode.element, vertex2);

    foundVertexNode = adjacencyLinkedList.getVertexAfter(vertex3);
    checkRegularLinkedListElement(foundVertexNode.element, vertex4);
}

function testGraphVertexAdjacencyListGetVertexAfterCase2() {
    const adjacencyLinkedList = new GraphVertexAdjacencyLinkedListClass();

    const vertex1 = new RegularGraphVertexClass(1, 74);
    const vertex2 = new RegularGraphVertexClass(2, 1);
    const vertex3 = new RegularGraphVertexClass(3, -65);
    const vertex4 = new RegularGraphVertexClass(4, -2);
    const vertex5 = new RegularGraphVertexClass(5, 88);

    adjacencyLinkedList.pushVertexData(1, 74);
    adjacencyLinkedList.pushVertexData(2, 1);
    adjacencyLinkedList.pushVertexData(3, -65);
    adjacencyLinkedList.pushVertexData(4, -2);
    adjacencyLinkedList.pushVertexData(5, 88);

    checkRegularLinkedListNotEmpty(adjacencyLinkedList, 5, vertex1, vertex5);
    checkRegularLinkedListItems(adjacencyLinkedList, [vertex1, vertex2, vertex3, vertex4, vertex5]);

    let foundVertexNode = adjacencyLinkedList.getVertexAfter();
    checkRegularLinkedListElement(foundVertexNode.element, vertex1);

    foundVertexNode = adjacencyLinkedList.getVertexAfter(vertex4);
    checkRegularLinkedListElement(foundVertexNode.element, vertex5);

    foundVertexNode = adjacencyLinkedList.getVertexAfter(vertex5);
    assert.strictEqual(foundVertexNode, null);
}

testGraphVertexAdjacencyListInsertAfterVertexCase1();
testGraphVertexAdjacencyListInsertAfterVertexCase2();

testGraphVertexAdjacencyListInsertDataAfterVertexCase1();
testGraphVertexAdjacencyListInsertDataAfterVertexCase2();

testGraphVertexAdjacencyListPushVertexDataCase1();
testGraphVertexAdjacencyListPushVertexDataCase2();

testGraphVertexAdjacencyListRemoveVertexCase1();
testGraphVertexAdjacencyListRemoveVertexCase2();

testGraphVertexAdjacencyListRemoveVertexByIdCase1();
testGraphVertexAdjacencyListRemoveVertexByIdCase2();

testGraphVertexAdjacencyListFindVertexNodeCase1();
testGraphVertexAdjacencyListFindVertexNodeCase2();

testGraphVertexAdjacencyListGetVertexAfterCase1();
testGraphVertexAdjacencyListGetVertexAfterCase2();

// exports
