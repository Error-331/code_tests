'use strict';

export default async () => {
    let unencodedCharactersSet1 = ";,/?:@&=+$";
    let unencodedCharactersSet2 = "-_.!~*'()";
    let unencodedCharactersSet3 = "#";
    let unencodedCharactersSet4 = "ABC abc 123";
    let unencodedCharactersSet5 = '"65" \'';

    let encodedCharactersSet1 = encodeURIComponent(unencodedCharactersSet1);
    let encodedCharactersSet2 = encodeURIComponent(unencodedCharactersSet2);
    let encodedCharactersSet3 = encodeURIComponent(unencodedCharactersSet3);
    let encodedCharactersSet4 = encodeURIComponent(unencodedCharactersSet4);
    let encodedCharactersSet5 = encodeURIComponent(unencodedCharactersSet5);

    let decodedCharactersSet1 = decodeURIComponent(encodedCharactersSet1);
    let decodedCharactersSet2 = decodeURIComponent(encodedCharactersSet2);
    let decodedCharactersSet3 = decodeURIComponent(encodedCharactersSet3);
    let decodedCharactersSet4 = decodeURIComponent(encodedCharactersSet4);
    let decodedCharactersSet5 = decodeURIComponent(encodedCharactersSet5);

    console.log('Built in functions');
    console.log('==================');
    console.log('');

    console.log('encodeURIComponent() examples:');
    console.log('');

    console.log('Encoded set 1 -', encodedCharactersSet1);
    console.log('Encoded set 2 -', encodedCharactersSet2);
    console.log('Encoded set 3 -', encodedCharactersSet3);
    console.log('Encoded set 4 -', encodedCharactersSet4);
    console.log('Encoded set 5 -', encodedCharactersSet5);

    console.log('');
    console.log('decodeURIComponent() examples:');
    console.log('');

    console.log('Decoded set 1 -', decodedCharactersSet1);
    console.log('Decoded set 2 -', decodedCharactersSet2);
    console.log('Decoded set 3 -', decodedCharactersSet3);
    console.log('Decoded set 4 -', decodedCharactersSet4);
    console.log('Decoded set 5 -', decodedCharactersSet5);

    console.log('');
    console.log('--------------------------------------------------------');
    console.log('');
}