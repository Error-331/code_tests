'use strict';

import {findPresentationsForPeriod, preparePresentationsForScheduler, findAndPreparePresentationsForDayScheduler, findAndPreparePresentationsForWeekSchedulerFromSunday} from './functions';

import fixedDatePresentations1 from './test_data/fixed_date_presentations1.json';
import recurringEverydayPresentations1 from './test_data/recurring_everyday_presentations1.json';
import recurringEndlessEverydayPresentations1 from './test_data/recurring_endless_everyday_presentations1.json';
import recurringEndlessEverydayPresentations2 from './test_data/recurring_endless_everyday_presentations2.json';
import realPresentationsData1 from './test_data/real_presentations_data1.json';
import realPresentationsData2 from './test_data/real_presentations_data2.json';
import realPresentationsData3 from './test_data/real_presentations_data3.json';
import realPresentationsData4 from './test_data/real_presentations_data4.json';
import realPresentationsData5 from './test_data/real_presentations_data5_with_interrupt_scheduling.json';

export default async () => {
    console.log('BrightSign scheduler problem');
    console.log('============================');
    console.log('');

    //targetTimeZone(pin): "EST"
    //reportedTimeZone(pin): "EST"
    //87071

    const startDate1String = '2017-07-10T00:00:00';
    const endDate1String = '2017-07-11T00:00:00';

    const foundFixedDatePresentations1 = preparePresentationsForScheduler(startDate1String, endDate1String, realPresentationsData5);

    console.log(foundFixedDatePresentations1);

    console.log('');
    console.log('--------------------------------------------------------');
    console.log('');
}