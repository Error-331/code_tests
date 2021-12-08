// external imports

// internal imports
const {
    MAZE_VISUALIZER_WALL_SYMBOL1_INDEX,
    MAZE_VISUALIZER_PATH_SYMBOL1_INDEX,

    MAZE_BLOCKS_MAP,
} = require('./graph_maze_symbol_visualizer_constants');

// implementation
class GraphMazeSymbolVisualizerClass {
    #maze = null;
    #symbolBuffer = [];

    #prepareSymbolArray() {
        const numberOfRows = this.#maze.numberOfRows;
        const numberOfColumns = this.#maze.numberOfColumns;

        for (let rowNumber = 0; rowNumber < numberOfRows; rowNumber++) {
            this.#symbolBuffer[rowNumber] = [];

            for (let columnNumber = 0; columnNumber < numberOfColumns; columnNumber++) {
                this.#symbolBuffer[rowNumber].push(MAZE_VISUALIZER_WALL_SYMBOL1_INDEX);
            }
        }
    }

    #traverseMazeGraph() {
        for (const mazeTile of this.#maze) {
            const tileData = mazeTile.element.data;
            this.#symbolBuffer[tileData.row][tileData.column] = MAZE_VISUALIZER_PATH_SYMBOL1_INDEX;
        }
    }

    #visualizeBlock(rowId, columnId) {
        const blockIndex = this.#symbolBuffer[rowId][columnId];
        return MAZE_BLOCKS_MAP.get(blockIndex);
    }

    visualize() {
        this.#prepareSymbolArray();
        this.#traverseMazeGraph();

        const numberOfRows = this.#maze.numberOfRows;
        const numberOfColumns = this.#maze.numberOfColumns;

        for (let rowNumber = 0; rowNumber < numberOfRows; rowNumber++) {
            let columnLine = '';

            for (let columnNumber = 0; columnNumber < numberOfColumns; columnNumber++) {
                columnLine += this.#visualizeBlock(rowNumber, columnNumber) + ' ';
            }

            console.log(columnLine);
        }
    }

    constructor(maze) {
        this.#maze = maze;
    }
}

// exports
module.exports = GraphMazeSymbolVisualizerClass;