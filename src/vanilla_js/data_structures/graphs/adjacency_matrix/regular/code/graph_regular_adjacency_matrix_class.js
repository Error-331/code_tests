// external imports

// internal imports
const GraphVertexAdjacencyLinkedListClass = require('./../../../adjacency_list/linked/code/graph_vertex_adjacency_linked_list_class');

// implementation
class GraphRegularAdjacencyMatrixClass {
    #vertexRows = new Map();

    #addVertexData(vertexRow, vertexData) {
        let id = null;
        let data = null;

        if (typeof vertexData === 'object') {
            id = vertexData.id;
            data = vertexData?.id ?? null;
        } else {
            id = vertexData;
        }

        return vertexRow.pushVertexData(id, data).element;
    }

    #getOrCreateVertexRow(rowIdx) {
        if (this.#vertexRows.has(rowIdx) ) {
            return this.#vertexRows.get(rowIdx);
        } else {
            const newAdjacencyLinkedList = new GraphVertexAdjacencyLinkedListClass();
            this.#vertexRows.set(rowIdx, newAdjacencyLinkedList);

            return newAdjacencyLinkedList;
        }
    }

    depthFirstSearch(vertexRowId = null, visitedVertexesIds = []) {
        let preparedVertexRowId = vertexRowId;

        if (preparedVertexRowId === undefined || preparedVertexRowId === null) {
            const vertexRowIds = this.#vertexRows.keys();
            preparedVertexRowId = vertexRowIds.next().value;
            visitedVertexesIds.push(preparedVertexRowId);
        }

        for (const { element: { id: vertexId } } of this.#vertexRows.get(preparedVertexRowId)) {
            if (!visitedVertexesIds.includes(vertexId)) {
                visitedVertexesIds.push(vertexId);
                this.depthFirstSearch(vertexId, visitedVertexesIds);
            }
        }

        return visitedVertexesIds;
    }

    initByAdjacencyList(adjacencyList) {
        for(let rowIdx = 0; rowIdx < adjacencyList.length; rowIdx++) {
            const currentListRow = adjacencyList[rowIdx];

            if (currentListRow === undefined || currentListRow === null) {
                continue;
            }

            let currentRow = this.#getOrCreateVertexRow(rowIdx);
            let prevVertex = null;

            for (const currentElement of currentListRow) {
                prevVertex = this.#addVertexData(currentRow, currentElement, currentElement);
            }
        }
    }

    initByAdjacencyMatrix(adjacencyMatrix) {
        for(let rowIdx = 0; rowIdx < adjacencyMatrix.length; rowIdx++) {
            let currentRow = this.#getOrCreateVertexRow(rowIdx);
            let prevVertex = null;

            for (let columnIdx = 0; columnIdx < adjacencyMatrix.length; columnIdx++) {
                const currentElement = adjacencyMatrix[rowIdx][columnIdx];

                if (currentElement === 0 || currentElement === null) {
                    continue;
                }

                prevVertex = this.#addVertexData(currentRow, typeof currentElement === 'object' ? currentElement : columnIdx);
            }
        }
    }

    toArray() {
        const elementsArray = [];

        for (const vertexRow  of this.#vertexRows) {
            elementsArray.push(vertexRow[1].toArray());
        }

        return elementsArray;
    }

    get rowsCount() {
        return this.#vertexRows.size;
    }

    constructor() {
    }
}

// exports
module.exports = GraphRegularAdjacencyMatrixClass;
