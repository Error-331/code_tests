// external imports

// internal imports
const GraphTopologicalDeepFirstSearchVisitorClass = require('./../../../deep_first_search/topological/code/graph_topological_deep_first_search_visitor_class');

// implementation
class GraphRecursiveTopologicalSortVisitorClass extends GraphTopologicalDeepFirstSearchVisitorClass{
    topologicalSort(adjacencyMatrix) {
        for (const vertexId of adjacencyMatrix.rowsIdsIterator) {
            if (!this.visitedVertexesIdsRef.includes(vertexId)) {
                this.depthFirstSearch(adjacencyMatrix, vertexId);
            }
        }
    }

    get sortedVertexesIds() {
        return [...this.deadEndVertexesIds].reverse();
    }

    constructor() {
        super();
    }
}

// exports
module.exports = GraphRecursiveTopologicalSortVisitorClass;
