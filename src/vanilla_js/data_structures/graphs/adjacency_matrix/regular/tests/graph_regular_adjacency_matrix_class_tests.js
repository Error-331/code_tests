// external imports

// internal imports
const GraphRegularAdjacencyMatrixClass = require('./../code/graph_regular_adjacency_matrix_class');

const {
    checkGraphRegularAdjacencyMatrixIdsArray,
    checkGraphRegularAdjacencyMatrixRowsCount,
    checkGraphRegularAdjacencyMatrixRowById,
    checkGraphRegularAdjacencyMatrixRowsIds,
    checkGraphRegularAdjacencyMatrixRowsIdsByIterator,
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
]; // result - 0 1 2 3

const testAdjacencyMatrixData2 = [
    [0, 1, 1, 1, 0, 0, 0, 0],
    [1, 0, 0, 0, 1, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 1, 0, 0],
    [0, 1, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 1, 1, 0, 1, 1],
    [0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0],
]; // result - 0 1 4 5 3 6 7 2

const testAdjacencyMatrixData3 = [
//   1  2  3  4  5
    [0, 0, 1, 1, 0], // 1
    [0, 0, 1, 0, 1], // 2
    [1, 1, 0, 1, 1], // 3
    [1, 0, 1, 0, 0], // 4
    [0, 1, 1, 0, 0], // 5
]; // result - 0 2 1 4 3

function testGraphRegularAdjacencyMatrixInitByAdjacencyListCase1() {
    const adjacencyMatrix = new GraphRegularAdjacencyMatrixClass();
    adjacencyMatrix.initByAdjacencyList(testAdjacencyListData1);

    const adjacencyArray = adjacencyMatrix.toArray();

    checkGraphRegularAdjacencyMatrixIdsArray(adjacencyArray, [
        [1, 3],
        [0, 2],
        [1],
        [0],
    ]);
}

function testGraphRegularAdjacencyMatrixInitByAdjacencyListCase2() {
    const adjacencyMatrix = new GraphRegularAdjacencyMatrixClass();
    adjacencyMatrix.initByAdjacencyList(testAdjacencyListData2);

    const adjacencyArray = adjacencyMatrix.toArray();

    checkGraphRegularAdjacencyMatrixIdsArray(adjacencyArray, [
        [1, 2, 3],
        [0, 4],
        [0],
        [0, 5],
        [1, 5],
        [3, 4, 6, 7],
        [5],
        [5],
    ]);
}

function testGraphRegularAdjacencyMatrixInitByAdjacencyListCase3() {
    const adjacencyMatrix = new GraphRegularAdjacencyMatrixClass();
    adjacencyMatrix.initByAdjacencyList(testAdjacencyListData3);

    const adjacencyArray = adjacencyMatrix.toArray();

    checkGraphRegularAdjacencyMatrixIdsArray(adjacencyArray, [
        [2, 3],
        [2, 4],
        [0, 1, 3, 4],
        [0, 2],
        [1, 2],
    ]);
}

function testGraphRegularAdjacencyMatrixInitByAdjacencyMatrixCase1() {
    const adjacencyMatrix = new GraphRegularAdjacencyMatrixClass();
    adjacencyMatrix.initByAdjacencyMatrix(testAdjacencyMatrixData1);

    const adjacencyArray = adjacencyMatrix.toArray();

    checkGraphRegularAdjacencyMatrixIdsArray(adjacencyArray, [
        [1, 3],
        [0, 2],
        [1],
        [0],
    ]);
}

function testGraphRegularAdjacencyMatrixInitByAdjacencyMatrixCase2() {
    const adjacencyMatrix = new GraphRegularAdjacencyMatrixClass();
    adjacencyMatrix.initByAdjacencyMatrix(testAdjacencyMatrixData2);

    const adjacencyArray = adjacencyMatrix.toArray();

    checkGraphRegularAdjacencyMatrixIdsArray(adjacencyArray, [
        [1, 2, 3],
        [0, 4],
        [0],
        [0, 5],
        [1, 5],
        [3, 4, 6, 7],
        [5],
        [5],
    ]);
}

