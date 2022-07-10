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
function breadthFirstSearch(adjacencyList, vertexRowId = null) {
    const vertexQueue = [];
    const visitedVertexIdsPath = [];

    let visitedVertexesIds = [];
    let visitedVertexIdsDistance = [];

    if (visitedVertexesIds.length === 0 && adjacencyList.length !== 0) {
        visitedVertexesIds = Array(adjacencyList.length).fill(false, 0, adjacencyList.length);
    }

    if (visitedVertexIdsDistance.length === 0 && adjacencyList.length !== 0) {
        visitedVertexIdsDistance = Array(adjacencyList.length).fill(false, 0, adjacencyList.length);
    }

    let preparedVertexRowId = vertexRowId;

    if (vertexRowId === undefined || vertexRowId === null) {
        preparedVertexRowId = 0;
    }

    visitedVertexIdsPath.push(preparedVertexRowId);
    visitedVertexesIds[preparedVertexRowId] = true
    visitedVertexIdsDistance[preparedVertexRowId] = 0;
    vertexQueue.push(preparedVertexRowId);

    while(vertexQueue.length > 0) {
        const vertexIdFromQueue = vertexQueue.shift();

        for (const edge of adjacencyList[vertexIdFromQueue]) {
            const [ vertexId ] = edge;

            if (visitedVertexesIds[vertexId] === true) {
                continue;
            }

            visitedVertexesIds[vertexId] = true;

            visitedVertexIdsPath.push(vertexId);
            visitedVertexIdsDistance[vertexId] = visitedVertexIdsDistance[vertexIdFromQueue] + 1;

            vertexQueue.push(vertexId);
        }
    }

    return visitedVertexIdsPath;
}

let result = breadthFirstSearch(adjacencyList1_1, null);
assert.deepStrictEqual(result, [0, 1, 3, 2]);

result = breadthFirstSearch(adjacencyList2_1, null);
assert.deepStrictEqual(result, [0, 1, 2, 3, 4, 5, 6, 7]);

result = breadthFirstSearch(adjacencyList3_1, null);
assert.deepStrictEqual(result, [0, 2, 3, 1, 4]);

result = breadthFirstSearch(adjacencyList4_1, null);
assert.deepStrictEqual(result, [0, 1, 3, 2, 4, 5]);

result = breadthFirstSearch(adjacencyList4_1, 8);
assert.deepStrictEqual(result, [8, 6, 9, 3, 7, 4, 2, 5]);

result = breadthFirstSearch(adjacencyList5_1, null);
assert.deepStrictEqual(result, [0, 1, 3, 2, 4]);

result = breadthFirstSearch(adjacencyList6_1, null);
assert.deepStrictEqual(result, [0, 1, 2, 3]);

result = breadthFirstSearch(adjacencyList7_1, null);
assert.deepStrictEqual(result, [0, 1, 2, 3, 4]);

// exports