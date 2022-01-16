// external imports
const assert = require('assert').strict;

// internal imports

// implementation
function checkGraphRegularAdjacencyMatrixIdsArray(adjacencyArray, idsArray) {
    for(let rowId = 0; rowId < adjacencyArray.length; rowId++) {
        for(let columnId = 0; columnId < adjacencyArray[rowId].length; columnId++) {
            assert.strictEqual(adjacencyArray[rowId][columnId].id, idsArray[rowId][columnId]);
        }
    }
}

function checkGraphRegularAdjacencyMatrixDepthFirstSearch(actualPath, expectedPath) {
    assert.deepStrictEqual(actualPath, expectedPath);
}

function checkGraphRegularAdjacencyMatrixDepthFirstSearchDeadEndSet(actualSet, expectedSet) {
    assert.strictEqual(actualSet.size === expectedSet.size, true);
    for (let expectedSetValue of expectedSet) {
        assert.strictEqual(actualSet.has(expectedSetValue), true);
    }
}

function checkGraphRegularAdjacencyMatrixTopologicalSort(actual, expected) {
    assert.strictEqual(typeof actual.length, 'number');
    assert.strictEqual(typeof expected.length, 'number');

    assert.strictEqual(actual.length === expected.length, true);

    for (let expectedValue of expected) {
        assert.strictEqual(actual.includes(expectedValue), true);
    }
}

function checkGraphRegularAdjacencyMatrixRowsCount(actualRowCount, expectedRowCount) {
    assert.strictEqual(actualRowCount, expectedRowCount);
}

function checkGraphRegularAdjacencyMatrixRowById(actualRowsData, expectedRowsData) {
    const actualRowsDataArray = actualRowsData.toArray();

    const actualRowsDataCount = actualRowsDataArray.length;
    const expectedRowsDataCount = expectedRowsData.length;

    assert.strictEqual(actualRowsDataCount, expectedRowsDataCount);

    for (let rowId = 0; rowId < actualRowsDataCount; rowId++) {
        const actualRowData = actualRowsDataArray[rowId];
        const expectedRowData = expectedRowsData[rowId];

        const [expectedId, expectedData] = expectedRowData;

        assert.strictEqual(actualRowData.id, expectedId);
        assert.deepStrictEqual(actualRowData.data, expectedData);
    }
}

function checkGraphRegularAdjacencyMatrixRowsIds(actualRowsIds, expectedRowsIds) {
    assert.deepStrictEqual(actualRowsIds, expectedRowsIds);
}

function checkGraphRegularAdjacencyMatrixRowsIdsByIterator(keysIterator, expectedRowsIds) {
    const keysArray = [];

    for (const key of keysIterator) {
        keysArray.push(key);
    }

    checkGraphRegularAdjacencyMatrixRowsIds(keysArray, expectedRowsIds);
}

// exports
module.exports.checkGraphRegularAdjacencyMatrixIdsArray = checkGraphRegularAdjacencyMatrixIdsArray;
module.exports.checkGraphRegularAdjacencyMatrixDepthFirstSearch = checkGraphRegularAdjacencyMatrixDepthFirstSearch;
module.exports.checkGraphRegularAdjacencyMatrixTopologicalSort = checkGraphRegularAdjacencyMatrixTopologicalSort;
module.exports.checkGraphRegularAdjacencyMatrixDepthFirstSearchDeadEndSet = checkGraphRegularAdjacencyMatrixDepthFirstSearchDeadEndSet;
module.exports.checkGraphRegularAdjacencyMatrixRowsCount = checkGraphRegularAdjacencyMatrixRowsCount;
module.exports.checkGraphRegularAdjacencyMatrixRowById = checkGraphRegularAdjacencyMatrixRowById;
module.exports.checkGraphRegularAdjacencyMatrixRowsIds = checkGraphRegularAdjacencyMatrixRowsIds;
module.exports.checkGraphRegularAdjacencyMatrixRowsIdsByIterator = checkGraphRegularAdjacencyMatrixRowsIdsByIterator;
