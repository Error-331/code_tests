'use strict';

// external imports
const {
    stubTrue,
    constant,
    identity,
    isNil,
    gt,
    equals,
    cond,
    curry,
    pipe,
    over,
    spread,
    range,
    map,
    reduce,
    times,
    takeWhile,
    trim,
    split,
    replace,
    compact,
    concat,
    slice,
    nth,
    size
} = require('lodash/fp');

// local imports
const {
    SEMVER_SINGLE_DELIMETER_REG_EXP,
    SEMVER_PRERELEASE_REG_EXP,
    SEMVER_OPERATOR_TO_VERSION_REG_EXP,



    SEMVER_OPERATOR_REG_EXP,
    SEMVER_VERSION_REG_EXP,
    SEMVER_OPERATOR_AND_VERSION_REG_EXP,
} = require('./../constants/semver_regexp_constants');

// helpers implementation
const prepareSemverVersion = (semverVersion, maxSemverVersion) => {
    const preparedSemverVersion = pipe(
        replace(new RegExp('x|X', 'g'), '*'),
        split('.'),
        map(versionPart => equals('*', versionPart) ? '9': versionPart),

        cond([
            [pipe(size, gt(3)), semverVersion => concat(semverVersion, times(constant('0'), 3 - size(semverVersion)))],
            [stubTrue, identity]
        ]),
    )(semverVersion);

    const preparedMaxSemverVersion = split('.', maxSemverVersion);
    const indexesToReplace = takeWhile(
        pipe(
            over([
                pipe(partIndex => nth(partIndex, preparedSemverVersion), parseInt),
                pipe(partIndex => nth(partIndex, preparedMaxSemverVersion), parseInt),
            ]),

            spread(gte),
        ),
        range(
            0,
            size(preparedSemverVersion)
        )
    );

    return concat(
        slice(0, size(indexesToReplace), preparedMaxSemverVersion),
        slice(size(indexesToReplace), 3, preparedSemverVersion)
    );
};

const determineMaxVersionFromRange = curry((currentMaxVersion, versionRange) => {
    const semverOperator = cond([
        [isNil, constant('')],
        [stubTrue, nth(1)]
    ])(SEMVER_OPERATOR_TO_VERSION_REG_EXP.exec(versionRange));

    const currentVersion = versionRange.replace(semverOperator, '');

    //cond
});

/*const fSpace = curry((currentMaxVersion, versionsRange) => pipe(
    trim,
    split(' '),
    filter(complement(isEmpty)), // to lib
    cond([
        [isArrayOfOne, ([versionRange]) => determineMaxVersion1(currentMaxVersion, versionRange)],
        [isArrayOdd, () => { throw new Error(`Cannot combine version range after 'space split': '${versionsRange}'`) }],
        [isArrayEven, combineVersionRangeParts],
    ]),
    reduce(determineMaxVersion, currentMaxVersion)
)(versionsRange));*/

const determineMaxVersionFromHyphenRange = curry((currentMaxVersion, versionsRange) => pipe(
    split('-'),
    compact,
    reduce(determineMaxVersionFromRange, currentMaxVersion),
)(versionsRange));

const determineMaxVersionFromRangePart = curry((currentMaxVersion, versionsRange) => pipe(
    trim,
    cond([
        [testStr => testStr.includes('-'), determineMaxVersionFromHyphenRange(currentMaxVersion)],
        //[testStr => testStr.includes(' '), fSpace(currentMaxVersion)],
        [stubTrue, determineMaxVersionFromRange(currentMaxVersion)],
    ])
)(versionsRange));

const determineMaxVersionFromRanges = (versionsRange) => pipe(
    // trim whitespaces
    trim,
    // replace '|' with '||'
    versionRange => versionRange.replace(
        SEMVER_SINGLE_DELIMETER_REG_EXP,
        (match, part1, part2, part3) => [part1, part3].join('||'),
    ),
    // replace '-dev.1' with '$dev.1' for latter parsing
    versionRange => versionRange.replace(
        SEMVER_PRERELEASE_REG_EXP,
        (match, part1, part2, part3, part4, part5) => [part1, part5].join('$'),
    ),
    // remove `spaces` between semver operator and version specifier
    versionRange => versionRange.replace(
        SEMVER_OPERATOR_TO_VERSION_REG_EXP,
        (match, part1, part2, part3) => [part1, part3].join(''),
    ),
    // split by '||'
    split('||'),
    // remove `empty` values
    compact,
    // determine max version using range part
    reduce(determineMaxVersionFromRangePart, null),
)(versionsRange);

// export
exports.prepareSemverVersion = prepareSemverVersion;
exports.determineMaxVersionFromRanges = determineMaxVersionFromRanges;