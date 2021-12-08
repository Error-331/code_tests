// external imports
const GraphRegularAdjacencyMatrixClass = require('./../../../../adjacency_matrix/regular/code/graph_regular_adjacency_matrix_class');

// internal imports
const {
    MAZE_GENERATOR_NEXT_DIRECTION_UP,
    MAZE_GENERATOR_NEXT_DIRECTION_DOWN,

    MAZE_GENERATOR_NEXT_DIRECTION_LEFT,
    MAZE_GENERATOR_NEXT_DIRECTION_RIGHT,

    MAZE_GENERATOR_TOP_MAZE_SIDE,
    MAZE_GENERATOR_BOTTOM_MAZE_SIDE,

    MAZE_GENERATOR_LEFT_MAZE_SIDE,
    MAZE_GENERATOR_RIGHT_MAZE_SIDE
} = require('./graph_line_maze_generator_constants');

// implementation
class GraphLineMazeGeneratorClass {
    #numberOfRows = 0;
    #numberOfColumns = 0;

    #currentRowId = null;
    #currentColumnId = null;

    #prevDirection = null
    #adjacencyMatrix = null;

    #exitConditions = [];

    #clearUtilityData() {
        this.#currentRowId = null;
        this.#currentColumnId = null;

        this.#prevDirection = null
        this.#adjacencyMatrix = new GraphRegularAdjacencyMatrixClass();
    }

    #determinePossibleDirection() {
        const directions = [];

        if (this.#currentColumnId > 0 && this.#prevDirection !== MAZE_GENERATOR_NEXT_DIRECTION_RIGHT) {
            directions.push(MAZE_GENERATOR_NEXT_DIRECTION_LEFT);
        }

        if (this.#currentColumnId < this.#numberOfColumns - 1 && this.#prevDirection !== MAZE_GENERATOR_NEXT_DIRECTION_LEFT) {
            directions.push(MAZE_GENERATOR_NEXT_DIRECTION_RIGHT);
        }

        if (this.#currentRowId > 0 && this.#prevDirection !== MAZE_GENERATOR_NEXT_DIRECTION_DOWN) {
            directions.push(MAZE_GENERATOR_NEXT_DIRECTION_UP);
        }

        if (this.#currentRowId < this.#numberOfRows - 1 && this.#prevDirection !== MAZE_GENERATOR_NEXT_DIRECTION_UP) {
            directions.push(MAZE_GENERATOR_NEXT_DIRECTION_DOWN);
        }

        return directions;
    }

    #determineNextStep() {
        let nextRowId = this.#currentRowId;
        let nextColumnId = this.#currentColumnId;

        const possibleDirections = this.#determinePossibleDirection();

        if (possibleDirections.length === 0) {
            return null;
        }

        const directionId = Math.floor(Math.random() * possibleDirections.length);
        const direction = possibleDirections[directionId];

        switch (direction) {
            case MAZE_GENERATOR_NEXT_DIRECTION_LEFT:
                nextColumnId -= 1;
                break;
            case MAZE_GENERATOR_NEXT_DIRECTION_RIGHT:
                nextColumnId += 1;
                break;
            case MAZE_GENERATOR_NEXT_DIRECTION_UP:
                nextRowId -= 1;
                break;
            case MAZE_GENERATOR_NEXT_DIRECTION_DOWN:
                nextRowId += 1;
                break;
            default:
                return null;
        }

        const nextVertexId = this.#determineVertexIdByRowColumn(nextRowId, nextColumnId);

        return {
            nextRowId,
            nextColumnId,
            direction,
            nextVertexId,
        };
    }

    #determineVertexIdByRowColumn(rowId, columnId) {
        return rowId * (this.#numberOfRows) + columnId;
    }

    #checkMazeReachExitBySide(side = null) {
        if (side === null) {
            return false;
        }

        switch (side) {
            case MAZE_GENERATOR_TOP_MAZE_SIDE:
                return typeof this.#currentRowId === 'number' &&this.#currentRowId === 0;
            case MAZE_GENERATOR_BOTTOM_MAZE_SIDE:
                return typeof this.#currentRowId === 'number' && this.#currentRowId === this.#numberOfRows - 1;
            case MAZE_GENERATOR_LEFT_MAZE_SIDE:
                return typeof this.#currentColumnId === 'number' && this.#currentColumnId === 0;
            case MAZE_GENERATOR_RIGHT_MAZE_SIDE:
                return typeof this.#currentColumnId === 'number' && this.#currentColumnId === this.#numberOfColumns - 1;
            default:
                return false;
        }
    }

    #checkMazeReachExitByRowColumnSide(rowId = null, columnId = null, side = null) {
        let isExitReached = false;

        isExitReached = rowId !== null ? (this.#currentRowId === rowId) : isExitReached;
        isExitReached = columnId !== null ? (this.#currentColumnId === columnId) : isExitReached;
        isExitReached = side !== null ? this.#checkMazeReachExitBySide(side) : isExitReached;

        return isExitReached
    }

    #checkMazeReachExitByArray(rowId, columnId, exitConditions) {
        if (exitConditions.length === 0) {
            return true;
        }

        for (const exitCondition of exitConditions) {
            if (typeof exitCondition === 'object') {
                const [ rowId, columnId, side ] = exitCondition;

                if (this.#checkMazeReachExitByRowColumnSide(rowId, columnId, side)) {
                    return true;
                }
            }
        }
    }

    #checkMazeReachExit() {
        if (typeof this.#exitConditions === 'object') {
            return this.#checkMazeReachExitByArray(this.#currentRowId, this.#currentColumnId, this.#exitConditions);
        } else if (typeof this.#exitConditions === 'string') {
            return this.#checkMazeReachExitBySide(this.#exitConditions);
        } else {
            return true;
        }
    }

    #addNextEdge(currentVertexId) {
        const nextStepData = this.#determineNextStep();

        if (nextStepData === undefined || nextStepData === null) {
            return null;
        }

        const {
            nextRowId,
            nextColumnId,
            direction,
            nextVertexId,
        } = nextStepData;

        this.#adjacencyMatrix.addEdge(
            currentVertexId,
            nextVertexId,
            {
                row: nextRowId,
                column: nextColumnId,
                direction,
            }
        );

        this.#currentRowId = nextRowId;
        this.#currentColumnId = nextColumnId;
        this.#prevDirection = direction;

        return nextStepData;
    }

    [Symbol.iterator]() {
        const rowsIdsIterator = this.#adjacencyMatrix.rowsIdsIterator;
        let currentVertexIterator = null;

        let currentRowIdIteration = null;
        let currentRowId = null;

        let currentVertexList = null;
        let currentVertexIteration = null;

        const mazeGenerator = this;

        return {
            nextChildRowIteration: function() {
                currentRowIdIteration = rowsIdsIterator.next();

                if (currentRowIdIteration.done) {
                    return { done: true };
                }

                currentRowId = currentRowIdIteration.value;
                currentVertexList = mazeGenerator.#adjacencyMatrix.getRowById(currentRowId);

                currentVertexIterator = currentVertexList[Symbol.iterator]();
                currentVertexIteration = currentVertexIterator.next();

                if (currentVertexIteration.done) {
                    return { done: true };
                } else {
                    return { value: currentVertexIteration.value, done: false };
                }
            },

            next: function() {
                if (currentVertexIterator === null) {
                    return this.nextChildRowIteration();
                }

                currentVertexIteration = currentVertexIterator.next();

                if (currentVertexIteration.done) {
                    return this.nextChildRowIteration();
                } else {
                    return { value: currentVertexIteration.value, done: false };
                }
            }
        }
    }

    generate(startRowId = 0, startColumnId = 0) {
        this.#clearUtilityData();

        const mazeArea = this.area;

        if (mazeArea <= 0) {
            return null;
        }

        this.#currentRowId = startRowId;
        this.#currentColumnId = startColumnId
        this.#prevDirection = null;

        let currentVertexId = this.#determineVertexIdByRowColumn(this.#currentRowId, this.#currentColumnId, this.#prevDirection);
        let mazeNotReady = true;

        let nextStepData = this.#addNextEdge(currentVertexId);
        if (nextStepData === null) {
            return;
        }

        this.#adjacencyMatrix.addEdge(
            nextStepData.nextVertexId,
            currentVertexId,
            {
                row: startRowId,
                column: startColumnId,
                direction: null,
            }
        );

        mazeNotReady = !this.#checkMazeReachExit();

        while(mazeNotReady) {
            const nextStepData = this.#addNextEdge(currentVertexId);

            if (nextStepData === null) {
                return;
            }

            mazeNotReady = !this.#checkMazeReachExit();
        }
    }

    get numberOfRows() {
        return this.#numberOfRows;
    }

    get numberOfColumns() {
        return this.#numberOfColumns;
    }

    get area() {
        return this.#numberOfColumns * this.#numberOfRows;
    }

    constructor(numberOfRows, numberOfColumns, exitConditions = MAZE_GENERATOR_RIGHT_MAZE_SIDE) {
        this.#numberOfRows = numberOfRows;
        this.#numberOfColumns = numberOfColumns;

        this.#exitConditions = exitConditions;
    }
}

// exports
module.exports = GraphLineMazeGeneratorClass;