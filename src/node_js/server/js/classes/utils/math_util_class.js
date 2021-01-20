'use strict';

class MathUtilClass {
    static clamp(leftBoundary, rightBoundary, testValue) {
        if (testValue < leftBoundary) return leftBoundary;
        if (testValue > rightBoundary) return rightBoundary;
        return testValue;
    }
}

module.exports = MathUtilClass;