function testGraphRegularAdjacencyMatrixInitByAdjacencyMatrixCase3() {
    const adjacencyMatrix = new GraphRegularAdjacencyMatrixClass();
    adjacencyMatrix.initByAdjacencyMatrix(testAdjacencyMatrixData3);

    const adjacencyArray = adjacencyMatrix.toArray();

    checkGraphRegularAdjacencyMatrixIdsArray(adjacencyArray, [
        [2, 3],
        [2, 4],
        [0, 1, 3, 4],
        [0, 2],
        [1, 2],
    ]);
}

function testGraphRegularAdjacencyMatrixGetRowByIdCase1() {
    const adjacencyMatrix = new GraphRegularAdjacencyMatrixClass();
    adjacencyMatrix.initByAdjacencyList(testAdjacencyListData1);

    checkGraphRegularAdjacencyMatrixRowById(adjacencyMatrix.getRowById(1), [
        [0, null],
        [2, null],
    ]);
}

function testGraphRegularAdjacencyMatrixGetRowByIdCase2() {
    const adjacencyMatrix = new GraphRegularAdjacencyMatrixClass();
    adjacencyMatrix.initByAdjacencyList(testAdjacencyListData2);

    checkGraphRegularAdjacencyMatrixRowById(adjacencyMatrix.getRowById(0), [
        [1, null],
        [2, null],
        [3, null],
    ]);
}

function testGraphRegularAdjacencyMatrixGetRowByIdCase3() {
    const adjacencyMatrix = new GraphRegularAdjacencyMatrixClass();
    adjacencyMatrix.initByAdjacencyList(testAdjacencyListData3);

    checkGraphRegularAdjacencyMatrixRowById(adjacencyMatrix.getRowById(2), [
        [0, null],
        [1, null],
        [3, null],
        [4, null],
    ]);
}

function testGraphRegularAdjacencyMatrixGetRowByIdCase4() {
    const adjacencyMatrix = new GraphRegularAdjacencyMatrixClass();
    adjacencyMatrix.initByAdjacencyMatrix(testAdjacencyMatrixData1);

    checkGraphRegularAdjacencyMatrixRowById(adjacencyMatrix.getRowById(1), [
        [0, null],
        [2, null],
    ]);
}

function testGraphRegularAdjacencyMatrixGetRowByIdCase5() {
    const adjacencyMatrix = new GraphRegularAdjacencyMatrixClass();
    adjacencyMatrix.initByAdjacencyMatrix(testAdjacencyMatrixData2);

    checkGraphRegularAdjacencyMatrixRowById(adjacencyMatrix.getRowById(0), [
        [1, null],
        [2, null],
        [3, null],
    ]);
}

function testGraphRegularAdjacencyMatrixGetRowByIdCase6() {
    const adjacencyMatrix = new GraphRegularAdjacencyMatrixClass();
    adjacencyMatrix.initByAdjacencyMatrix(testAdjacencyMatrixData3);

    checkGraphRegularAdjacencyMatrixRowById(adjacencyMatrix.getRowById(2), [
        [0, null],
        [1, null],
        [3, null],
        [4, null],
    ]);
}

function testGraphRegularAdjacencyMatrixGetRowsIdsCase1() {
    const adjacencyMatrix = new GraphRegularAdjacencyMatrixClass();
    adjacencyMatrix.initByAdjacencyList(testAdjacencyListData1);

    checkGraphRegularAdjacencyMatrixRowsIds(adjacencyMatrix.rowsIds, [0, 1, 2, 3]);
}

function testGraphRegularAdjacencyMatrixGetRowsIdsCase2() {
    const adjacencyMatrix = new GraphRegularAdjacencyMatrixClass();
    adjacencyMatrix.initByAdjacencyList(testAdjacencyListData2);

    checkGraphRegularAdjacencyMatrixRowsIds(adjacencyMatrix.rowsIds, [0, 1, 2, 3, 4, 5, 6, 7]);
}

function testGraphRegularAdjacencyMatrixGetRowsIdsCase3() {
    const adjacencyMatrix = new GraphRegularAdjacencyMatrixClass();
    adjacencyMatrix.initByAdjacencyList(testAdjacencyListData3);

    checkGraphRegularAdjacencyMatrixRowsIds(adjacencyMatrix.rowsIds, [0, 1, 2, 3, 4]);
}

