// external imports

// internal imports
const GraphRegularAdjacencyMatrixClass = require('./../../../adjacency_matrix/regular/code/graph_regular_adjacency_matrix_class');
const GraphTopologicalDeepFirstSearchVisitorClass = require('./../code/graph_topological_deep_first_search_visitor_class');

const {
    checkGraphRegularAdjacencyMatrixDepthFirstSearch,
    checkGraphRegularAdjacencyMatrixDepthFirstSearchDeadEndSet,
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

const testAdjacencyMatrixData1 = [
    [0, 1, 0, 1],
    [1, 0, 1, 0],
    [0, 1, 0, 0],
    [1, 0, 0, 0]
];
// visitedVertexesIds - 0, 1, 2, 3
// deadEndVertexesIds - 2, 1, 3, 0

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
// visitedVertexesIds - 0, 1, 4, 5, 3, 6, 7, 2
// deadEndVertexesIds - 3, 6, 7, 5, 4, 1, 2, 0

const testAdjacencyMatrixData3 = [
//   1  2  3  4  5
    [0, 0, 1, 1, 0], // 1
    [0, 0, 1, 0, 1], // 2
    [1, 1, 0, 1, 1], // 3
    [1, 0, 1, 0, 0], // 4
    [0, 1, 1, 0, 0], // 5
];
// visitedVertexesIds - 0, 1, 2, 3
// deadEndVertexesIds - 4, 1, 3, 2, 0


function testGraphRegularAdjacencyMatrixDeepFirstSearchByAdjacencyListCase1() {
    const adjacencyMatrix = new GraphRegularAdjacencyMatrixClass();
    adjacencyMatrix.initByAdjacencyList(testAdjacencyListData1);

    const deepFirstImplementation = new GraphTopologicalDeepFirstSearchVisitorClass();
    adjacencyMatrix.depthFirstSearch(deepFirstImplementation);

    checkGraphRegularAdjacencyMatrixDepthFirstSearch(deepFirstImplementation.visitedVertexesIds, [0, 1, 2, 3]);
    checkGraphRegularAdjacencyMatrixDepthFirstSearchDeadEndSet(deepFirstImplementation.deadEndVertexesIds, new Set([2, 1, 3, 0]));
}

function testGraphRegularAdjacencyMatrixDeepFirstSearchByAdjacencyListCase2() {
    const adjacencyMatrix = new GraphRegularAdjacencyMatrixClass();
    adjacencyMatrix.initByAdjacencyList(testAdjacencyListData2);

    const deepFirstImplementation = new GraphTopologicalDeepFirstSearchVisitorClass();
    adjacencyMatrix.depthFirstSearch(deepFirstImplementation);

    checkGraphRegularAdjacencyMatrixDepthFirstSearch(deepFirstImplementation.visitedVertexesIds, [0, 1, 4, 5, 3, 6, 7, 2]);
    checkGraphRegularAdjacencyMatrixDepthFirstSearchDeadEndSet(deepFirstImplementation.deadEndVertexesIds, new Set([3, 6, 7, 5, 4, 1, 2, 0]));
}

function testGraphRegularAdjacencyMatrixDeepFirstSearchByAdjacencyListCase3() {
    const adjacencyMatrix = new GraphRegularAdjacencyMatrixClass();
    adjacencyMatrix.initByAdjacencyList(testAdjacencyListData3);

    const deepFirstImplementation = new GraphTopologicalDeepFirstSearchVisitorClass();
    adjacencyMatrix.depthFirstSearch(deepFirstImplementation);

    checkGraphRegularAdjacencyMatrixDepthFirstSearch(deepFirstImplementation.visitedVertexesIds, [0, 2, 1, 4, 3]);
    checkGraphRegularAdjacencyMatrixDepthFirstSearchDeadEndSet(deepFirstImplementation.deadEndVertexesIds, new Set([4, 1, 3, 2, 0]));
}

function testGraphRegularAdjacencyMatrixDeepFirstSearchByAdjacencyMatrixCase1() {
    const adjacencyMatrix = new GraphRegularAdjacencyMatrixClass();
    adjacencyMatrix.initByAdjacencyMatrix(testAdjacencyMatrixData1);

    const deepFirstImplementation = new GraphTopologicalDeepFirstSearchVisitorClass();
    adjacencyMatrix.depthFirstSearch(deepFirstImplementation);

    checkGraphRegularAdjacencyMatrixDepthFirstSearch(deepFirstImplementation.visitedVertexesIds, [0, 1, 2, 3]);
    checkGraphRegularAdjacencyMatrixDepthFirstSearchDeadEndSet(deepFirstImplementation.deadEndVertexesIds, new Set([2, 1, 3, 0]));
}

function testGraphRegularAdjacencyMatrixDeepFirstSearchByAdjacencyMatrixCase2() {
    const adjacencyMatrix = new GraphRegularAdjacencyMatrixClass();
    adjacencyMatrix.initByAdjacencyMatrix(testAdjacencyMatrixData2);

    const deepFirstImplementation = new GraphTopologicalDeepFirstSearchVisitorClass();
    adjacencyMatrix.depthFirstSearch(deepFirstImplementation);

    checkGraphRegularAdjacencyMatrixDepthFirstSearch(deepFirstImplementation.visitedVertexesIds, [0, 1, 4, 5, 3, 6, 7, 2]);
    checkGraphRegularAdjacencyMatrixDepthFirstSearchDeadEndSet(deepFirstImplementation.deadEndVertexesIds, new Set([3, 6, 7, 5, 4, 1, 2, 0]));
}

function testGraphRegularAdjacencyMatrixDeepFirstSearchByAdjacencyMatrixCase3() {
    const adjacencyMatrix = new GraphRegularAdjacencyMatrixClass();
    adjacencyMatrix.initByAdjacencyMatrix(testAdjacencyMatrixData3);

    const deepFirstImplementation = new GraphTopologicalDeepFirstSearchVisitorClass();
    adjacencyMatrix.depthFirstSearch(deepFirstImplementation);

    checkGraphRegularAdjacencyMatrixDepthFirstSearch(deepFirstImplementation.visitedVertexesIds, [0, 2, 1, 4, 3]);
    checkGraphRegularAdjacencyMatrixDepthFirstSearchDeadEndSet(deepFirstImplementation.deadEndVertexesIds, new Set([4, 1, 3, 2, 0]));
}

testGraphRegularAdjacencyMatrixDeepFirstSearchByAdjacencyListCase1();
testGraphRegularAdjacencyMatrixDeepFirstSearchByAdjacencyListCase2();
testGraphRegularAdjacencyMatrixDeepFirstSearchByAdjacencyListCase3();

testGraphRegularAdjacencyMatrixDeepFirstSearchByAdjacencyMatrixCase1();
testGraphRegularAdjacencyMatrixDeepFirstSearchByAdjacencyMatrixCase2();
testGraphRegularAdjacencyMatrixDeepFirstSearchByAdjacencyMatrixCase3();

// exports

