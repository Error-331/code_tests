'use strict';

// external imports

// internal imports

// implementation
const adjacencyList1_1 = [
    [ [1, null], [3, null] ],
    [ [0, null], [2, null] ],
    [ [1, null] ],
    [ [0, null] ]
];

const adjacencyList2_1 = [
    [ [1, null], [2, null], [3, null] ],
    [ [0, null], [4, null] ],
    [ [0, null] ],
    [ [0, null], [5, null] ],
    [ [1, null], [5, null] ],
    [ [3, null], [4, null], [6, null], [7, null] ],
    [ [5, null] ],
    [ [5, null] ]
];

const adjacencyList3_1 = [ // undirected unweighted graph
    [ [2, null], [3, null] ],
    [ [2, null], [4, null] ],
    [ [0, null], [1, null], [3, null], [4, null] ],
    [ [0, null], [2, null] ],
    [ [1, null], [2, null] ]
];

const adjacencyList4_1 = [
    [ [1, null], [3, null] ],
    [ [2, null] ],
    [],
    [ [4, null] ],
    [ [2, null], [5, null] ],
    [],
    [ [3, null], [7, null] ],
    [],
    [ [6, null], [9, null] ],
    [ [7, null] ],
    []
]

const adjacencyList5_1 = [ // undirected unweighted graph
    [ [1, null], [3, null] ],
    [ [0, null], [2, null], [4, null] ],
    [ [1, null], [4, null] ],
    [ [0, null] ],
    [ [1, null], [2, null] ]
];

const adjacencyList6_1 = [ // directed unweighted graph
    [ [1, null] ],
    [ [2, null], [3, null] ],
    [ [3, null] ],
    [ [0, null] ]
];

const adjacencyList6_2 = [ // directed weighted graph
    [ [1, 5] ],
    [ [2, 7], [3, 6] ],
    [ [3, 5] ],
    [ [0, 2] ]
];

const adjacencyList7_1 = [
    [ [1, null], [2, null], [3, null] ],
    [ [4, null] ],
    [ [3, null] ],
    [ [1, null] ],
    [ [3, null] ]
];

// exports
module.exports.adjacencyList1_1 = adjacencyList1_1;
module.exports.adjacencyList2_1 = adjacencyList2_1;
module.exports.adjacencyList3_1 = adjacencyList3_1;
module.exports.adjacencyList4_1 = adjacencyList4_1;
module.exports.adjacencyList5_1 = adjacencyList5_1;

module.exports.adjacencyList6_1 = adjacencyList6_1;
module.exports.adjacencyList6_2 = adjacencyList6_2;

module.exports.adjacencyList7_1 = adjacencyList7_1;
