// external imports

// internal imports
const RegularStackClass = require('./../../../../stack/regular/code/regular_stack_class');

// implementation
class GraphStackDeepFirstSearchVisitorClass {


    depthFirstSearch(graph, vertexRowId = null) {
        const vertexPath = [];
        const valuesInStack = new Set();
        let preparedVertexRowId = vertexRowId;

        if (preparedVertexRowId === undefined || preparedVertexRowId === null) {
            const vertexRowIds = graph.rowsIdsIterator;
            preparedVertexRowId = vertexRowIds.next().value;
        }

        const visitedVertexesFlags = [];
        const vertexStack = new RegularStackClass();

        visitedVertexesFlags.fill(false, 0, graph.rowsCount);
        vertexStack.push(preparedVertexRowId);

        while (!vertexStack.isEmpty) {
            const currentVertexId = vertexStack.pop();
            visitedVertexesFlags[currentVertexId] = true;
            vertexPath.push(currentVertexId);

            for (const { element: { id: vertexId } } of graph.getRowById(currentVertexId)) {
                if (!visitedVertexesFlags[vertexId] && !valuesInStack.has(vertexId)) {
                    vertexStack.push(vertexId);
                    valuesInStack.add(vertexId);
                }
            }
        }

        return vertexPath;
    }
}

/*

 */

// exports
module.exports = GraphStackDeepFirstSearchVisitorClass;
