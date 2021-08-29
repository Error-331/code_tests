'use strict';

import errorHandlingOperators from './operators/error_handling';
import utilityOperators from './operators/utility';
import transformationOperators from './operators/transformation';
import filteringOperators from './operators/filtering';
import aggregateOperators from './operators/aggregate';
import joinOperators from './operators/join';
import joinCreationOperators from './operators/join_creation';
import creationOperators from './operators/creation';

export default async () => {
    console.log('"RxJS" library tests (operators)');
    console.log('================================');
    console.log('');

    await errorHandlingOperators();
    await utilityOperators();
    await creationOperators();
    await transformationOperators();
    await filteringOperators();
    await aggregateOperators();
    await joinOperators();
    await joinCreationOperators();

    console.log('');
    console.log('--------------------------------------------------------');
    console.log('');
}
