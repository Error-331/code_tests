'use strict';

// external imports
const assert = require('assert').strict;

// internal imports
const {
    adjacencyList3_1,
    adjacencyList5_1,
    adjacencyList6_1,
} = require('./adjacency_list_representation');

// implementation
function depthFirstSearch(adjacencyList, vertexRowId = null, visitedVertexesIds = [], visitedVertexIdsPath = []) {
    if (visitedVertexesIds.length === 0 && adjacencyList.length !== 0) {
        visitedVertexesIds = Array(adjacencyList3_1.length).fill(false, 0, adjacencyList3_1.length);
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

let result = depthFirstSearch(adjacencyList3_1, null);
assert.deepStrictEqual(result, [0, 2, 1, 4, 3]);

result = depthFirstSearch(adjacencyList5_1, null);
assert.deepStrictEqual(result, [0, 1, 2, 4, 3]);

result = depthFirstSearch(adjacencyList6_1, null);
assert.deepStrictEqual(result, [0, 1, 2, 3]);

// exports
