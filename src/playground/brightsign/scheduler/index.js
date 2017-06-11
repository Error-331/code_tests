'use strict';

import {findPresentationsForPeriod, preparePresentationsForScheduler} from './functions';

import fixedDatePresentations1 from './test_data/fixed_date_presentations1.json';
import recurringEverydayPresentations1 from './test_data/recurring_everyday_presentations1.json';
import recurringEndlessEverydayPresentations1 from './test_data/recurring_endless_everyday_presentations1.json';

export default async () => {
    console.log('BrightSign scheduler problem');
    console.log('============================');
    console.log('');

    //targetTimeZone(pin): "EST"
    //reportedTimeZone(pin): "EST"

    const startDate1String = '2017-03-10T00:00:00';
    const endDate1String = '2017-03-15T23:59:59';

    const foundFixedDatePresentations1 = preparePresentationsForScheduler(startDate1String, endDate1String, recurringEverydayPresentations1);
console.log(foundFixedDatePresentations1);



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