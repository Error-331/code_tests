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
    all,
    any,
    includes,
    curry,
    pipe,
    over,
    spread,
    range,
    map,
    reduce,
    chunk,
    takeWhile,
    dropWhile,
    trim,
    toLower,
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
} = require('./../constants/semver_regexp_constants');

const {
    findLastFiniteValueIndex,
    findLastFiniteNoneZeroValueIndex,
    findFirstNoneZeroValue,

    incrementAtIndex,
    decrementAtIndex,

    addReplaceInfinityFromToIndex,
    replaceToInfinityFromIndex,
    cartesianProduct,
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

const parsePrereleaseTag = (prereleaseTag) => {
    return cond([
        [isNil, constant([])],
        [isEmpty, constant([])],
        [stubTrue, pipe(
            split('.'),
            cond([
                [
                    parts => gte(size(parts), 2),
                    parts => {
                        const lastElmIndex = size(parts) - 1;
                        parts[lastElmIndex] = parseInt(parts[lastElmIndex]);

                        return parts;
                    }
                ],
                [stubTrue, identity],
            ])
        )]
    ])(prereleaseTag)
};

const semverStringToParts = (semverVersion) => {
    const [semverVersionPart, semverPrereleaseTagPart] = cond([
        [includes('-'), split('-')],
        [includes('$'), split('$')],
        [stubTrue, constant([semverVersion])],
    ])(semverVersion);

    return pipe(
        replace(new RegExp('v|V', 'g'), ''),
        replace(new RegExp('x|X', 'g'), '*'),
        split('.'),
        map(
            cond([
                [equals('*'), constant(Infinity)],
                [stubTrue, parseInt]
            ])),

        parsedVersionParts => [
            parsedVersionParts,
            compact(
                parsePrereleaseTag(semverPrereleaseTagPart)
            )
        ]
    )(semverVersionPart);
};

// TODO: rework
const normalizeSemverVersion = curry((maxSemverVersion, semverVersion) => {
    const normalizedSemverVersion = semverStringToParts(semverVersion);

    if (isNil(maxSemverVersion)) {
        return normalizedSemverVersion;
    }

    if (size(semverVersion) >= 2) {
        return normalizedSemverVersion;
    }

    const normalizedMaxSemverVersion = semverStringToParts(maxSemverVersion);

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
        // trim whitespaces (just in case if there uncleared whitespace characters left)
        trim,
        // remove sevmer operator (e.g. '>', '=', '~')
        replace(extractSemverOperator(singularRangePart), ''),
        normalizeSemverVersion(npmMaximumVersion),
    )(singularRangePart);
};

// -1 lower
// 1 greater
// 0 equal
// null incomparable
// TODO: add constants 'alpha', 'beta, etc. and use them
const compareSemverPrereleaseTagParts = (firstTag, secondTag) => {
    // if first part of the tag (e.q. 'alpha', 'beta') are not equal we cannot compare the second part
    if (!equals(toLower(firstTag[0]), toLower(secondTag[0]))) {
        return null;
    }

    // compare second part (part that contains number)
    return cond([
        [spread(gt), constant(1)],
        [spread(lt), constant(-1)],
        [spread(equals), constant(0)],
    ])([
        firstTag[1],
        secondTag[1]
    ]);
};

const compareTwoParsedVersions = (firstVer, secondVer) => {
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
            ]),
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

const compareTwoParsedSemverRanges = (firstRange, secondRange) => {
    // if second version (array that represents parsed version) is empty, than first version is greater then second one
    if (isNil(secondRange) || isEmpty(secondRange)) {
        return 1;
    }

    // extract `version number` parts of each version (not prerelease tag)
    const firstVerRealPart = firstRange[0];
    const secondVerRealPart = secondRange[0];

    // extract `prerelease tag` parts of each version (not version number)
    const firstVerPreTag = firstRange[1];
    const secondVerPreTag = secondRange[1];

    // compare real parts (version numbers)
    const realPartComparisonResult = compareTwoParsedVersions(firstVerRealPart, secondVerRealPart);

    if (!isEmpty(firstVerPreTag) && !isEmpty(secondVerPreTag)) {
        const prereleaseTagPartComparisonResult = compareSemverPrereleaseTagParts(firstVerPreTag, secondVerPreTag);

        if (realPartComparisonResult !== 0 || prereleaseTagPartComparisonResult === null) {
            return null
        } else {
            return prereleaseTagPartComparisonResult;
        }
    } else {
        return realPartComparisonResult;
    }
};

const conditionIsFulfilledForTwoParsedSemverVersions = curry((condition, firstVer, secondVer) => {
    const comparisonResult = compareTwoParsedSemverRanges(firstVer, secondVer);

    if (isNil(comparisonResult)) {
        return null;
    }

    return cond([
        [equals('='),  constant(equals(comparisonResult, 0))],
        [equals('>'),  constant(equals(comparisonResult, 1))],
        [equals('<'),  constant(equals(comparisonResult, -1))],
        [equals('>='), constant(gte(comparisonResult, 0))],
        [equals('<='), constant(lte(comparisonResult, 0))],
    ])(condition);
});

const isSemverInHyphenRange = (lowerVer, higherVer, versionToCheck) => {
    return cond([
        // if there is some version that cannot be compared - just return false
        [includes(null), constant(false)],
        // check that version should between bounds
        [stubTrue, all(equals(true))]
    ])([
        // check each bound
        conditionIsFulfilledForTwoParsedSemverVersions('>=', versionToCheck, lowerVer),
        conditionIsFulfilledForTwoParsedSemverVersions('<=', versionToCheck, higherVer)
    ]);
};

