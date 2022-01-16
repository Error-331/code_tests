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
            data = vertexData?.data ?? null;
        } else {
            id = vertexData;
        }

        const requiredVertex = vertexRow.findVertexNodeById(id);

        if (requiredVertex === undefined || requiredVertex === null) {
            return vertexRow.pushVertexData(id, data).element;
        } else {
            return requiredVertex.element;
        }
    }

    #getOrCreateVertexRow(rowIdx) {
        if (this.#vertexRows.has(rowIdx) ) {
            return this.#vertexRows.get(rowIdx);
        } else {
            return this.createVertexRow(rowIdx);
        }
    }

    createVertexRow(rowIdx) {
        const newAdjacencyLinkedList = new GraphVertexAdjacencyLinkedListClass();
        this.#vertexRows.set(rowIdx, newAdjacencyLinkedList);

        return newAdjacencyLinkedList;
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

    depthFirstSearch(searchImplementationObj, rowId = null) {
        return searchImplementationObj.depthFirstSearch(this, rowId);
    }

    topologicalSort(topologicalSortImplementation) {
        return topologicalSortImplementation.topologicalSort(this);
    }

    addEdge(vertexIdFrom, vertexIdNext, data) {
        let vertexFromLinkedList = this.#getOrCreateVertexRow(vertexIdFrom);

        return this.#addVertexData(
            vertexFromLinkedList,
            {
                id: vertexIdNext,
                data
            }
        );
    }

    toArray() {
        const elementsArray = [];

        for (const vertexRow  of this.#vertexRows) {
            elementsArray.push(vertexRow[1].toArray());
        }

        return elementsArray;
    }

    getRowById(rowId) {
        if (rowId === undefined || rowId === null) {
            throw new Error('GraphVertexAdjacencyLinkedListClass: cannot find row for "undefined" row ID');
        }

        return this.#vertexRows.get(rowId);
    }

    get rowsIds() {
        const keysArray = [];

        for (const key of this.#vertexRows.keys()) {
            keysArray.push(key);
        }

        return keysArray;
    }

    get rowsIdsIterator() {
        return this.#vertexRows.keys();
    }

    get rowsCount() {
        return this.#vertexRows.size;
    }

    constructor() {
    }
}

// exports
module.exports = GraphRegularAdjacencyMatrixClass;
