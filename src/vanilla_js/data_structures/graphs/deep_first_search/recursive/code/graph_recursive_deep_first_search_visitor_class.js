// external imports

// internal imports

// implementation
class GraphRecursiveDeepFirstSearchVisitorClass {
    #visitedVertexesIds = null;

    depthFirstSearch(adjacencyMatrix, vertexRowId = null) {
        let preparedVertexRowId = vertexRowId;

        if (preparedVertexRowId === undefined || preparedVertexRowId === null) {
            const vertexRowIds = adjacencyMatrix.rowsIdsIterator;
            preparedVertexRowId = vertexRowIds.next().value;
            this.#visitedVertexesIds.push(preparedVertexRowId);
        }

        for (const { element: { id: vertexId } } of adjacencyMatrix.getRowById(preparedVertexRowId)) {
            if (!this.#visitedVertexesIds.includes(vertexId)) {
                this.#visitedVertexesIds.push(vertexId);
                this.depthFirstSearch(adjacencyMatrix, vertexId);
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
module.exports = GraphRecursiveDeepFirstSearchVisitorClass;
