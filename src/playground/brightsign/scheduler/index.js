'use strict';

import {parseDate, findPresentationsForPeriod, convertPresentationsToSchedulerFormat} from './functions';
import {each, cloneDeep} from 'lodash';

import fixedFatePresentations1 from './test_data/fixed_date_presentations1.json';
import recurringEverydayPresentations1 from './test_data/recurring_everyday_presentations1.json';
import recurringEndlessEverydayPresentations1 from './test_data/recurring_endless_everyday_presentations1.json';

export default async () => {
    console.log('BrightSign scheduler problem');
    console.log('============================');
    console.log('');

    const startDate1String = '2017-03-11T00:00:00';
    const endDate1String = '2017-03-11T23:59:59';

    const startDate1 = parseDate(startDate1String);
    const endDate1 = parseDate(endDate1String);


    const testData1 = cloneDeep(recurringEverydayPresentations1);
    const testData1Result = findPresentationsForPeriod(startDate1, endDate1, testData1);

    const schedulerData = convertPresentationsToSchedulerFormat(startDate1, endDate1, testData1Result);

    //console.log(schedulerData);

    console.log('');
    console.log('--------------------------------------------------------');
    console.log('');
}


/*

 let tasks = [
 {'startDate': '2016-01-01 01:30:00', 'endDate': '2016-01-01 03:00:00', 'period': 'Weekdays', 'color': '#787878'},
 {'startDate': '2016-01-01 03:00:00', 'endDate': '2016-01-01 05:00:00', 'period': 'Monday', 'color': '#F16724'},
 {'startDate': '2016-01-01 05:00:00', 'endDate': '2016-01-01 08:00:00', 'period': 'Weekends', 'color': '#70BF4A'},
 {'startDate': '2016-01-01 08:00:00', 'endDate': '2016-01-01 10:30:00', 'period': 'Saturday', 'color': '#AF0814'},
 {'startDate': '2016-01-01 10:30:00', 'endDate': '2016-01-01 14:00:00', 'period': 'Saturday', 'color': '#787878'}
 ];

 */