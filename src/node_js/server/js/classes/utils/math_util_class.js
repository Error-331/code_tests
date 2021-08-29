'use strict';

class MathUtilClass {
    static generateRandomNumber(maximum = 999) {
        return Math.floor((Math.random() * maximum) + 1);
    }

    static clamp(leftBoundary, rightBoundary, testValue) {
        if (testValue < leftBoundary) return leftBoundary;
        if (testValue > rightBoundary) return rightBoundary;
        return testValue;
    }
}

module.exports = MathUtilClass;
