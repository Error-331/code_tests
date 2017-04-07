'use strict';

const Either = (function() {
    const Either = function(left, right) {
        if (arguments.length === 1) {
            return function(right) {
                return right == null ? Either.Left(left) : Either.Right(right);
            };
        }

        return right == null ? Either.Left(left) : Either.Right(right);
    };

    Either.prototype.map = function() { // Functor
        return this;
    };

    Either.of = function(val) { // Applicative
        return Either.Right(val);
    };

    Either.Left = function(val) {
        return new _Left(val);
    };

    Either.Right = function(val) {
        return new _Right(val);
    };

    const _Right = function(val) {
        this.val = val;
    };

    _Right.prototype = Object.create(Either.prototype);
    _Right.prototype.map = function(fn) { // Functor
        return new _Right(fn(this.val));
    };

    _Right.prototype.ap = function(app) { // Apply
        return app.map(this.val);
    };

    const _Left = function(val) {
        this.val = val;
    };

    _Left.prototype = Object.create(Either.prototype);
    _Left.prototype.ap = function(app) { // Apply
        return app;
    };

    return Either;
}());

export default Either;