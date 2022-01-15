// external imports

// internal imports
const RegularStackClass = require('./../../../../stack/regular/code/regular_stack_class');

// implementation
class GraphStackDeepFirstSearchVisitorClass {
    #visitedVertexesIds = null;

    depthFirstSearch(adjacencyMatrix, vertexRowId = null) {
        const valuesInStack = new Set();
        let preparedVertexRowId = vertexRowId;

        if (preparedVertexRowId === undefined || preparedVertexRowId === null) {
            const vertexRowIds = adjacencyMatrix.rowsIdsIterator;
            preparedVertexRowId = vertexRowIds.next().value;
        }

        const visitedVertexesFlags = [];
        const vertexStack = new RegularStackClass();

        visitedVertexesFlags.fill(false, 0, adjacencyMatrix.rowsCount);
        vertexStack.push(preparedVertexRowId);

        while (!vertexStack.isEmpty) {
            const currentVertexId = vertexStack.pop();

            visitedVertexesFlags[currentVertexId] = true;
            this.#visitedVertexesIds.push(currentVertexId);

            for (const { element: { id: vertexId } } of adjacencyMatrix.getRowById(currentVertexId)) {
                if (!visitedVertexesFlags[vertexId] && !valuesInStack.has(vertexId)) {
                    vertexStack.push(vertexId);
                    valuesInStack.add(vertexId);
                }
            }
        }
    }

    get visitedVertexesIds() {
        return this.#visitedVertexesIds.slice();
    }

    constructor() {
        this.#visitedVertexesIds = [];
    }
}

// exports
module.exports = GraphStackDeepFirstSearchVisitorClass;
