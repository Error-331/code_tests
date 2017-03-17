'use strict';

export default async () => {
    let testTemplateString1 = `Test string`;
    let regularString1 = 'Test string';

    let jsDialectString = 'React.js';
    let jsDialectExpertise = 2;

    let taggedTemplateString1 = `"I like ${jsDialectString} and work with it more than ${jsDialectExpertise} years"`;

    let testMultilineString1 = `
        "
        This
        is
        multiline
        string
        "
    `;

    let testRawString1 = String.raw `This is \n test raw string \n with line breaks`;

    const testTagFunction = function(strings, ...values) {
        console.log('Test tag function');
        console.log('');
        console.log('String literals:', strings);
        console.log('Resolved values:', values);

        let stringCount = strings.length;
        let valuesCount = values.length;
        let resultString = '';

        for (let stringCounter = 0; stringCounter < stringCount; stringCounter++) {
            resultString += strings[stringCounter];

            if (stringCounter < valuesCount) {
                resultString += values[stringCounter]
            }
        }

        console.log('Result:', resultString);
    };

    console.log('Template strings usage');
    console.log('======================');
    console.log('');

    console.log('Template string equals regular string:', testTemplateString1 === regularString1);
    console.log('Template string example 1:', taggedTemplateString1);

    console.log('');

    testTagFunction `"I like ${jsDialectString} and work with it more than ${jsDialectExpertise} years"`;

    console.log('');
    console.log('Multiline string example:', testMultilineString1);
    console.log('');

    console.log('Raw string example (with line breaks):', testRawString1);

    console.log('');
    console.log('--------------------------------------------------------');
    console.log('');
}