// external imports

// internal imports

// implementation
class GraphRecursiveDeepFirstSearchVisitorClass {
    depthFirstSearch(adjacencyMatrix, vertexRowId = null, visitedVertexesIds = []) {
        let preparedVertexRowId = vertexRowId;

        if (preparedVertexRowId === undefined || preparedVertexRowId === null) {
            const vertexRowIds = adjacencyMatrix.rowsIdsIterator;
            preparedVertexRowId = vertexRowIds.next().value;
            visitedVertexesIds.push(preparedVertexRowId);
        }

        for (const { element: { id: vertexId } } of adjacencyMatrix.getRowById(preparedVertexRowId)) {
            if (!visitedVertexesIds.includes(vertexId)) {
                visitedVertexesIds.push(vertexId);
                this.depthFirstSearch(adjacencyMatrix, vertexId, visitedVertexesIds);
            }
        }

        return visitedVertexesIds;
    }
}

// exports
module.exports = GraphRecursiveDeepFirstSearchVisitorClass;
