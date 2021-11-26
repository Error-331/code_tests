// external imports

// internal imports

// implementation
class GraphRecursiveDeepFirstSearchVisitorClass {
    depthFirstSearch(graph, vertexRowId = null, visitedVertexesIds = []) {
        let preparedVertexRowId = vertexRowId;

        if (preparedVertexRowId === undefined || preparedVertexRowId === null) {
            const vertexRowIds = graph.rowsIdsIterator;
            preparedVertexRowId = vertexRowIds.next().value;
            visitedVertexesIds.push(preparedVertexRowId);
        }

        for (const { element: { id: vertexId } } of graph.getRowById(preparedVertexRowId)) {
            if (!visitedVertexesIds.includes(vertexId)) {
                visitedVertexesIds.push(vertexId);
                this.depthFirstSearch(graph, vertexId, visitedVertexesIds);
            }
        }

        return visitedVertexesIds;
    }
}

// exports
module.exports = GraphRecursiveDeepFirstSearchVisitorClass;
