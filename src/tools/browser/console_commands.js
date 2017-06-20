'use strict';

//https:blog.mariusschulz.com/2013/11/22/measuring-execution-times-in-javascript-with-consoletime
//https://blog.mariusschulz.com/2013/11/13/advanced-javascript-debugging-with-consoletable

export default async () => {
    const languages1 = [
        {name: "JavaScript", fileExtension: ".js", paradigm: "functional"},
        {name: "TypeScript", fileExtension: ".ts", paradigm: "object-oriented"},
        {name: "CoffeeScript", fileExtension: ".coffee", paradigm: "functional"}
    ];

    const languages2 = {
        csharp: {name: "C#", fileExtension: ".cs", paradigm: "object-oriented"},
        fsharp: {name: "F#", fileExtension: ".fs", paradigm: "functional"}
    };

    console.log('Browser console usage');
    console.log('=====================');
    console.log('');

    console.log('console.table examples');
    console.log('----------------------');
    console.log('');

    console.log('console.table(languages1):');

    console.log('');
    console.table(languages1);
    console.log('');

    console.log('console.table(languages1, "name"):');

    console.log('');
    console.table(languages1, 'name');
    console.log('');

    console.log('console.table(languages2, ["fileExtension", "paradigm"]):');

    console.log('');
    console.table(languages2, ['fileExtension', 'paradigm']);
    console.log('');

    //https:blog.mariusschulz.com/2013/11/22/measuring-execution-times-in-javascript-with-consoletime
    //https://blog.mariusschulz.com/2013/11/13/advanced-javascript-debugging-with-consoletable

    console.log('console.time/console.timeEnd examples');
    console.log('-------------------------------------');
    console.log('');

    console.log('time_marker_1 start');
    console.time('time_marker_1');
    console.log('time_marker_1 start end');
    console.timeEnd('time_marker_1');

    console.log('');

    console.log('console grouping examples examples');
    console.log('----------------------------------');
    console.log('');

    console.log('Simple grouping example 1:');
    console.log('');

    console.group('Test console group 1');
    console.log('Test message 1');
    console.log('Test message 2');
    console.groupEnd();

    console.log('');
    console.log('Test console group 2 (collapsed):');
    console.log('');

    console.groupCollapsed('Test console group 2 (collapsed)');
    console.log('Test message 1');
    console.log('Test message 2');
    console.groupEnd();

    console.log('');
    console.log('Test console group 3 (nested):');
    console.log('');

    console.group('Test console group 3');
    console.log('Test message 1');
    console.log('Test message 2');

    console.group('Test console group4');
    console.log('Test message 3');
    console.log('Test message 4');
    console.groupEnd();

    console.groupEnd();

    console.log('');
    console.log('--------------------------------------------------------');
    console.log('');
}