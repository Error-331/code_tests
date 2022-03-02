// external imports

// internal imports
const GraphRegularAdjacencyMatrixClass = require('./../../../adjacency_matrix/regular/code/graph_regular_adjacency_matrix_class');
const GraphRecursiveDeepFirstSearchVisitorClass = require('./../code/graph_recursive_deep_first_search_visitor_class');

const { checkGraphRegularAdjacencyMatrixDepthFirstSearch } = require('./../../../../../../../utils/testing/data_structures/graph/graph_regular_adjacency_matrix_test_utils');

// implementation
const testAdjacencyListData1 = [];

testAdjacencyListData1[0] = [];
testAdjacencyListData1[0].push(1);
testAdjacencyListData1[0].push(3);

testAdjacencyListData1[1] = [];
testAdjacencyListData1[1].push(0);
testAdjacencyListData1[1].push(2);

testAdjacencyListData1[2] = [];
testAdjacencyListData1[2].push(1);

testAdjacencyListData1[3] = [];
testAdjacencyListData1[3].push(0);

const testAdjacencyListData2 = [];

testAdjacencyListData2[0] = [];
testAdjacencyListData2[0].push(1);
testAdjacencyListData2[0].push(2);
testAdjacencyListData2[0].push(3);

testAdjacencyListData2[1] = [];
testAdjacencyListData2[1].push(0);
testAdjacencyListData2[1].push(4);

testAdjacencyListData2[2] = [];
testAdjacencyListData2[2].push(0);

testAdjacencyListData2[3] = [];
testAdjacencyListData2[3].push(0);
testAdjacencyListData2[3].push(5);

testAdjacencyListData2[4] = [];
testAdjacencyListData2[4].push(1);
testAdjacencyListData2[4].push(5);

testAdjacencyListData2[5] = [];
testAdjacencyListData2[5].push(3);
testAdjacencyListData2[5].push(4);
testAdjacencyListData2[5].push(6);
testAdjacencyListData2[5].push(7);

testAdjacencyListData2[6] = [];
testAdjacencyListData2[6].push(5);

testAdjacencyListData2[7] = [];
testAdjacencyListData2[7].push(5);

const testAdjacencyListData3 = [];

testAdjacencyListData3[0] = [];
testAdjacencyListData3[0].push(2);
testAdjacencyListData3[0].push(3);

testAdjacencyListData3[1] = [];
testAdjacencyListData3[1].push(2);
testAdjacencyListData3[1].push(4);

testAdjacencyListData3[2] = [];
testAdjacencyListData3[2].push(0);
testAdjacencyListData3[2].push(1);
testAdjacencyListData3[2].push(3);
testAdjacencyListData3[2].push(4);

testAdjacencyListData3[3] = [];
testAdjacencyListData3[3].push(0);
testAdjacencyListData3[3].push(2);

testAdjacencyListData3[4] = [];
testAdjacencyListData3[4].push(1);
testAdjacencyListData3[4].push(2);

const testAdjacencyListData4 = [];

testAdjacencyListData4[0] = [];
testAdjacencyListData4[0].push(1);
testAdjacencyListData4[0].push(3);

testAdjacencyListData4[1] = [];
testAdjacencyListData4[1].push(2);

testAdjacencyListData4[2] = [];

testAdjacencyListData4[3] = [];
testAdjacencyListData4[3].push(4);

testAdjacencyListData4[4] = [];
testAdjacencyListData4[4].push(2);
testAdjacencyListData4[4].push(5);

testAdjacencyListData4[5] = [];

testAdjacencyListData4[6] = [];
testAdjacencyListData4[6].push(3);
testAdjacencyListData4[6].push(7);

testAdjacencyListData4[7] = [];

testAdjacencyListData4[8] = [];
testAdjacencyListData4[8].push(6);
testAdjacencyListData4[8].push(9);

testAdjacencyListData4[9] = [];
testAdjacencyListData4[9].push(7);

testAdjacencyListData4[10] = [];

const testAdjacencyListData5 = [];

testAdjacencyListData5[0] = [];
testAdjacencyListData5[0].push(1);
testAdjacencyListData5[0].push(3);

testAdjacencyListData5[1] = [];
testAdjacencyListData5[1].push(0);
testAdjacencyListData5[1].push(2);
testAdjacencyListData5[1].push(4);

testAdjacencyListData5[2] = [];
testAdjacencyListData5[2].push(1);
testAdjacencyListData5[2].push(4);

