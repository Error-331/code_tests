'use strict';

// external imports
const {
    stubTrue,
    constant,
    identity,
    isNil,
    isEmpty,
    min,
    lt,
    lte,
    gt,
    gte,
    equals,
    cond,
    curry,
    pipe,
    over,
    spread,
    range,
    map,
    reduce,
    takeWhile,
    dropWhile,
    trim,
    split,
    replace,
    compact,
    concat,
    slice,
    nth,
    size,
    times,
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

const {
    findLastFiniteValueIndex,
    findLastFiniteNoneZeroValueIndex,
    findFirstNoneZeroValue,

    incrementAtIndex,
    decrementAtIndex,

    addReplaceInfinityFromToIndex,
} = require('./../helpers/array_helpers');

// helpers implementation
const semverFillMissingParts = curry((fillValue, versionParts) => pipe(
    versionParts => versionParts.slice(),

    cond([
        [
            versionParts => lte(size(versionParts), 2),
            versionParts => concat(
                versionParts,
                times(constant(fillValue), 3 - size(versionParts))
            ),
        ],
        [stubTrue, identity],
    ])
)(versionParts));

const semverFillMissingPartsWithZeros = semverFillMissingParts(0);
const semverFillMissingPartsWithInfinity = semverFillMissingParts(Infinity);

const performOperationAtLastPartOfParsedVersion = curry((callback, findCallback, versionParts) => {
    return cond([
        [
            versionParts => equals(-1, findCallback(versionParts)),
            identity,
        ],
        [
            stubTrue,
            versionParts => callback(findCallback(versionParts), versionParts),
        ]
    ])(versionParts.slice())
});

const incrementLastPartOfParsedVersion =
    performOperationAtLastPartOfParsedVersion(incrementAtIndex, findLastFiniteValueIndex);

const decrementLastPartOfParsedVersion =
    performOperationAtLastPartOfParsedVersion(decrementAtIndex, findLastFiniteNoneZeroValueIndex);

const performTildaOperatorOnParsedVersion = (versionParts) => {
    return cond([
        [versionSize => gte(versionSize, 2),() => addReplaceInfinityFromToIndex(2, 2, versionParts)],
        [versionSize => lt(versionSize, 2), () => addReplaceInfinityFromToIndex(1, 2, versionParts)],
        [stubTrue, constant(versionParts.slice())]
    ])(size(versionParts));
};

const performCaretOperatorOnParsedVersion = cond([
    [equals([0, 0]), constant([0, 0, Infinity])],
    [stubTrue, pipe(
        semverFillMissingParts(0),
        cond(
            [
                [
                    versionParts => equals(findFirstNoneZeroValue(versionParts), -1),
                    identity,
                ],
                [
                    versionParts => gte(findFirstNoneZeroValue(versionParts), 0),
                    versionParts => addReplaceInfinityFromToIndex(
                        findFirstNoneZeroValue(versionParts) + 1,
                        3 - (findFirstNoneZeroValue(versionParts) + 1),
                        versionParts
                    ),
                ],
                [stubTrue, identity],
            ]),
    )],
]);

const semverStringToParts = (prereleaseTagPartDelimiter, semverVersion) => {
    const [semverVersionPart, semverPrereleaseTagPart] = split(prereleaseTagPartDelimiter, semverVersion);

    return concat(
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
        compact(semverPrereleaseTagPart)
    );
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
    ])(condition);
};

const isSemverInHyphenRange = (lowerVer, higherVer, versionToCheck) => {
    return conditionIsFulfilledForTwoParsedSemverVersions(versionToCheck, lowerVer, '>=') &&
    conditionIsFulfilledForTwoParsedSemverVersions(versionToCheck, higherVer, '<=');
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

const determineMaxVersionForParsedRange = (versionParts, condition) => {
    return cond([
        [isEmpty, constant(versionParts)],
        [equals('='),  constant(versionParts)],
        [equals('>='), constant(versionParts)],
        [equals('<='), constant(versionParts)],
        [equals('>'),  constant(incrementLastPartOfParsedVersion(versionParts))],
        [equals('<'),  constant(decrementLastPartOfParsedVersion(versionParts))],
        [equals('~'),  constant(performTildaOperatorOnParsedVersion(versionParts))],
        [equals('^'),  constant(performCaretOperatorOnParsedVersion(versionParts))]
    ])(condition)
};

const determineMaxVersionFromRange = curry((npmMaximumVersion, currentMaxVersion, versionRange) => {
   // const semverOperator = extractSemverOperator(versionRange);

    const currentVersionParts = extractSemverVersionParts(npmMaximumVersion, versionRange);
    //const currentMaxVersionParts = extractSemverVersionParts(npmMaximumVersion, currentMaxVersion);

console.log(currentVersionParts);
    console.log('zpp2', determineMaxVersionForParsedRange(currentVersionParts, '>'));







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