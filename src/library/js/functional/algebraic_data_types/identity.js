'use strict';

const Identity = function(val) {
    this.val = val;
};

Identity.prototype.map = function(fn) { // Functor
    return Identity.of(fn(this.val));
};

Identity.prototype.ap = function(app) { // Apply
    return app.map(this.val);
};

Identity.prototype.chain = function(fn) {  // Chain
    return fn(this.val);
};

Identity.of = function(val) { // Applicative
    return new Identity(val);
};

export default Identity;