'use strict';

import S from 'sanctuary';

export default async () => {
    const exampleLeft1 = S.Left('Left "erroneous" 1');
    const exampleLeft2 = S.Left('Left "erroneous" 2');
    const exampleLeft3 = S.Left('Left "erroneous" 3');

    const exampleRight1 = S.Right('Right "normal" 1');
    const exampleRight2 = S.Right('Right "normal" 2');
    const exampleRight3 = S.Right('Right "normal" 3');

    console.log('"Sanctuary" library tests');
    console.log('=======================');
    console.log('');

    console.log('"Left" and "Right" examples:');
    console.log('');

    console.log('exampleLeft1 - ', exampleLeft1);
    console.log('exampleLeft2 - ', exampleLeft2);
    console.log('exampleLeft3 - ', exampleLeft3);

    console.log('');

    console.log('exampleRight1 - ', exampleRight1);
    console.log('exampleRight2 - ', exampleRight2);
    console.log('exampleRight3 - ', exampleRight3);

    console.log('');
    console.log('"Either" examples:');
    console.log('');

    console.log('S.either(x => false, x => x + " accepted", exampleRight1) - ', S.either(x => false, x => x + ' accepted', exampleRight1));
    console.log('S.either(x => false, x => x + " accepted", exampleLeft1) - ', S.either(x => false, x => x + ' accepted', exampleLeft1));

    console.log('');
    console.log('--------------------------------------------------------');
    console.log('');
};