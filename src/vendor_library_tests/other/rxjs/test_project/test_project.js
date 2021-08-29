'use strict';

import { Observable, merge } from 'rxjs';
import { Subject } from 'rxjs';

const dbSelectStubPositive = () => {
  return new Promise(resolve => {
      setTimeout(resolve, 1000);
  });
};

const freeGoogleKeywordsCheckWorkersObservable = new Observable(subscriber => {
    // SELECT * FROM google_keywords_check_workers WHERE status = 'idle'
    dbSelectStubPositive
        .then((data) => {
            subscriber.next(data);
            subscriber.complete();
        })
        .catch(subscriber.error);

    return function unsubscribe() {};
});

// via GET
function onAddKeywordForCheck(newKeyword, periodId) {
    // check if data valid
    // check if periodIdValid

    // check if it is already exists
    // if not -> add and schedule
    // if yes -> check if already scheduled for period
    // if yes -> noting
    // if no ->  make adjustments to DB
    // notify task scheduler
}


async function testProject()
{
    const taskSchedulerBus = new Subject();


    const taskSchedulerObserver = taskSchedulerBus.subscribe({
        next: (message) => {
            
        },
        error(error) { console.error('Error occurred (observer 3-1): ' + error); },
        complete() { console.log('Flow is ended (observer 3-1)'); }
    });




    const userEventsBus = new Subject();
    const childToMainBus = new Subject();






    return new Promise((resolve) => {
        const testSubject1 = new Subject();

        testSubject1.complete();

    });
}

export default async () => {
    console.log('"RxJS" library tests (test project)');
    console.log('===================================');
    console.log('');


    await testProject();

    console.log('');
    console.log('--------------------------------------------------------');
    console.log('');
}

/*

google_keywords

id, keyword, date_add,

google_keywords_dynamics_data_by_90_days

id keyword_id country_id category_id search_type_id check_id year month day hour minutes value date_add

google_keywords_dynamics_data_by_30_days

id keyword_id country_id category_id search_type_id check_id year month day hour minutes value date_add

google_keywords_checks

id keyword_id status (scheduled, complete, in progress, error) period_type_id date_add

google_keywords_relation

id first_keyword_id second_keyword_id

google_keywords_similar_requests_trends_relation

id first_keyword_id second_keyword_id check_id value date_add

google_keywords_check_workers

id name status date_add





==========

number of workers: 5


interval -> every two minute -> query to database (check for scheduled checks) ->
take first 5 (or by number of free workers if any) scheduled checks -> pass data to workers

subject 1



 */