function testGraphRegularAdjacencyMatrixGetRowsIdsCase4() {
    const adjacencyMatrix = new GraphRegularAdjacencyMatrixClass();
    adjacencyMatrix.initByAdjacencyMatrix(testAdjacencyMatrixData1);

    checkGraphRegularAdjacencyMatrixRowsIds(adjacencyMatrix.rowsIds, [0, 1, 2, 3]);
}

function testGraphRegularAdjacencyMatrixGetRowsIdsCase5() {
    const adjacencyMatrix = new GraphRegularAdjacencyMatrixClass();
    adjacencyMatrix.initByAdjacencyMatrix(testAdjacencyMatrixData2);

    checkGraphRegularAdjacencyMatrixRowsIds(adjacencyMatrix.rowsIds, [0, 1, 2, 3, 4, 5, 6, 7]);
}

function testGraphRegularAdjacencyMatrixGetRowsIdsCase6() {
    const adjacencyMatrix = new GraphRegularAdjacencyMatrixClass();
    adjacencyMatrix.initByAdjacencyMatrix(testAdjacencyMatrixData3);

    checkGraphRegularAdjacencyMatrixRowsIds(adjacencyMatrix.rowsIds, [0, 1, 2, 3, 4]);
}

function testGraphRegularAdjacencyMatrixGetRowsIdsByIteratorCase1() {
    const adjacencyMatrix = new GraphRegularAdjacencyMatrixClass();
    adjacencyMatrix.initByAdjacencyList(testAdjacencyListData1);

    checkGraphRegularAdjacencyMatrixRowsIdsByIterator(adjacencyMatrix.rowsIdsIterator, [0, 1, 2, 3]);
}

function testGraphRegularAdjacencyMatrixGetRowsIdsByIteratorCase2() {
    const adjacencyMatrix = new GraphRegularAdjacencyMatrixClass();
    adjacencyMatrix.initByAdjacencyList(testAdjacencyListData2);

    checkGraphRegularAdjacencyMatrixRowsIdsByIterator(adjacencyMatrix.rowsIdsIterator, [0, 1, 2, 3, 4, 5, 6, 7]);
}

function testGraphRegularAdjacencyMatrixGetRowsIdsByIteratorCase3() {
    const adjacencyMatrix = new GraphRegularAdjacencyMatrixClass();
    adjacencyMatrix.initByAdjacencyList(testAdjacencyListData3);

    checkGraphRegularAdjacencyMatrixRowsIdsByIterator(adjacencyMatrix.rowsIdsIterator, [0, 1, 2, 3, 4]);
}

function testGraphRegularAdjacencyMatrixGetRowsIdsByIteratorCase4() {
    const adjacencyMatrix = new GraphRegularAdjacencyMatrixClass();
    adjacencyMatrix.initByAdjacencyMatrix(testAdjacencyMatrixData1);

    checkGraphRegularAdjacencyMatrixRowsIdsByIterator(adjacencyMatrix.rowsIdsIterator, [0, 1, 2, 3]);
}

function testGraphRegularAdjacencyMatrixGetRowsIdsByIteratorCase5() {
    const adjacencyMatrix = new GraphRegularAdjacencyMatrixClass();
    adjacencyMatrix.initByAdjacencyMatrix(testAdjacencyMatrixData2);

    checkGraphRegularAdjacencyMatrixRowsIdsByIterator(adjacencyMatrix.rowsIdsIterator, [0, 1, 2, 3, 4, 5, 6, 7]);
}

function testGraphRegularAdjacencyMatrixGetRowsIdsByIteratorCase6() {
    const adjacencyMatrix = new GraphRegularAdjacencyMatrixClass();
    adjacencyMatrix.initByAdjacencyMatrix(testAdjacencyMatrixData3);

    checkGraphRegularAdjacencyMatrixRowsIdsByIterator(adjacencyMatrix.rowsIdsIterator, [0, 1, 2, 3, 4]);
}

function testGraphRegularAdjacencyMatrixGetRowsCountCase1() {
    const adjacencyMatrix = new GraphRegularAdjacencyMatrixClass();
    adjacencyMatrix.initByAdjacencyList(testAdjacencyListData1);

    checkGraphRegularAdjacencyMatrixRowsCount(adjacencyMatrix.rowsCount, 4);
}