// array
const determineMaxVersionsByOperator = (operator, versionParts) => {
    // apply range operator to version
    return cond([
        // if no operator provided just return current version (e.g 2.3.4)
        [isEmpty, constant([ versionParts ])],
        // same as above
        [equals('='),  constant([ versionParts ])],
        [equals('>='), constant([ versionParts, [replaceToInfinityFromIndex(0, versionParts[0])] ])],
        [equals('<='), constant([ versionParts, [decrementLastPartOfParsedVersion(versionParts[0])] ])],
        [equals('>'),  constant([ [incrementLastPartOfParsedVersion(versionParts[0])], [replaceToInfinityFromIndex(0, versionParts[0])] ])],
        [equals('<'),  constant([ [decrementLastPartOfParsedVersion(versionParts[0])] ])],
        [equals('~'),  constant([ [performTildaOperatorOnParsedVersion(versionParts[0])] ])],
        [equals('^'),  constant([ [performCaretOperatorOnParsedVersion(versionParts[0])] ])]
    ])(operator);
};

const determineMaxVersionFromSingularRange = curry((npmMaximumVersion, currentMaxVersion, versionRange) => {
    // if we do not have maximum version yet - just use current one
    if (isNil(currentMaxVersion)) {
        return versionRange;
    }

    // extract parsed version part and string `prerelease` part (e.g. [ [1, 2, 1], ['beta.55'] ] or [ [0, 0, 1], [] ])
    const currentVersionParts = extractSemverVersionParts(npmMaximumVersion, versionRange);
    const currentMaxVersionParts = extractSemverVersionParts(null, currentMaxVersion);

    // extract operator for each version ('<', '>', '~', '^', etc.)
    const currentVersionOperator = extractSemverOperator(versionRange);
    const currentMaxVersionOperator = extractSemverOperator(currentMaxVersion);

    const maxMaxVersionPartsByOp = determineMaxVersionsByOperator(currentMaxVersionOperator, currentMaxVersionParts);
    const currentMaxVersionPartsByOp = determineMaxVersionsByOperator(currentVersionOperator, currentVersionParts);

    return pipe(
        cond([
            [
                includes(null),
                constant(false),
            ],
            [
                product => equals(
                    size(product),
                    4
                ),
                pipe(
                    chunk(2),
                    map(any(equals(true))),
                    all(equals(true)))
            ],
            [
                stubTrue,
                // TODO: this seams wrong in some situations (e.q. 1.2.5 > (>1.2.3) - satisfies the range, but not exactly true since
                //  >1.2.3 = 1.2.4 - Infinity)
                any(equals(true))
            ],
        ]),
        cond([
            [equals(true), constant(versionRange)],
            [equals(false), constant(currentMaxVersion)]
        ])
    )(
        map(versionsArr => conditionIsFulfilledForTwoParsedSemverVersions('>', versionsArr[0], versionsArr[1]),
            cartesianProduct([currentMaxVersionPartsByOp, maxMaxVersionPartsByOp]),
        )
    );
});

const determineMaxVersionFromHyphenRange = curry((npmMaximumVersion, currentMaxVersion, versionsRange) => pipe(
    // trim whitespaces (just in case if there uncleared whitespace characters left)
    trim,
    // split string into parts by `-`
    split('-'),
    // remove  `empty` or `nil` elements from array
    compact,
    // pick second part of range (e.g. if `1.2.3 - 2.0.0`, `2.0.0` will be selected)
    nth(1),
    // compare current maximum version and second part of `hyphen` range and choose greater one
    determineMaxVersionFromSingularRange(npmMaximumVersion, currentMaxVersion),
)(versionsRange));

const determineMaxVersionFromSpaceRange = curry((npmMaximumVersion, currentMaxVersion, versionsRange) => pipe(
    // trim whitespaces (just in case if there uncleared whitespace characters left)
    trim,
    // split string into parts by `space` character
    split(' '),
    // remove  `empty` or `nil` elements from array
    compact,
    // find maximum version using current maximum version and all parts of `space` range (e.q. `>3.2.5 <4.0.0 >3.3.0` - each part will be checked)
    reduce(determineMaxVersionFromRangePart(npmMaximumVersion), currentMaxVersion),
)(versionsRange));

const determineMaxVersionFromRangePart = curry((npmMaximumVersion, currentMaxVersion, versionsRange) => pipe(
    // trim whitespaces (after version range have been split into pieces there can still be whitespaces on both ends)
    trim,
    // find maximum version for each major range types (e.g. 1.2.3 - 2.4.5 or >3.4.6 <= 7.5.1) or singular range type (e.g ~1.2.3 or 1.2.3)
    cond([
        // determine max version from `hyphen range` (e.g. 1.2.3 - 2.4.5)
        [testStr => testStr.includes('-'), determineMaxVersionFromHyphenRange(npmMaximumVersion, currentMaxVersion)],

        // determine max version from `space range` (e.g. >3.4.6 <= 7.5.1)
        [testStr => testStr.includes(' '), determineMaxVersionFromSpaceRange(npmMaximumVersion, currentMaxVersion)],

        // determine max version from singular range (e.g ~1.2.3 or 1.2.3)
        [stubTrue, determineMaxVersionFromSingularRange(npmMaximumVersion, currentMaxVersion)],
    ])
)(versionsRange));

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

const determineMaxVersionFromRanges = (npmMaximumVersion, currentMaxVersion, versionsRange) => pipe(
    // split range into sections
    semverFullRangeToSections,
    // determine max version using range part
    reduce(determineMaxVersionFromRangePart(npmMaximumVersion), currentMaxVersion),
)(versionsRange);

// export
exports.normalizeSemverVersion = normalizeSemverVersion;
exports.determineMaxVersionFromRanges = determineMaxVersionFromRanges;