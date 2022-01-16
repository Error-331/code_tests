// external imports

// internal imports
const GraphRegularAdjacencyMatrixClass = require('./../../../adjacency_matrix/regular/code/graph_regular_adjacency_matrix_class');
const GraphRecursiveTopologicalSortVisitorClass = require('./../code/graph_recursive_topological_sort_visitor_class');

const {
    checkGraphRegularAdjacencyMatrixTopologicalSort
} = require('./../../../../../../../utils/testing/data_structures/graph/graph_regular_adjacency_matrix_test_utils');

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

const testAdjacencyMatrixData1 = [
    [0, 1, 0, 1],
    [1, 0, 1, 0],
    [0, 1, 0, 0],
    [1, 0, 0, 0]
];
// sortedVertexesIds - 0, 3, 1, 2

const testAdjacencyMatrixData2 = [
    [0, 1, 1, 1, 0, 0, 0, 0],
    [1, 0, 0, 0, 1, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 1, 0, 0],
    [0, 1, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 1, 1, 0, 1, 1],
    [0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0],
];
// sortedVertexesIds - 0, 2, 1, 4, 5, 7, 6, 3

const testAdjacencyMatrixData3 = [
//   1  2  3  4  5
    [0, 0, 1, 1, 0], // 1
    [0, 0, 1, 0, 1], // 2
    [1, 1, 0, 1, 1], // 3
    [1, 0, 1, 0, 0], // 4
    [0, 1, 1, 0, 0], // 5
];

// sortedVertexesIds - 0, 2, 3, 1, 4

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
];
// sortedVertexesIds - 10, 8, 9, 6, 7, 0, 3, 4, 5, 1, 2

function testGraphRegularAdjacencyMatrixTopologicalSortByAdjacencyListCase1() {
    const adjacencyMatrix = new GraphRegularAdjacencyMatrixClass();
    adjacencyMatrix.initByAdjacencyList(testAdjacencyListData1);

    const topologicalSortImplementation = new GraphRecursiveTopologicalSortVisitorClass();
    adjacencyMatrix.topologicalSort(topologicalSortImplementation);

    checkGraphRegularAdjacencyMatrixTopologicalSort(topologicalSortImplementation.sortedVertexesIds, [0, 3, 1, 2]);
}

function testGraphRegularAdjacencyMatrixTopologicalSortByAdjacencyListCase2() {
    const adjacencyMatrix = new GraphRegularAdjacencyMatrixClass();
    adjacencyMatrix.initByAdjacencyList(testAdjacencyListData2);

    const topologicalSortImplementation = new GraphRecursiveTopologicalSortVisitorClass();
    adjacencyMatrix.topologicalSort(topologicalSortImplementation);

    checkGraphRegularAdjacencyMatrixTopologicalSort(topologicalSortImplementation.sortedVertexesIds, [0, 2, 1, 4, 5, 7, 6, 3]);
}

function testGraphRegularAdjacencyMatrixTopologicalSortByAdjacencyListCase3() {
    const adjacencyMatrix = new GraphRegularAdjacencyMatrixClass();
    adjacencyMatrix.initByAdjacencyList(testAdjacencyListData3);

    const topologicalSortImplementation = new GraphRecursiveTopologicalSortVisitorClass();
    adjacencyMatrix.topologicalSort(topologicalSortImplementation);

    checkGraphRegularAdjacencyMatrixTopologicalSort(topologicalSortImplementation.sortedVertexesIds, [0, 2, 3, 1, 4]);
}

function testGraphRegularAdjacencyMatrixTopologicalSortByAdjacencyListCase4() {
    const adjacencyMatrix = new GraphRegularAdjacencyMatrixClass();
    adjacencyMatrix.initByAdjacencyList(testAdjacencyListData4);

    const topologicalSortImplementation = new GraphRecursiveTopologicalSortVisitorClass();
    adjacencyMatrix.topologicalSort(topologicalSortImplementation);

    checkGraphRegularAdjacencyMatrixTopologicalSort(topologicalSortImplementation.sortedVertexesIds, [10, 8, 9, 6, 7, 0, 3, 4, 5, 1, 2]);
}

function testGraphRegularAdjacencyMatrixTopologicalSortByAdjacencyMatrixCase1() {
    const adjacencyMatrix = new GraphRegularAdjacencyMatrixClass();
    adjacencyMatrix.initByAdjacencyMatrix(testAdjacencyMatrixData1);

    const topologicalSortImplementation = new GraphRecursiveTopologicalSortVisitorClass();
    adjacencyMatrix.topologicalSort(topologicalSortImplementation);

    checkGraphRegularAdjacencyMatrixTopologicalSort(topologicalSortImplementation.sortedVertexesIds, [0, 3, 1, 2]);
}

function testGraphRegularAdjacencyMatrixTopologicalSortByAdjacencyMatrixCase2() {
    const adjacencyMatrix = new GraphRegularAdjacencyMatrixClass();
    adjacencyMatrix.initByAdjacencyMatrix(testAdjacencyMatrixData2);

    const topologicalSortImplementation = new GraphRecursiveTopologicalSortVisitorClass();
    adjacencyMatrix.topologicalSort(topologicalSortImplementation);

    checkGraphRegularAdjacencyMatrixTopologicalSort(topologicalSortImplementation.sortedVertexesIds, [0, 2, 1, 4, 5, 7, 6, 3]);
}

function testGraphRegularAdjacencyMatrixTopologicalSortByAdjacencyMatrixCase3() {
    const adjacencyMatrix = new GraphRegularAdjacencyMatrixClass();
    adjacencyMatrix.initByAdjacencyMatrix(testAdjacencyMatrixData3);

    const topologicalSortImplementation = new GraphRecursiveTopologicalSortVisitorClass();
    adjacencyMatrix.topologicalSort(topologicalSortImplementation);

    checkGraphRegularAdjacencyMatrixTopologicalSort(topologicalSortImplementation.sortedVertexesIds, [0, 2, 3, 1, 4]);
}

function testGraphRegularAdjacencyMatrixTopologicalSortByAdjacencyMatrixCase4() {
    const adjacencyMatrix = new GraphRegularAdjacencyMatrixClass();
    adjacencyMatrix.initByAdjacencyMatrix(testAdjacencyMatrixData4);

    const topologicalSortImplementation = new GraphRecursiveTopologicalSortVisitorClass();
    adjacencyMatrix.topologicalSort(topologicalSortImplementation);

    checkGraphRegularAdjacencyMatrixTopologicalSort(topologicalSortImplementation.sortedVertexesIds, [10, 8, 9, 6, 7, 0, 3, 4, 5, 1, 2]);
}

testGraphRegularAdjacencyMatrixTopologicalSortByAdjacencyListCase1();
testGraphRegularAdjacencyMatrixTopologicalSortByAdjacencyListCase2();
testGraphRegularAdjacencyMatrixTopologicalSortByAdjacencyListCase3();
testGraphRegularAdjacencyMatrixTopologicalSortByAdjacencyListCase4();

testGraphRegularAdjacencyMatrixTopologicalSortByAdjacencyMatrixCase1();
testGraphRegularAdjacencyMatrixTopologicalSortByAdjacencyMatrixCase2();
testGraphRegularAdjacencyMatrixTopologicalSortByAdjacencyMatrixCase3();
testGraphRegularAdjacencyMatrixTopologicalSortByAdjacencyMatrixCase4();

// exports
