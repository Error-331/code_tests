'use strict';

// external imports
const {
    stubTrue,
    constant,
    identity,
    isNil,
    isEmpty,
    isFinite,
    min,
    lte,
    gt,
    gte,
    equals,
    cond,
    complement,
    curry,
    pipe,
    over,
    spread,
    range,
    map,
    reduce,
    times,
    takeWhile,
    dropWhile,
    findLastIndex,
    trim,
    split,
    replace,
    compact,
    concat,
    slice,
    nth,
    size,
    last,
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
//TODO: to helpers
const findLastFiniteValueIndex = findLastIndex(isFinite);
//TODO: to helpers
const findLastFiniteNoneZeroValueIndex = findLastIndex(usrValue => isFinite(usrValue) && usrValue !== 0);
//TODO: to helpers
const incrementAtIndex = curry((index, usrArray) => {
    const newArray = usrArray.slice();
    newArray[index]++;

    return newArray;
});
//TODO: to helpers
const decrementAtIndex = curry((index, usrArray) => {
    const newArray = usrArray.slice();
    newArray[index]--;

    return newArray;
});

const performOperationAtLastPartOfParsedVersion = curry((callback, versionParts) => {
    return pipe(
        findLastFiniteNoneZeroValueIndex,
        cond([
            [equals(-1), constant(versionParts)],
            [stubTrue, index => callback(index, versionParts)]
        ])
    )(versionParts);
});

const incrementLastPartOfParsedVersion =
    performOperationAtLastPartOfParsedVersion(incrementAtIndex);

const decrementLastPartOfParsedVersion =
    performOperationAtLastPartOfParsedVersion(decrementAtIndex);

const performTildaOperatorOnParsedVersion = (versionParts) => {

};

const semverStringToParts = (prereleaseTagPartDelimiter, semverVersion) => {
    const [semverVersionPart, semverPrereleaseTagPart] = split(prereleaseTagPartDelimiter, semverVersion);

    return compact(concat(
        pipe(
            replace(new RegExp('x|X', 'g'), '*'),
            split('.'),
            map(
                cond([
                    [equals('*'), constant(Infinity)],
                    [stubTrue, parseInt]
                ])),
            )
        (semverVersionPart),
        semverPrereleaseTagPart
    ));
};

const normalizeSemverVersion = curry((maxSemverVersion, semverVersion) => {
    const normalizedSemverVersion = semverStringToParts('$', semverVersion);

    if (size(split('$', semverVersion)) >= 2) {
        return normalizedSemverVersion;
    }

    const normalizedMaxSemverVersion = semverStringToParts('-', maxSemverVersion);
    const indexesToReplace = takeWhile(
        pipe(
            over([
                partIndex => nth(partIndex, normalizedSemverVersion),
                partIndex => nth(partIndex, normalizedMaxSemverVersion),
            ]),

            spread(gte),
        ),
        range(
            0,
            size(normalizedSemverVersion)
        )
    );

    return concat(
        slice(0, size(indexesToReplace), normalizedMaxSemverVersion),
        slice(size(indexesToReplace), size(normalizedSemverVersion), normalizedSemverVersion)
    );
});

const extractSemverOperator = (singularRangePart) => {
    return cond([
        [isNil, constant('')],
        [stubTrue, nth(1)]
    ])(
        new RegExp(SEMVER_OPERATOR_TO_VERSION_REG_EXP, 'g').exec(singularRangePart)
    );
};

const extractSemverVersionParts = (npmMaximumVersion, singularRangePart) => {
    return pipe(
        trim,
        replace(extractSemverOperator(singularRangePart), ''),
        normalizeSemverVersion(npmMaximumVersion)
    )(singularRangePart)
};

const compareTwoParsedSemverVersions = (firstVer, secondVer) => {
    if (isNil(secondVer) || isEmpty(secondVer)) {
        return 1;
    }

    return cond([
        [pipe(size, equals(0)), constant(0)],
        [stubTrue, pipe(
            nth(0),
            over([
                indexToCheck => firstVer[indexToCheck],
                indexToCheck => secondVer[indexToCheck],
            ]),
            spread(gt),
            cond([
                [equals(true), constant(1)],
                [equals(false), constant(-1)]
            ])
        )],
    ])(
        dropWhile(
            pipe(
                over([
                    partIndex => nth(partIndex, firstVer),
                    partIndex => nth(partIndex, secondVer),
                ]),
                spread(equals),
            ),

            range(
                0,
                min([
                    size(firstVer),
                    size(secondVer),
                ])
            )
        )
    );
};

const conditionIsFulfilledForTwoParsedSemverVersions = (firstVer, secondVer, condition) => {
    const comparisonResult = compareTwoParsedSemverVersions(firstVer, secondVer);

    return cond([
        [equals('='),  constant(equals(comparisonResult, 0))],
        [equals('>'),  constant(equals(comparisonResult, 1))],
        [equals('<'),  constant(equals(comparisonResult, -1))],
        [equals('>='), constant(gte(comparisonResult, 0))],
        [equals('<='), constant(lte(comparisonResult, 0))],
    ])(condition)
};

const semverFullRangeToSections = pipe(
    // trim whitespaces
    trim,
    // replace '|' with '||'
    versionRange => versionRange.replace(
        SEMVER_SINGLE_DELIMETER_REG_EXP,
        (match, part1, part2, part3) => [part1, part3].join('||'),
    ),
    // replace '-dev.1' with '$dev.1' for latter parsing (prerelease tag)
    versionRange => versionRange.replace(
        SEMVER_PRERELEASE_REG_EXP,
        (match, part1, part2, part3, part4, part5) => [part1, part5].join('$'),
    ),
    // remove `spaces` between semver operator and version specifier
    versionRange => versionRange.replace(
        new RegExp(SEMVER_OPERATOR_TO_VERSION_REG_EXP, 'g'),
        (match, part1, part2, part3) => [part1, part3].join(''),
    ),
    // split by '||'
    split('||'),
    // remove `empty` values
    compact,
);

const determineMaxVersionFromRange = curry((npmMaximumVersion, currentMaxVersion, versionRange) => {
    const semverOperator = extractSemverOperator(versionRange);

    const currentVersionParts = extractSemverVersionParts(npmMaximumVersion, versionRange);
    const currentMaxVersionParts = extractSemverVersionParts(npmMaximumVersion, currentMaxVersion);

    //console.log('zpp', semverOperator, isEmpty(semverOperator));
    //console.log('zpp1', currentMaxVersion, currentMaxVersionParts, isEmpty(currentMaxVersionParts));

    console.log('zpp2', incrementLastPartOfParsedVersion([1, Infinity,4]));

    /*const determineMaxVersionForParsedRange = (versionParts, condition) => {
        cond([
            [isEmpty, constant(versionParts)],
            [constant('='),  constant(versionParts)],
            [constant('>='), constant(versionParts)],
            [constant('<='), constant(versionParts)],
            [constant('>'),  constant(incrementLastPartOfParsedVersion(versionParts))],
            [constant('<'),  constant(decrementLastPartOfParsedVersion(versionParts))],
            [constant('~'),  constant(performTildaOperatorOnParsedVersion(versionParts))],
            [constant('^'),  constant(performCaretOperatorOnParsedVersion(versionParts))]
        ])(condition)
    };*/

    //compareTwoParsedSemverVersions(currentVersionParts, currentMaxVersionParts);

    //console.log('compare', conditionIsFulfilledForTwoParsedSemverVersions(currentVersionParts, currentMaxVersionParts, semverOperator));


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

const determineMaxVersionFromHyphenRange = curry((npmMaximumVersion, currentMaxVersion, versionsRange) => pipe(
    split('-'),
    compact,
    reduce(determineMaxVersionFromRange(npmMaximumVersion), currentMaxVersion),
)(versionsRange));

const determineMaxVersionFromRangePart = curry((npmMaximumVersion, currentMaxVersion, versionsRange) => pipe(
    trim,
    cond([
        [testStr => testStr.includes('-'), determineMaxVersionFromHyphenRange(npmMaximumVersion, currentMaxVersion)],
        //[testStr => testStr.includes(' '), fSpace(currentMaxVersion)],
        [stubTrue, determineMaxVersionFromRange(npmMaximumVersion, currentMaxVersion)],
    ])
)(versionsRange));

const determineMaxVersionFromRanges = (npmMaximumVersion, currentMaximumRange, versionsRange) => pipe(
    // split range into sections
    semverFullRangeToSections,
    // determine max version using range part
    reduce(determineMaxVersionFromRangePart(npmMaximumVersion), currentMaximumRange),
)(versionsRange);

// export
exports.normalizeSemverVersion = normalizeSemverVersion;
exports.determineMaxVersionFromRanges = determineMaxVersionFromRanges;