testAdjacencyListData5[3] = [];
testAdjacencyListData5[3].push(0);

testAdjacencyListData5[4] = [];
testAdjacencyListData5[4].push(1);
testAdjacencyListData5[4].push(2);

const testAdjacencyListData6 = [];

testAdjacencyListData6[0] = [];
testAdjacencyListData6[0].push(1);

testAdjacencyListData6[1] = [];
testAdjacencyListData6[1].push(2);
testAdjacencyListData6[1].push(3);

testAdjacencyListData6[2] = [];
testAdjacencyListData6[2].push(3);

testAdjacencyListData6[3] = [];
testAdjacencyListData6[3].push(0);

const testAdjacencyListData7 = [];

testAdjacencyListData7[0] = [];
testAdjacencyListData7[0].push(1);
testAdjacencyListData7[0].push(2);
testAdjacencyListData7[0].push(3);

testAdjacencyListData7[1] = [];
testAdjacencyListData7[1].push(4);

testAdjacencyListData7[2] = [];
testAdjacencyListData7[2].push(3);

testAdjacencyListData7[3] = [];
testAdjacencyListData7[3].push(1);

testAdjacencyListData7[4] = [];
testAdjacencyListData7[4].push(3);

const testAdjacencyMatrixData1 = [
    [0, 1, 0, 1],
    [1, 0, 1, 0],
    [0, 1, 0, 0],
    [1, 0, 0, 0]
]; // result - 0, 1, 2, 3

const testAdjacencyMatrixData2 = [
    [0, 1, 1, 1, 0, 0, 0, 0],
    [1, 0, 0, 0, 1, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 1, 0, 0],
    [0, 1, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 1, 1, 0, 1, 1],
    [0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0],
]; // result - 0, 1, 4, 5, 3, 6, 7, 2

const testAdjacencyMatrixData3 = [
//   1  2  3  4  5
    [0, 0, 1, 1, 0], // 1
    [0, 0, 1, 0, 1], // 2
    [1, 1, 0, 1, 1], // 3
    [1, 0, 1, 0, 0], // 4
    [0, 1, 1, 0, 0], // 5
]; // result - 0, 2, 1, 4, 3

