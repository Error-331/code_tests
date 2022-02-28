'use strict';

// external imports
const assert = require('assert').strict;

// internal imports
const {
    adjacencyList1_1,
    adjacencyList2_1,
    adjacencyList3_1,
    adjacencyList4_1,
    adjacencyList5_1,
    adjacencyList6_1,
    adjacencyList7_1,
} = require('./adjacency_list_representation');

// implementation
function depthFirstSearch(adjacencyList, vertexRowId = null, visitedVertexesIds = [], visitedVertexIdsPath = []) {
    if (visitedVertexesIds.length === 0 && adjacencyList.length !== 0) {
        visitedVertexesIds = Array(adjacencyList.length).fill(false, 0, adjacencyList.length);
    }

    let preparedVertexRowId = vertexRowId;

    if (vertexRowId === undefined || vertexRowId === null) {
        preparedVertexRowId = 0;

        visitedVertexesIds[0] = true
        visitedVertexIdsPath.push(0);
    }

    for (const edge of adjacencyList[preparedVertexRowId]) {

        const [ vertexId ] = edge;

        if (visitedVertexesIds[vertexId] === false) {
            visitedVertexesIds[vertexId] = true;
            visitedVertexIdsPath.push(vertexId);

            depthFirstSearch(adjacencyList, vertexId, visitedVertexesIds, visitedVertexIdsPath);
        }
    }

    return visitedVertexIdsPath;
}

let result = depthFirstSearch(adjacencyList1_1, null);
assert.deepStrictEqual(result, [0, 1, 2, 3]);

result = depthFirstSearch(adjacencyList2_1, null);
assert.deepStrictEqual(result, [0, 1, 4, 5, 3, 6, 7, 2]);

result = depthFirstSearch(adjacencyList3_1, null);
assert.deepStrictEqual(result, [0, 2, 1, 4, 3]);

result = depthFirstSearch(adjacencyList4_1, null);
assert.deepStrictEqual(result, [0, 1, 2, 3, 4, 5]);

result = depthFirstSearch(adjacencyList5_1, null);
assert.deepStrictEqual(result, [0, 1, 2, 4, 3]);

result = depthFirstSearch(adjacencyList6_1, null);
assert.deepStrictEqual(result, [0, 1, 2, 3]);

result = depthFirstSearch(adjacencyList7_1, null);
assert.deepStrictEqual(result, [0, 1, 4, 3, 2]);

// exports
