'use strict';

import rxjsBasics from './rxjs/basics';
import rxjsOperators from './rxjs/operators';

export default async () => {
    console.log('"RxJS" library tests');
    console.log('====================');
    console.log('');

    //await rxjsBasics();
    await rxjsOperators();

    console.log('');
    console.log('--------------------------------------------------------');
    console.log('');
}