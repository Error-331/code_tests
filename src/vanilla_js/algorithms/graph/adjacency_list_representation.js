'use strict';

// external imports

// internal imports

// implementation
const adjacencyList3_1 = [ // undirected unweighted graph
    [ [2, null], [3, null] ],
    [ [2, null], [4, null] ],
    [ [0, null], [1, null], [3, null], [4, null] ],
    [ [0, null], [2, null] ],
    [ [1, null], [2, null] ]
];

const adjacencyList4_1 = [ // undirected unweighted graph
    [ [1, null], [3, null] ],
    [ [0, null], [2, null], [4, null] ],
    [ [1, null], [4, null] ],
    [ [0, null] ],
    [ [1, null], [2, null] ]
];

const adjacencyList5_1 = [ // directed unweighted graph
    [ [1, null] ],
    [ [2, null], [3, null] ],
    [ [3, null] ],
    [ [0, null] ]
]; // 0 1 2 3

const adjacencyList5_2 = [ // directed weighted graph
    [ [1, 5] ],
    [ [2, 7], [3, 6] ],
    [ [3, 5] ],
    [ [0, 2] ]
];

// exports
module.exports.adjacencyList3_1 = adjacencyList3_1;
module.exports.adjacencyList4_1 = adjacencyList4_1;

module.exports.adjacencyList5_1 = adjacencyList5_1;
module.exports.adjacencyList5_2 = adjacencyList5_2;
