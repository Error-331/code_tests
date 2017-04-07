'use strict';

const Maybe = function(val) {
    this.val = val;
};

Maybe.prototype.isNothing = function() {
    return this.val === null || this.val === undefined;
};

Maybe.prototype.map = function(fn) { // Functor
    return this.isNothing() ? Maybe.of(null) : Maybe.of(fn(this.val));
};

Maybe.prototype.ap = function(app) { // Apply
    return (typeof this.val !== 'function') ? Maybe.of(null) : app.map(this.val);
};

Maybe.of = function(val) { // Applicative
    return new Maybe(val);
};

export default Maybe;