const testAdjacencyMatrixData4 = [
//   0  1  2  3  4  5  6  7  8  9  10
    [0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
]; // result - 0, 1, 2, 3, 4, 5

const testAdjacencyMatrixData5 = [
//   0  1  2  3  4
    [0, 1, 0, 1, 0], // 0
    [1, 0, 1, 0, 1], // 1
    [0, 1, 0, 0, 1], // 2
    [1, 0, 0, 0, 0], // 3
    [0, 1, 1, 0, 0]  // 4
]; // result - 0, 1, 2, 4, 3

const testAdjacencyMatrixData6 = [
    [0, 1, 0, 0],
    [0, 0, 1, 1],
    [0, 0, 0, 1],
    [1, 0, 0, 0],
]; // result - 0, 1, 2, 3

const testAdjacencyMatrixData7 = [
    [0, 1, 1, 1, 0],
    [0, 0, 0, 0, 1],
    [0, 0, 0, 1, 0],
    [0, 1, 0, 0, 0],
    [0, 0, 0, 1, 0],
]; // result - 0, 1, 4, 3, 2

function testGraphRegularAdjacencyMatrixDeepFirstSearchByAdjacencyListCase1() {
    const adjacencyMatrix = new GraphRegularAdjacencyMatrixClass();
    adjacencyMatrix.initByAdjacencyList(testAdjacencyListData1);

    const deepFirstImplementation = new GraphRecursiveDeepFirstSearchVisitorClass();
    adjacencyMatrix.depthFirstSearch(deepFirstImplementation);

    checkGraphRegularAdjacencyMatrixDepthFirstSearch(deepFirstImplementation.visitedVertexesIds, [0, 1, 2, 3]);
}

function testGraphRegularAdjacencyMatrixDeepFirstSearchByAdjacencyListCase2() {
    const adjacencyMatrix = new GraphRegularAdjacencyMatrixClass();
    adjacencyMatrix.initByAdjacencyList(testAdjacencyListData2);

    const deepFirstImplementation = new GraphRecursiveDeepFirstSearchVisitorClass();
    adjacencyMatrix.depthFirstSearch(deepFirstImplementation);

    checkGraphRegularAdjacencyMatrixDepthFirstSearch(deepFirstImplementation.visitedVertexesIds, [0, 1, 4, 5, 3, 6, 7, 2]);
}

function testGraphRegularAdjacencyMatrixDeepFirstSearchByAdjacencyListCase3() {
    const adjacencyMatrix = new GraphRegularAdjacencyMatrixClass();
    adjacencyMatrix.initByAdjacencyList(testAdjacencyListData3);

    const deepFirstImplementation = new GraphRecursiveDeepFirstSearchVisitorClass();
    adjacencyMatrix.depthFirstSearch(deepFirstImplementation);

    checkGraphRegularAdjacencyMatrixDepthFirstSearch(deepFirstImplementation.visitedVertexesIds, [0, 2, 1, 4, 3]);
}

function testGraphRegularAdjacencyMatrixDeepFirstSearchByAdjacencyListCase4() {
    const adjacencyMatrix = new GraphRegularAdjacencyMatrixClass();
    adjacencyMatrix.initByAdjacencyList(testAdjacencyListData4);

    const deepFirstImplementation = new GraphRecursiveDeepFirstSearchVisitorClass();
    adjacencyMatrix.depthFirstSearch(deepFirstImplementation);

    checkGraphRegularAdjacencyMatrixDepthFirstSearch(deepFirstImplementation.visitedVertexesIds, [0, 1, 2, 3, 4, 5]);
}

function testGraphRegularAdjacencyMatrixDeepFirstSearchByAdjacencyListCase5() {
    const adjacencyMatrix = new GraphRegularAdjacencyMatrixClass();
    adjacencyMatrix.initByAdjacencyList(testAdjacencyListData5);

    const deepFirstImplementation = new GraphRecursiveDeepFirstSearchVisitorClass();
    adjacencyMatrix.depthFirstSearch(deepFirstImplementation);

    checkGraphRegularAdjacencyMatrixDepthFirstSearch(deepFirstImplementation.visitedVertexesIds, [0, 1, 2, 4, 3]);
}

function testGraphRegularAdjacencyMatrixDeepFirstSearchByAdjacencyListCase6() {
    const adjacencyMatrix = new GraphRegularAdjacencyMatrixClass();
    adjacencyMatrix.initByAdjacencyList(testAdjacencyListData6);

    const deepFirstImplementation = new GraphRecursiveDeepFirstSearchVisitorClass();
    adjacencyMatrix.depthFirstSearch(deepFirstImplementation);

    checkGraphRegularAdjacencyMatrixDepthFirstSearch(deepFirstImplementation.visitedVertexesIds, [0, 1, 2, 3]);
}

function testGraphRegularAdjacencyMatrixDeepFirstSearchByAdjacencyListCase7() {
    const adjacencyMatrix = new GraphRegularAdjacencyMatrixClass();
    adjacencyMatrix.initByAdjacencyList(testAdjacencyListData7);

    const deepFirstImplementation = new GraphRecursiveDeepFirstSearchVisitorClass();
    adjacencyMatrix.depthFirstSearch(deepFirstImplementation);

    checkGraphRegularAdjacencyMatrixDepthFirstSearch(deepFirstImplementation.visitedVertexesIds, [0, 1, 4, 3, 2]);
}

function testGraphRegularAdjacencyMatrixDeepFirstSearchByAdjacencyMatrixCase1() {
    const adjacencyMatrix = new GraphRegularAdjacencyMatrixClass();
    adjacencyMatrix.initByAdjacencyMatrix(testAdjacencyMatrixData1);

    const deepFirstImplementation = new GraphRecursiveDeepFirstSearchVisitorClass();
    adjacencyMatrix.depthFirstSearch(deepFirstImplementation);

    checkGraphRegularAdjacencyMatrixDepthFirstSearch(deepFirstImplementation.visitedVertexesIds, [0, 1, 2, 3]);
}

function testGraphRegularAdjacencyMatrixDeepFirstSearchByAdjacencyMatrixCase2() {
    const adjacencyMatrix = new GraphRegularAdjacencyMatrixClass();
    adjacencyMatrix.initByAdjacencyMatrix(testAdjacencyMatrixData2);

    const deepFirstImplementation = new GraphRecursiveDeepFirstSearchVisitorClass();
    adjacencyMatrix.depthFirstSearch(deepFirstImplementation);

    checkGraphRegularAdjacencyMatrixDepthFirstSearch(deepFirstImplementation.visitedVertexesIds, [0, 1, 4, 5, 3, 6, 7, 2]);
}

function testGraphRegularAdjacencyMatrixDeepFirstSearchByAdjacencyMatrixCase3() {
    const adjacencyMatrix = new GraphRegularAdjacencyMatrixClass();
    adjacencyMatrix.initByAdjacencyMatrix(testAdjacencyMatrixData3);

    const deepFirstImplementation = new GraphRecursiveDeepFirstSearchVisitorClass();
    adjacencyMatrix.depthFirstSearch(deepFirstImplementation);

    checkGraphRegularAdjacencyMatrixDepthFirstSearch(deepFirstImplementation.visitedVertexesIds, [0, 2, 1, 4, 3]);
}

function testGraphRegularAdjacencyMatrixDeepFirstSearchByAdjacencyMatrixCase4() {
    const adjacencyMatrix = new GraphRegularAdjacencyMatrixClass();
    adjacencyMatrix.initByAdjacencyMatrix(testAdjacencyMatrixData4);

    const deepFirstImplementation = new GraphRecursiveDeepFirstSearchVisitorClass();
    adjacencyMatrix.depthFirstSearch(deepFirstImplementation);

    checkGraphRegularAdjacencyMatrixDepthFirstSearch(deepFirstImplementation.visitedVertexesIds, [0, 1, 2, 3, 4, 5]);
}
function testGraphRegularAdjacencyMatrixDeepFirstSearchByAdjacencyMatrixCase5() {
    const adjacencyMatrix = new GraphRegularAdjacencyMatrixClass();
    adjacencyMatrix.initByAdjacencyMatrix(testAdjacencyMatrixData5);

    const deepFirstImplementation = new GraphRecursiveDeepFirstSearchVisitorClass();
    adjacencyMatrix.depthFirstSearch(deepFirstImplementation);

    checkGraphRegularAdjacencyMatrixDepthFirstSearch(deepFirstImplementation.visitedVertexesIds, [0, 1, 2, 4, 3]);
}

function testGraphRegularAdjacencyMatrixDeepFirstSearchByAdjacencyMatrixCase6() {
    const adjacencyMatrix = new GraphRegularAdjacencyMatrixClass();
    adjacencyMatrix.initByAdjacencyMatrix(testAdjacencyMatrixData6);

    const deepFirstImplementation = new GraphRecursiveDeepFirstSearchVisitorClass();
    adjacencyMatrix.depthFirstSearch(deepFirstImplementation);

    checkGraphRegularAdjacencyMatrixDepthFirstSearch(deepFirstImplementation.visitedVertexesIds, [0, 1, 2, 3]);
}

function testGraphRegularAdjacencyMatrixDeepFirstSearchByAdjacencyMatrixCase7() {
    const adjacencyMatrix = new GraphRegularAdjacencyMatrixClass();
    adjacencyMatrix.initByAdjacencyMatrix(testAdjacencyMatrixData7);

    const deepFirstImplementation = new GraphRecursiveDeepFirstSearchVisitorClass();
    adjacencyMatrix.depthFirstSearch(deepFirstImplementation);

    checkGraphRegularAdjacencyMatrixDepthFirstSearch(deepFirstImplementation.visitedVertexesIds, [0, 1, 4, 3, 2]);
}

testGraphRegularAdjacencyMatrixDeepFirstSearchByAdjacencyListCase1();
testGraphRegularAdjacencyMatrixDeepFirstSearchByAdjacencyListCase2();
testGraphRegularAdjacencyMatrixDeepFirstSearchByAdjacencyListCase3();
testGraphRegularAdjacencyMatrixDeepFirstSearchByAdjacencyListCase4();
testGraphRegularAdjacencyMatrixDeepFirstSearchByAdjacencyListCase5();
testGraphRegularAdjacencyMatrixDeepFirstSearchByAdjacencyListCase6();
testGraphRegularAdjacencyMatrixDeepFirstSearchByAdjacencyListCase7();

testGraphRegularAdjacencyMatrixDeepFirstSearchByAdjacencyMatrixCase1();
testGraphRegularAdjacencyMatrixDeepFirstSearchByAdjacencyMatrixCase2();
testGraphRegularAdjacencyMatrixDeepFirstSearchByAdjacencyMatrixCase3();
testGraphRegularAdjacencyMatrixDeepFirstSearchByAdjacencyMatrixCase4();
testGraphRegularAdjacencyMatrixDeepFirstSearchByAdjacencyMatrixCase5();
testGraphRegularAdjacencyMatrixDeepFirstSearchByAdjacencyMatrixCase6();
testGraphRegularAdjacencyMatrixDeepFirstSearchByAdjacencyMatrixCase7();

// exports

