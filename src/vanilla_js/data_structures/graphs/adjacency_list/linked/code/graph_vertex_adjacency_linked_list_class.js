// external imports

// internal imports
const RegularLinkedListClass = require('./../../../../linked_list/regular/code/regular_linked_list_class');
const RegularGraphVertexClass = require('./../../../vertex/regular/code/regular_graph_vertex_class');

// implementation
class GraphVertexAdjacencyLinkedListClass extends RegularLinkedListClass {
    static comparator(firstVertex, secondVertex) {
        return firstVertex.id === secondVertex.id;
    }

    insertAfterVertex(newVertex, prevVertex = null) {
        if (prevVertex === undefined || prevVertex === null) {
            if (this.head === null) {
                return this.push(newVertex);
            } else {
                this.destroy();
                return this.push(newVertex);
            }
        } else {
            const prevNode = this.findNode(prevVertex);

            if (prevNode === null) {
                throw new Error('GraphVertexAdjacencyLinkedListClass: cannot insert vertex after non existent vertex');
            }

            return this.insertAfterNode(prevNode, newVertex);
        }
    }

    insertDataAfterVertex(vertexId, vertexData, prevVertex = null) {
        const newVertex = new RegularGraphVertexClass(vertexId, vertexData);
        return this.insertAfterVertex(newVertex, prevVertex);
    }

    pushVertexData(vertexId, vertexData) {
        const newVertex = new RegularGraphVertexClass(vertexId, vertexData);
        return this.push(newVertex);
    }

    removeVertex(vertex) {
        return this.remove(vertex);
    }

    removeVertexById(vertexId) {
        const emptyVertexWithId = new RegularGraphVertexClass(vertexId, null);
        return this.remove(emptyVertexWithId);
    }

    findVertexNode(vertex) {
        return this.findNode(vertex);
    }

    getVertexAfter(prevVertex = null) {
        if (prevVertex === undefined || prevVertex === null) {
            return this.head ?? null;
        } else {
            return this.findNode(prevVertex)?.next ?? null;
        }
    }

    constructor(comparator) {
        if (comparator !== undefined && comparator !== null) {
            super(comparator);
        } else {
            super(GraphVertexAdjacencyLinkedListClass.comparator);
        }
    }
}

// exports
module.exports = GraphVertexAdjacencyLinkedListClass;
