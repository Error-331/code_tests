// external imports

// internal imports
const GraphLineMazeGeneratorClass = require('./../../../generator/line/code/graph_line_maze_generator_class');
const GraphMazeSymbolVisualizerClass = require('./../code/graph_maze_symbol_visualizer_class');

// implementation
// TODO: create tests

const generator = new GraphLineMazeGeneratorClass(5, 5);
generator.generate(0, 0);


const visuzlizer = new GraphMazeSymbolVisualizerClass(generator);
visuzlizer.visualize();

// exports