function testGraphRegularAdjacencyMatrixGetRowsCountCase2() {
    const adjacencyMatrix = new GraphRegularAdjacencyMatrixClass();
    adjacencyMatrix.initByAdjacencyList(testAdjacencyListData2);

    checkGraphRegularAdjacencyMatrixRowsCount(adjacencyMatrix.rowsCount, 8);
}

function testGraphRegularAdjacencyMatrixGetRowsCountCase3() {
    const adjacencyMatrix = new GraphRegularAdjacencyMatrixClass();
    adjacencyMatrix.initByAdjacencyList(testAdjacencyListData3);

    checkGraphRegularAdjacencyMatrixRowsCount(adjacencyMatrix.rowsCount, 5);
}

function testGraphRegularAdjacencyMatrixGetRowsCountCase4() {
    const adjacencyMatrix = new GraphRegularAdjacencyMatrixClass();
    adjacencyMatrix.initByAdjacencyMatrix(testAdjacencyMatrixData1);

    checkGraphRegularAdjacencyMatrixRowsCount(adjacencyMatrix.rowsCount, 4);
}

function testGraphRegularAdjacencyMatrixGetRowsCountCase5() {
    const adjacencyMatrix = new GraphRegularAdjacencyMatrixClass();
    adjacencyMatrix.initByAdjacencyMatrix(testAdjacencyMatrixData2);

    checkGraphRegularAdjacencyMatrixRowsCount(adjacencyMatrix.rowsCount, 8);
}

function testGraphRegularAdjacencyMatrixGetRowsCountCase6() {
    const adjacencyMatrix = new GraphRegularAdjacencyMatrixClass();
    adjacencyMatrix.initByAdjacencyMatrix(testAdjacencyMatrixData3);

    checkGraphRegularAdjacencyMatrixRowsCount(adjacencyMatrix.rowsCount, 5);
}

testGraphRegularAdjacencyMatrixInitByAdjacencyListCase1();
testGraphRegularAdjacencyMatrixInitByAdjacencyListCase2();
testGraphRegularAdjacencyMatrixInitByAdjacencyListCase3();

testGraphRegularAdjacencyMatrixInitByAdjacencyMatrixCase1();
testGraphRegularAdjacencyMatrixInitByAdjacencyMatrixCase2();
testGraphRegularAdjacencyMatrixInitByAdjacencyMatrixCase3();

testGraphRegularAdjacencyMatrixGetRowByIdCase1();
testGraphRegularAdjacencyMatrixGetRowByIdCase2();
testGraphRegularAdjacencyMatrixGetRowByIdCase3();
testGraphRegularAdjacencyMatrixGetRowByIdCase4();
testGraphRegularAdjacencyMatrixGetRowByIdCase5();
testGraphRegularAdjacencyMatrixGetRowByIdCase6();

testGraphRegularAdjacencyMatrixGetRowsIdsCase1();
testGraphRegularAdjacencyMatrixGetRowsIdsCase2();
testGraphRegularAdjacencyMatrixGetRowsIdsCase3();
testGraphRegularAdjacencyMatrixGetRowsIdsCase4();
testGraphRegularAdjacencyMatrixGetRowsIdsCase5();
testGraphRegularAdjacencyMatrixGetRowsIdsCase6();

testGraphRegularAdjacencyMatrixGetRowsIdsByIteratorCase1();
testGraphRegularAdjacencyMatrixGetRowsIdsByIteratorCase2();
testGraphRegularAdjacencyMatrixGetRowsIdsByIteratorCase3();
testGraphRegularAdjacencyMatrixGetRowsIdsByIteratorCase4();
testGraphRegularAdjacencyMatrixGetRowsIdsByIteratorCase5();
testGraphRegularAdjacencyMatrixGetRowsIdsByIteratorCase6();

testGraphRegularAdjacencyMatrixGetRowsCountCase1();
testGraphRegularAdjacencyMatrixGetRowsCountCase2();
testGraphRegularAdjacencyMatrixGetRowsCountCase3();
testGraphRegularAdjacencyMatrixGetRowsCountCase4();
testGraphRegularAdjacencyMatrixGetRowsCountCase5();
testGraphRegularAdjacencyMatrixGetRowsCountCase6();

// exports

