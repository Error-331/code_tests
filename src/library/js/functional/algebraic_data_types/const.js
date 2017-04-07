'use strict';

const Const = function(val) {
    this.val = val;
};

Const.prototype.map = function(fn) { // Functor
    return Const.of(this.val);
};

Const.prototype.ap = function(app) { // Apply
    return Const.of(app);
};

Const.of = function(val) { // Applicative
    return new Const(val);
};

export default Const;