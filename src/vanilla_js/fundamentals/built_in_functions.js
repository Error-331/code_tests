'use strict';

// encodeURIComponent(), expect this characters: A-Z a-z 0-9 - _ . ! ~ * ' ( )
// encodeURI(), except this characters:          A-Z a-z 0-9 ; , / ? : @ & = + $ - _ . ! ~ * ' ( )

export default async () => {
    const unencodedCharactersSet1 = ";,/?:@&=+$";
    const unencodedCharactersSet2 = "-_.!~*'()";
    const unencodedCharactersSet3 = "#";
    const unencodedCharactersSet4 = "ABC abc 123";
    const unencodedCharactersSet5 = '"65" \'';
    const unencodedCharactersSet6 = 'http://www.pierobon.org/iis/review1.htm.html#one';
    const unencodedCharactersSet7 = 'http://www.example.com/test1/some.html?param1=val1&param2=\'val2\'';

    const encodedURIComponentCharactersSet1 = encodeURIComponent(unencodedCharactersSet1);
    const encodedURIComponentCharactersSet2 = encodeURIComponent(unencodedCharactersSet2);
    const encodedURIComponentCharactersSet3 = encodeURIComponent(unencodedCharactersSet3);
    const encodedURIComponentCharactersSet4 = encodeURIComponent(unencodedCharactersSet4);
    const encodedURIComponentCharactersSet5 = encodeURIComponent(unencodedCharactersSet5);
    const encodedURIComponentCharactersSet6 = encodeURIComponent(unencodedCharactersSet6);
    const encodedURIComponentCharactersSet7 = encodeURIComponent(unencodedCharactersSet7);

    const encodedURICharactersSet1 = encodeURI(unencodedCharactersSet1);
    const encodedURICharactersSet2 = encodeURI(unencodedCharactersSet2);
    const encodedURICharactersSet3 = encodeURI(unencodedCharactersSet3);
    const encodedURICharactersSet4 = encodeURI(unencodedCharactersSet4);
    const encodedURICharactersSet5 = encodeURI(unencodedCharactersSet5);
    const encodedURICharactersSet6 = encodeURI(unencodedCharactersSet6);
    const encodedURICharactersSet7 = encodeURI(unencodedCharactersSet7);

    const decodedURIComponentCharactersSet1 = decodeURIComponent(encodedURIComponentCharactersSet1);
    const decodedURIComponentCharactersSet2 = decodeURIComponent(encodedURIComponentCharactersSet2);
    const decodedURIComponentCharactersSet3 = decodeURIComponent(encodedURIComponentCharactersSet3);
    const decodedURIComponentCharactersSet4 = decodeURIComponent(encodedURIComponentCharactersSet4);
    const decodedURIComponentCharactersSet5 = decodeURIComponent(encodedURIComponentCharactersSet5);
    const decodedURIComponentCharactersSet6 = decodeURIComponent(encodedURIComponentCharactersSet6);
    const decodedURIComponentCharactersSet7 = decodeURIComponent(encodedURIComponentCharactersSet7);

    const decodedURICharactersSet1 = decodeURI(encodedURICharactersSet1);
    const decodedURICharactersSet2 = decodeURI(encodedURICharactersSet2);
    const decodedURICharactersSet3 = decodeURI(encodedURICharactersSet3);
    const decodedURICharactersSet4 = decodeURI(encodedURICharactersSet4);
    const decodedURICharactersSet5 = decodeURI(encodedURICharactersSet5);
    const decodedURICharactersSet6 = decodeURI(encodedURICharactersSet6);
    const decodedURICharactersSet7 = decodeURI(encodedURICharactersSet7);

    console.log('Built in functions');
    console.log('==================');
    console.log('');

    console.log('encodeURIComponent() examples:');
    console.log('');

    console.log('Encoded set 1 -', encodedURIComponentCharactersSet1);
    console.log('Encoded set 2 -', encodedURIComponentCharactersSet2);
    console.log('Encoded set 3 -', encodedURIComponentCharactersSet3);
    console.log('Encoded set 4 -', encodedURIComponentCharactersSet4);
    console.log('Encoded set 5 -', encodedURIComponentCharactersSet5);
    console.log('Encoded set 6 -', encodedURIComponentCharactersSet6);
    console.log('Encoded set 7 -', encodedURIComponentCharactersSet7);

    console.log('');
    console.log('decodeURIComponent() examples:');
    console.log('');

    console.log('Decoded set 1 -', decodedURIComponentCharactersSet1);
    console.log('Decoded set 2 -', decodedURIComponentCharactersSet2);
    console.log('Decoded set 3 -', decodedURIComponentCharactersSet3);
    console.log('Decoded set 4 -', decodedURIComponentCharactersSet4);
    console.log('Decoded set 5 -', decodedURIComponentCharactersSet5);
    console.log('Decoded set 6 -', decodedURIComponentCharactersSet6);
    console.log('Decoded set 7 -', decodedURIComponentCharactersSet7);

    console.log('');
    console.log('encodeURI() examples:');
    console.log('');

    console.log('Encoded set 1 -', encodedURICharactersSet1);
    console.log('Encoded set 2 -', encodedURICharactersSet2);
    console.log('Encoded set 3 -', encodedURICharactersSet3);
    console.log('Encoded set 4 -', encodedURICharactersSet4);
    console.log('Encoded set 5 -', encodedURICharactersSet5);
    console.log('Encoded set 6 -', encodedURICharactersSet6);
    console.log('Encoded set 7 -', encodedURICharactersSet7);

    console.log('');
    console.log('decodeURI() examples:');
    console.log('');

    console.log('Decoded set 1 -', decodedURICharactersSet1);
    console.log('Decoded set 2 -', decodedURICharactersSet2);
    console.log('Decoded set 3 -', decodedURICharactersSet3);
    console.log('Decoded set 4 -', decodedURICharactersSet4);
    console.log('Decoded set 5 -', decodedURICharactersSet5);
    console.log('Decoded set 6 -', decodedURICharactersSet6);
    console.log('Decoded set 7 -', decodedURICharactersSet7);

    console.log('');
    console.log('--------------------------------------------------------');
    console.log('');
}