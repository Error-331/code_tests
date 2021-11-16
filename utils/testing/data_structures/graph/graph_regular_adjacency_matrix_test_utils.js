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

// exports
module.exports.checkGraphRegularAdjacencyMatrixIdsArray = checkGraphRegularAdjacencyMatrixIdsArray;
module.exports.checkGraphRegularAdjacencyMatrixDepthFirstSearch = checkGraphRegularAdjacencyMatrixDepthFirstSearch;
