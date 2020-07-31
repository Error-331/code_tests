'use strict';

import observableBasics from './rxjs/observable_basics';

import subjectBasics from './rxjs/subject_basics';
import subjectAdvanced from './rxjs/subject_advanced';

import schedulerBasics from './rxjs/scheduler_basics';

import rxjsOperators from './rxjs/operators';

export default async () => {
    console.log('"RxJS" library tests');
    console.log('====================');
    console.log('');

    //await observableBasics();

   // await subjectBasics();
   // await subjectAdvanced();

    await schedulerBasics();

    //await rxjsOperators();

    console.log('');
    console.log('--------------------------------------------------------');
    console.log('');
}
