'use strict';

// https://www.bennadel.com/blog/1742-using-regular-expressions-in-javascript-a-general-overview.htm

export default async () => {
    const testString1 = 'string::[Device].<city>: "Moscow"';
    const testString2 = 'string::[Device].<Country>: "Russia"';
    const testString3 = 'string::[Device].<Owned By>: "IMS"';
    const testString4 = 'string::[sys].[Device].<Serial>: "A1G19U000528"';
    const testString5 = 'boolean::[Device].<UserBoolean>: "True"';


    const testRegexp1 = new RegExp('\\[[A-Za-z]*\\]', 'gi');
    const testRegexp2 = new RegExp('(\\[)([A-Za-z]*)(\\])', 'gi');

    const testRegexp3 = new RegExp('\\[[A-Za-z]*\\]', 'i');
    const testRegexp4 = new RegExp('\\[[A-Za-z]*\\]', 'gi');
    const testRegexp5 = new RegExp('^string\\:\\:\\[sys\\]', 'gi');

    let regExpMatches;

    console.log('RegExp usage');
    console.log('============');
    console.log('');

    console.log('String.replace using regexp example 1 -', testString1.replace(testRegexp1, "[ENTITY]"));
    console.log('String.replace using regexp example 2 -', testString2.replace(testRegexp2, "$1ENTITY$3"));
    console.log('String.replace using regexp example 3 -', testString3.replace(testRegexp2, ($0, $1, $2, $3) => $1 + 'ENTITY' + $3));

    console.log('');

    console.log('String.match using regexp example 1 -', testString4.match(testRegexp3));
    console.log('');
    console.log('String.match using regexp example 2 -', testString4.match(testRegexp4));

    console.log('');

    console.log('String.search using regexp example 1 -', testString4.search(testRegexp3));
    console.log('String.search using regexp example 2 -', testString5.search(testRegexp3));

    console.log('');

    console.log('RegExp.test using regexp example 1 -', testRegexp5.test(testString4));
    console.log('RegExp.test using regexp example 2 -', testRegexp5.test(testString5));

    console.log('');

    console.log('RegExp.exec using regexp example 1:');
    console.log('');

    while (regExpMatches = testRegexp4.exec(testString4)){
        console.log(regExpMatches);
        console.log('');
    }

    console.log('RegExp.exec using regexp example 2:');
    console.log('');

    while (regExpMatches = testRegexp4.exec(testString5)){
        console.log(regExpMatches);
    }

    console.log('');
    console.log('--------------------------------------------------------');
    console.log('');
};