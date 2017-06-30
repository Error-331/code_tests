'use strict';

import {findPresentationsForPeriod, preparePresentationsForScheduler, findAndPreparePresentationsForDayScheduler, findAndPreparePresentationsForWeekSchedulerFromSunday} from './functions';

import fixedDatePresentations1 from './test_data/fixed_date_presentations1.json';
import recurringEverydayPresentations1 from './test_data/recurring_everyday_presentations1.json';
import recurringEndlessEverydayPresentations1 from './test_data/recurring_endless_everyday_presentations1.json';
import recurringEndlessEverydayPresentations2 from './test_data/recurring_endless_everyday_presentations2.json';
import realPresentationsData1 from './test_data/real_presentations_data1.json';
import realPresentationsData2 from './test_data/real_presentations_data2.json';
import realPresentationsData3 from './test_data/real_presentations_data3.json';

export default async () => {
    console.log('BrightSign scheduler problem');
    console.log('============================');
    console.log('');

    //targetTimeZone(pin): "EST"
    //reportedTimeZone(pin): "EST"

    const startDate1String = '2017-03-05T00:00:00';
    const endDate1String = '2017-03-08T00:00:00';

    const foundFixedDatePresentations1 = findAndPreparePresentationsForWeekSchedulerFromSunday(startDate1String, recurringEndlessEverydayPresentations2);

    console.log(foundFixedDatePresentations1);

    console.log('');
    console.log('--------------------------------------------------------');
    console.log('');
}