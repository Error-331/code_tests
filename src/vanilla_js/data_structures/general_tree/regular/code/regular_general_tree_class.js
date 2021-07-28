'use strict';

const RegularGeneralTreeNodeClass = require('./regular_general_tree_node_class');

class RegularGeneralTreeClass {
    #root = null;

    createNewRoot(comparator = null, data = null) {
        this.#root = new RegularGeneralTreeNodeClass(this, null, comparator, data);
        return this.#root;
    }

    get root() {
        return this.#root;
    }

    constructor() {

    }
}

module.exports = RegularGeneralTreeClass;
