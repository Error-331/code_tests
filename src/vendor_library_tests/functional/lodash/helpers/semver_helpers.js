'use strict';

// external imports
const {stubTrue, identity, isEmpty, equals, cond, complement, curry, pipe, map, reduce, filter, trim, split, size} = require('lodash/fp');

// local imports
const {
    SEMVER_OPERATOR_REG_EXP,
    SEMVER_VERSION_REG_EXP,
    SEMVER_OPERATOR_AND_VERSION_REG_EXP,
} = require('./../constants/semver_regexp_constants');

// helpers implementation
const determineMaxVersionByOperatorAndVersion = curry((currentMaxVersion, versionRange) => pipe(
    constant('f')
    )
)

const determineMaxVersion = (currentMaxVersion, versionRange) => cond([
    [SEMVER_OPERATOR_AND_VERSION_REG_EXP.test, determineMaxVersionByOperatorAndVersion(currentMaxVersion)],
    [stubTrue, (versionRange) => {throw new Error(`Cannot chose method for finding appropriate version for range: '${versionRange}'`)}]
])(versionRange);

const isArrayOfOne = usrArray => equals(size(usrArray), 1);
const isArrayOdd = usrArray => equals(size(usrArray) % 2, 1);
const isArrayEven = complement(isArrayOdd);

const combineVersionRangeParts = (versionRangeParts) => reduce(


    (versionsRangeData, versionRangePart) => {
        if (versionsRangeData.skip) {
            versionsRangeData.skip = false;
            versionsRangeData.index += 1;

            if (versionsRangeData.index >= versionsRangeData.totalSize) {
                return versionsRangeData.preparedVersions;
            } else {
                return versionsRangeData;
            }
        }

        const nextIndex = versionsRangeData.index + 1;

        if (SEMVER_OPERATOR_AND_VERSION_REG_EXP.test(versionRangePart)) {
            versionsRangeData.preparedVersions.push(versionRangePart);
        } else if (SEMVER_OPERATOR_REG_EXP.test(versionRangePart)) {


            // might be single '*' operator
            if (nextIndex >= versionsRangeData.totalSize) {
                versionsRangeData.preparedVersions.push(versionRangePart);
            } else {
                versionsRangeData.preparedVersions.push(`${versionRangePart}${versionRangeParts[nextIndex]}`);
                versionsRangeData.skip = true;
            }
        }

        versionsRangeData.index += 1;

        if (versionsRangeData.index >= versionsRangeData.totalSize) {
            return versionsRangeData.preparedVersions;
        } else {
            return versionsRangeData;
        }
    },

    {index: 0, totalSize: size(versionRangeParts), preparedVersions: [], skip: false},

    versionRangeParts
);

const fSpace = curry((currentMaxVersion, versionsRange) => pipe(
    trim,
    split(' '),
    filter(complement(isEmpty)), // to lib
    cond([
        [isArrayOfOne, ([versionRange]) => determineMaxVersion(currentMaxVersion, versionRange)],
        [isArrayOdd, () => { throw new Error(`Cannot combine version range after 'space split': '${versionsRange}'`) }],
        [isArrayEven, combineVersionRangeParts],
    ]),
    reduce(determineMaxVersion, currentMaxVersion)
)(versionsRange));

const fHypen = curry((currentMaxVersion, versionsRange) => pipe(
    split('-'),
    map(fSpace(currentMaxVersion)),
)(versionsRange));

const f2 = curry((currentMaxVersion, versionsRange) => pipe(
    trim,
    cond([
        [testStr => testStr.includes('-'), fHypen(currentMaxVersion)],
        [testStr => testStr.includes(' '), fSpace(currentMaxVersion)],
        [stubTrue, identity],
    ])
)(versionsRange));

const f1 = (versionsRange) => pipe(
    trim,
    split('||'), // | or || - case
    // check if more then 1 - BIO OR needed else compare versions - generally cond is needed
    reduce(f2, ''),
)(versionsRange);

console.log(f1('  1.2.3 - 2.3.4 ||   >=3.5.6  || 2.5.6 -   2.6.0 || >=   1.2.3 <   2.4.0 '));