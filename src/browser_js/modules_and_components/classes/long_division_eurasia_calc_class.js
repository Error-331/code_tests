

// external imports

// local imports

// class implementation
class LongDivisionEurasiaCalcClass {
    // region static props
    // endregion

    // region private props
    #dividend = null;
    #dividendLength = null;

    #currentDividendDigitIdx = null;
    #currentDividendDigit = null;

    #divisor = null;
    #precision = 10;
    #currentPrecessionIdx = null;

    #reminders = [];

    #quotientDigits = [];
    #quotientComaFound = false;
    #quotientComaPos = null;

    // endregion

    // region constructor
    constructor(dividend, divisor) {
        this.#dividend = dividend;
        this.#divisor = divisor;

        this.calcDividendLength();
    }

    // endregion

    // region business logic
    calcDividendLength() {
        this.#dividendLength = this.dividendStrDigits.length;
    }

    calcQuotientDigit() {
        let quotient = 0;
        let divisorPart = 0;

        do {
            quotient += 1;
            divisorPart = divisorPart + this.#divisor;
        } while (divisorPart <= this.#currentDividendDigit);

        this.#currentDividendDigit = this.#currentDividendDigit - (divisorPart - this.#divisor);
        this.#quotientDigits.push(quotient - 1);
    }

    calcDivisorGtDividendDigit() {
        if (!this.hasNextDividendDigitStr) {
            this.#currentDividendDigit *= 10;

            if (this.#quotientComaFound === false) {
                if (this.#quotientComaPos === null) {
                    this.#quotientComaPos = this.#currentDividendDigitIdx - 1;
                }
                this.#quotientComaFound = true;
            } else {
                this.#quotientDigits.push(0);
            }
        } else {
            this.#currentDividendDigit = this.#currentDividendDigit * 10;
            this.#currentDividendDigit += this.nextDividendDigit;
        }
    }

    calcDivisorLteDividendDigit() {
        this.#quotientComaFound = false;
        this.calcQuotientDigit();

        if (!this.hasNextDividendDigitStr) {
            if (this.#currentDividendDigit === 0) {
                return true;
            } else {
                if (this.#currentPrecessionIdx >= this.#precision) {
                    return true;
                }

                this.#currentPrecessionIdx += 1;
            }
        } else {
            this.#currentDividendDigit = (this.#currentDividendDigit * 10) + this.nextDividendDigit;
        }

        return false;
    }

    // endregion

    // region event handlers
    // endregion

    // region public methods
    calc() {
        this.#currentDividendDigit = parseInt(this.dividendStrDigits[0]);

        this.#currentDividendDigitIdx = -1;
        this.#currentPrecessionIdx = -1;

        while (true) {
            this.#currentDividendDigitIdx += 1;

            if (this.#divisor > this.#currentDividendDigit) {
                this.calcDivisorGtDividendDigit();
            } else {
                if (this.calcDivisorLteDividendDigit()) {
                    console.log(this.#quotientDigits, this.#quotientComaPos);
                    return;
                }
            }
        }
    }

    // endregion

    // region state getter`s
    get dividendStrDigits() {
        const dividendStr = this.#dividend.toString();
        return dividendStr.split('');
    }

    get dividendStrDigits() {
        const dividendStr = this.#dividend.toString();
        return dividendStr.split('');
    }

    get nextDividendDigitStr() {
        const dividendStrDigits = this.dividendStrDigits;
        const currentDividendDigitIdx = this.#currentDividendDigitIdx;

        if (
            (dividendStrDigits === undefined || dividendStrDigits === null) ||
            (currentDividendDigitIdx === undefined || currentDividendDigitIdx === null)

        ) {
            return null;
        }

        const nextDividendDigit = dividendStrDigits[currentDividendDigitIdx + 1];

        if (nextDividendDigit === undefined || nextDividendDigit === null) {
            return null;
        } else {
            return nextDividendDigit;
        }
    }

    get nextDividendDigit() {
        const nextDividendDigitStr = this.nextDividendDigitStr;

        if (nextDividendDigitStr === null) {
            return null;
        } else {
            return parseInt(nextDividendDigitStr);
        }
    }

    get hasNextDividendDigitStr() {
        const nextDividendDigitStr = this.nextDividendDigitStr;

        if (nextDividendDigitStr === null) {
            return false;
        } else {
            return true;
        }
    }

    // endregion

    // region state setter`s
    // endregion
}

// exports
export default LongDivisionEurasiaCalcClass;