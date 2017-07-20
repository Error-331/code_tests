'use strict';

import moment from 'moment';

import {isUndefined, isNull, isArray, stubTrue, stubFalse, constant, castArray, partial, cond, chain, map, forEach, filter, trim, sortBy, reverse, cloneDeep} from 'lodash';
import {EVERY_DAY_NAME, EVERY_WEEKDAY_NAME, EVERY_WEEKEND_NAME, WEEK_DAYS_NUMBERS, WEEK_ENDS_NUMBERS, ALL_DAYS_NUMBERS} from './constants';

export const toLowerCaseAndTrim = userString => trim(userString.toLowerCase());

export const parseEventWeekDays = (daysOfWeek) => {
    const splitDaysOfWeek = daysOfWeek.split(',');
    const parsedDaysOfWeek = isArray(splitDaysOfWeek) ? splitDaysOfWeek : castArray(daysOfWeek);

    return map(parsedDaysOfWeek, toLowerCaseAndTrim);
};

export const parseEventDuration = (eventDuration) => {
    let parsedTimeData = eventDuration.split(':');
    let daysData = parsedTimeData[0].split('.');

    if (daysData.length > 1) {
        parsedTimeData.shift();
        parsedTimeData.unshift(daysData[1]);
        parsedTimeData.unshift(daysData[0]);
    }

    return parsedTimeData;
};

export const extractPossibleWeekDaysFromEvent = (daysOfWeek) => {
    const parsedDaysOfWeek = parseEventWeekDays(daysOfWeek);
    const testMomentDate = moment();

    return chain(parsedDaysOfWeek).reduce((daysNumbers, dayName) => {

        if (dayName === EVERY_DAY_NAME.toLowerCase()) {
            daysNumbers = daysNumbers.concat(ALL_DAYS_NUMBERS);
        } else if (dayName === EVERY_WEEKDAY_NAME.toLowerCase()) {
            daysNumbers = daysNumbers.concat(WEEK_DAYS_NUMBERS);
        } else if (dayName === EVERY_WEEKEND_NAME.toLowerCase()) {
            daysNumbers = daysNumbers.concat(WEEK_ENDS_NUMBERS);
        } else {
            testMomentDate.day(dayName);
            daysNumbers.push(testMomentDate.day());
        }

        return daysNumbers;
    }, []).uniq().sortBy().value();
};

const addDuration = (userDate, durationData) => {
    let newUserDate = moment(userDate);
    let startIndex = 0;

    if (durationData.length === 4) {
        newUserDate.add(durationData[startIndex], 'd');
        startIndex = 1;
    }

    return newUserDate.add(durationData[startIndex], 'h').add(durationData[startIndex + 1], 'm').add(durationData[startIndex + 2], 's');
};

const setDuration = (userDate, durationData) => {
    let newUserDate = moment(userDate);
    let startIndex = 0;

    if (durationData.length === 4) {
        newUserDate.add(durationData[startIndex], 'd');
        startIndex = 1;
    }
    return newUserDate.set('h', durationData[startIndex]).set('m', durationData[startIndex + 1],).set('s', durationData[startIndex + 2]);
};

export const addTimeToDate = (userDate, userTime) => {
    const userDateCopy = moment(userDate);
    const parsedUserTime = parseEventDuration(userTime);

    return addDuration(userDateCopy, parsedUserTime);
};

export const setTimePartOfDate = (userDate, userTime) => {
    const userDateCopy = moment(userDate);
    const parsedUserTime = parseEventDuration(userTime);

    return setDuration(userDateCopy, parsedUserTime);
};

export const formatPresentationStartTimeByEventStartDateTime = (presentationStartDateTime) => {
    return moment(presentationStartDateTime).format('HH:mm:SS');
};

export const formatPresentationDateByEventStartDateTime = (presentationStartDateTime) => {
    return moment(presentationStartDateTime).format('YYYY-MM-DD');
};

export const evalPresentationDuration = (presentationStartDateTime, presentationEndDateTime) => {
    const presentationTimeDiff = presentationEndDateTime.diff(presentationStartDateTime);
    const presentationDuration = moment.duration(presentationTimeDiff);

    const presentationDurationDays = presentationDuration.get('days') === 0 ? '' : `${presentationDuration.get('days')}.`;

    const presentationDurationHours = presentationDuration.get('hours') < 10 ? `0${presentationDuration.get('hours')}`: presentationDuration.get('hours');
    const presentationDurationMinutes = presentationDuration.get('minutes') < 10 ? `0${presentationDuration.get('minutes')}`: presentationDuration.get('minutes');
    const presentationDurationSeconds = presentationDuration.get('seconds') < 10 ? `0${presentationDuration.get('seconds')}`: presentationDuration.get('seconds');

    return `${presentationDurationDays}${presentationDurationHours}:${presentationDurationMinutes}:${presentationDurationSeconds}`;
};

export const extractStartEndDateTimesForPresentationPair = (firstPresentation, secondPresentation) => {
    const firstPresentationStartDateTime = setTimePartOfDate(firstPresentation.eventDate, firstPresentation.startTime);
    const firstPresentationEndDateTime = addTimeToDate(firstPresentationStartDateTime, firstPresentation.duration);

    const secondPresentationStartDateTime = setTimePartOfDate(secondPresentation.eventDate, secondPresentation.startTime);
    const secondPresentationEndDateTime = addTimeToDate(secondPresentationStartDateTime, secondPresentation.duration);

    return [firstPresentationStartDateTime, firstPresentationEndDateTime, secondPresentationStartDateTime, secondPresentationEndDateTime];
};

export const testFirstPresentationOverlapSecondPartOfSecond = (firstPresentation, secondPresentation) => {
    const [firstPresentationStartDateTime, firstPresentationEndDateTime, secondPresentationStartDateTime, secondPresentationEndDateTime] = extractStartEndDateTimesForPresentationPair(firstPresentation, secondPresentation);

    const isStartDateTimeFits = moment(firstPresentationStartDateTime).isBetween(secondPresentationStartDateTime, secondPresentationEndDateTime, null, '()');
    const isEndDateTimeFits = firstPresentationEndDateTime.isSameOrAfter(secondPresentationEndDateTime);

    return isStartDateTimeFits && isEndDateTimeFits;
};

export const testFirstPresentationOverlapFirstPartOfSecond = (firstPresentation, secondPresentation) => {
    const [firstPresentationStartDateTime, firstPresentationEndDateTime, secondPresentationStartDateTime, secondPresentationEndDateTime] = extractStartEndDateTimesForPresentationPair(firstPresentation, secondPresentation);

    const isStartDateTimeFits = firstPresentationStartDateTime.isSameOrBefore(secondPresentationStartDateTime);
    const isEndDateTimeFits = moment(firstPresentationEndDateTime).isBetween(secondPresentationStartDateTime, secondPresentationEndDateTime, null, '()');

    return isStartDateTimeFits && isEndDateTimeFits;
};

export const testFirstPresentationContainedInSecond = (firstPresentation, secondPresentation) => {
    const [firstPresentationStartDateTime, firstPresentationEndDateTime, secondPresentationStartDateTime, secondPresentationEndDateTime] = extractStartEndDateTimesForPresentationPair(firstPresentation, secondPresentation);

    const isStartDateTimeFits = moment(firstPresentationStartDateTime).isBetween(secondPresentationStartDateTime, secondPresentationEndDateTime, null, '()');
    const isEndDateTimeFits = moment(firstPresentationEndDateTime).isBetween(secondPresentationStartDateTime, secondPresentationEndDateTime, null, '()');

    return isStartDateTimeFits && isEndDateTimeFits;
};

export const testFirstPresentationOverlapCompletelySecond = (firstPresentation, secondPresentation) => {
    const [firstPresentationStartDateTime, firstPresentationEndDateTime, secondPresentationStartDateTime, secondPresentationEndDateTime] = extractStartEndDateTimesForPresentationPair(firstPresentation, secondPresentation);

    const isStartDateTimeFits = firstPresentationStartDateTime.isSameOrBefore(secondPresentationStartDateTime);
    const isEndDateTimeFits = firstPresentationEndDateTime.isSameOrAfter(secondPresentationEndDateTime);

    return isStartDateTimeFits && isEndDateTimeFits;
};

export const testPresentationsCollide = (firstPresentation, secondPresentation) => {
    return cond([
        [testFirstPresentationOverlapCompletelySecond, constant(1)],
        [testFirstPresentationContainedInSecond, constant(2)],
        [testFirstPresentationOverlapFirstPartOfSecond, constant(3)],
        [testFirstPresentationOverlapSecondPartOfSecond, constant(4)],
        [stubTrue, constant(0)]
    ])(firstPresentation, secondPresentation);
};

export const testPeriodStartEndTimeFitsPeriod = (eventStartDateTime, eventEndDateTime, periodStartDateTime, periodEndDateTime) => {
    let eventStartDateTimeFits = eventStartDateTime.isSameOrBefore(periodStartDateTime) || eventStartDateTime.isBetween(periodStartDateTime, periodEndDateTime, null, '[)');
    let eventEndDateTimeFits = eventEndDateTime.isSameOrAfter(periodEndDateTime) || eventEndDateTime.isBetween(periodStartDateTime, periodEndDateTime, null, '(]');

    return eventStartDateTimeFits && eventEndDateTimeFits;
};

export const testNoRecurrentPresentation = (startDateTime, endDateTime, presentationData) => {
    const eventStartDateTime = setTimePartOfDate(presentationData.eventDate, presentationData.startTime);
    const eventEndDateTime = addTimeToDate(eventStartDateTime, presentationData.duration);

    return testPeriodStartEndTimeFitsPeriod(eventStartDateTime, eventEndDateTime, startDateTime, endDateTime);
};

export const findRecurrentPresentationStartDateTime = (startDateTime, presentationData) => {
    const startDateTimeCopy = moment(startDateTime);
    const presentationDaysOfWeek = extractPossibleWeekDaysFromEvent(presentationData.daysOfWeek);

    let startDay = startDateTimeCopy.day();

    while(presentationDaysOfWeek.indexOf(startDay) === -1) {
        startDateTimeCopy.subtract(1, 'day');
        startDay = startDateTimeCopy.day();
    }

    return startDateTimeCopy;
};

export const convertRecurrentToNoneRecurrentPresentation = (startDateTime, endDateTime, presentationData) => {
    const startDateTimeCopy = moment(startDateTime).subtract(1, 'day');

    let recurrenceStartDateTime = isNull(presentationData.recurrenceStartDate) ? findRecurrentPresentationStartDateTime(startDateTimeCopy, presentationData) : moment(presentationData.recurrenceStartDate);
    let recurrenceEndDateTime = isNull(presentationData.recurrenceEndDate) ? moment(endDateTime) : moment(presentationData.recurrenceEndDate);

    const presentationDaysOfWeek = extractPossibleWeekDaysFromEvent(presentationData.daysOfWeek);
    const chunkedPresentations = [];

    const starDateTimeDaysDiff = moment(startDateTime).diff(recurrenceStartDateTime, 'days');

    if (starDateTimeDaysDiff >= 7) {
        recurrenceStartDateTime = moment(startDateTime).subtract(7, 'day')
    }

    while(recurrenceStartDateTime.isBefore(recurrenceEndDateTime)) {
        const currentWeekDay = recurrenceStartDateTime.day();

        if (presentationDaysOfWeek.indexOf(currentWeekDay) === -1) {
            recurrenceStartDateTime.add(1, 'day');
            continue;
        } else {
            chunkedPresentations.push({
                ...presentationData,
                'isRecurrent': false,
                'eventDate': formatPresentationDateByEventStartDateTime(recurrenceStartDateTime),

                'recurrenceStartDate': null,
                'recurrenceEndDate': null,

                'daysOfWeek': null,

                'originalData': cloneDeep(presentationData)
            });

            recurrenceStartDateTime.add(1, 'day');
        }
    }

    return chunkedPresentations;
};

export const normalizePresentationsData = presentationsData => {
    const presentationsDataCopy = cloneDeep(presentationsData);

    return map(presentationsDataCopy, presentationData => {
        presentationData.interruptScheduling = isUndefined(presentationData.interruptScheduling) ? false : presentationData.interruptScheduling;
        return presentationData;
    })
};

export const isPresentationRecurrent = presentation => presentation.isRecurrent;

export const convertPresentationsToNoneRecurrentFormat = (startDateTime, endDateTime, presentationsData) => {
    const converterFunc = partial(convertRecurrentToNoneRecurrentPresentation, startDateTime, endDateTime);

    return chain(presentationsData).reduce((preparedPresentationsData, presentationData) => {
        const preparedPresentationData = isPresentationRecurrent(presentationData) ? converterFunc(presentationData) : castArray(presentationData);
        return preparedPresentationsData.concat(preparedPresentationData);
    }, []).value();
};

export const sortPresentationsByStartDateTime = (presentationsData, isAsc = false) => {
    const presentationsDataCopy = presentationsData.slice();
    const sortedPresentationsData = sortBy(presentationsDataCopy, presentationData => {
        return moment(`${presentationData.eventDate}T${presentationData.startTime}`).valueOf();
    });

    return isAsc ? reverse(sortedPresentationsData) : sortedPresentationsData;
};

export const splitPresentationsByInterruptSchedulingFlag = presentationsData => {
    return chain(presentationsData).reduce((presentationsGroups, presentation) => {
        const presentationCopy = cloneDeep(presentation);

        presentation.interruptScheduling ? presentationsGroups[0].push(presentationCopy) : presentationsGroups[1].push(presentationCopy);
        return presentationsGroups;
    }, [[], []]).map(presentations => {
        return sortPresentationsByStartDateTime(presentations);
    }).value();
};

export const replacePresentationAtPosition = (presentationToBeReplacedBy, replacementPosition, presentations) => {
    const presentationToBeReplacedByCopy = cloneDeep(presentationToBeReplacedBy);
    const presentationsCopy = cloneDeep(presentations);

    presentationsCopy.splice(replacementPosition, 1);
    presentationsCopy.splice(replacementPosition, 0, presentationToBeReplacedByCopy);

    return presentationsCopy;
};

export const deletePresentationAtPosition = (presentations, deleteAtPosition) => {
    const presentationsCopy = cloneDeep(presentations);
    presentationsCopy.splice(deleteAtPosition, 1);

    return presentationsCopy;
};

export const mergeContainedPresentation = (containedPresentation, containerPresentation, presentations, containedPresentationIndex) => {
    const containedPresentationCopy = cloneDeep(containedPresentation);
    const containerPresentationCopy = cloneDeep(containerPresentation);
    const presentationsCopy = cloneDeep(presentations);

    let [
        containedPresentationStartDateTime,
        containedPresentationEndDateTime,
        containerPresentationStartDateTime,
        containerPresentationEndDateTime
    ] = extractStartEndDateTimesForPresentationPair(containedPresentationCopy, containerPresentationCopy);

    let leftPresentation = cloneDeep(containerPresentationCopy);
    leftPresentation.duration = evalPresentationDuration(containerPresentationStartDateTime, containedPresentationStartDateTime);

    let rightPresentation = cloneDeep(containerPresentationCopy);
    rightPresentation.eventDate = formatPresentationDateByEventStartDateTime(containedPresentationEndDateTime);
    rightPresentation.startTime = formatPresentationStartTimeByEventStartDateTime(containedPresentationEndDateTime);
    rightPresentation.duration = evalPresentationDuration(containedPresentationEndDateTime, containerPresentationEndDateTime);

    presentationsCopy.splice(containedPresentationIndex, 1);

    presentationsCopy.splice(containedPresentationIndex, 0, leftPresentation);
    presentationsCopy.splice(containedPresentationIndex + 1, 0, containedPresentationCopy);
    presentationsCopy.splice(containedPresentationIndex + 2, 0, rightPresentation);

    return presentationsCopy;
};

export const shrinkPresentationThatIsOverlappedAtStart = (leftOverlappingPresentation, overlappedPresentation) => {
    const leftOverlappingPresentationCopy = cloneDeep(leftOverlappingPresentation);
    const overlappedPresentationCopy = cloneDeep(overlappedPresentation);

    const leftOverlappingPresentationStartDateTime = setTimePartOfDate(leftOverlappingPresentationCopy.eventDate, leftOverlappingPresentationCopy.startTime);
    const leftOverlappingPresentationEndDateTime = addTimeToDate(leftOverlappingPresentationStartDateTime, leftOverlappingPresentationCopy.duration);

    const overlappedPresentationStartDateTime = setTimePartOfDate(overlappedPresentationCopy.eventDate, overlappedPresentationCopy.startTime);
    const overlappedPresentationEndDateTime = addTimeToDate(overlappedPresentationStartDateTime, overlappedPresentationCopy.duration);

    overlappedPresentationCopy.eventDate = formatPresentationDateByEventStartDateTime(leftOverlappingPresentationEndDateTime);
    overlappedPresentationCopy.startTime = formatPresentationStartTimeByEventStartDateTime(leftOverlappingPresentationEndDateTime);
    overlappedPresentationCopy.duration = evalPresentationDuration(leftOverlappingPresentationEndDateTime, overlappedPresentationEndDateTime);

    return overlappedPresentationCopy;
};

export const shrinkPresentationThatIsOverlappedAtEnd = (rightOverlappingPresentation, overlappedPresentation) => {
    const rightOverlappingPresentationCopy = cloneDeep(rightOverlappingPresentation);
    const overlappedPresentationCopy = cloneDeep(overlappedPresentation);

    const rightOverlappingPresentationStartDateTime = setTimePartOfDate(rightOverlappingPresentationCopy.eventDate, rightOverlappingPresentationCopy.startTime);
    const overlappedPresentationStartDateTime = setTimePartOfDate(overlappedPresentationCopy.eventDate, overlappedPresentationCopy.startTime);

    overlappedPresentationCopy.duration = evalPresentationDuration(overlappedPresentationStartDateTime, rightOverlappingPresentationStartDateTime);
    return overlappedPresentationCopy;
};

export const mergeNotAffectingPresentation = (presentationToInsert, presentations) => {
    const presentationToInsertCopy = cloneDeep(presentationToInsert);
    const presentationsCopy = cloneDeep(presentations);

    presentationsCopy.push(presentationToInsertCopy);
    return sortPresentationsByStartDateTime(presentationsCopy);
};

export const mergeInterruptingPresentationsWithNoneInterrupting = splittedPresentationsData => {
    let splittedPresentationsDataCopy = cloneDeep(splittedPresentationsData);
    let interruptingPresentations = splittedPresentationsDataCopy[0];
    let mergedPresentations = splittedPresentationsDataCopy[1];

    forEach(interruptingPresentations, interruptingPresentation => {
        let mergedPresentationsCount = mergedPresentations.length;
        let interruptingPresentationsWasInserted = false;

        for (let presCounter = 0; presCounter < mergedPresentationsCount; presCounter++) {
            const mergedPresentation = mergedPresentations[presCounter];
            const presentationsCollideResult = testPresentationsCollide(interruptingPresentation, mergedPresentation);

            switch(presentationsCollideResult) {
                case 1:
                    mergedPresentations = deletePresentationAtPosition(mergedPresentations, presCounter);

                    presCounter--;
                    mergedPresentationsCount--;
                    break;

                case 2:
                    mergedPresentations = mergeContainedPresentation(interruptingPresentation, mergedPresentation, mergedPresentations, presCounter);
                    presCounter += 2;
                    break;

                case 3: {
                    const shrinkedPresentation = shrinkPresentationThatIsOverlappedAtStart(interruptingPresentation, mergedPresentation);
                    mergedPresentations = replacePresentationAtPosition(shrinkedPresentation, presCounter, mergedPresentations);
                    break;
                }

                case 4: {
                    const shrinkedPresentation = shrinkPresentationThatIsOverlappedAtEnd(interruptingPresentation, mergedPresentation);
                    mergedPresentations = replacePresentationAtPosition(shrinkedPresentation, presCounter, mergedPresentations);

                    break;
                }
            }
        }

        if (!interruptingPresentationsWasInserted) {
            mergedPresentations = mergeNotAffectingPresentation(interruptingPresentation, mergedPresentations);
        }
    });

    return mergedPresentations;
};

export const findPresentationsForPeriod = (startDateTime, endDateTime, presentationsData) => {
    const startDateTimeCopy = moment(startDateTime);
    const endDateTimeCopy = moment(endDateTime);

    // add necessary flags if they are absent, do other minor preparation tasks
    const presentationsDataCopy = normalizePresentationsData(presentationsData);

    const convertedPresentations = convertPresentationsToNoneRecurrentFormat(startDateTime, endDateTime, presentationsDataCopy);
    const testNoRecurrent = partial(testNoRecurrentPresentation, startDateTimeCopy, endDateTimeCopy);

    const testIfPresentationFits = cond([
        [presentation => !isPresentationRecurrent(presentation) && testNoRecurrent(presentation), stubTrue],
        [stubTrue, stubFalse]
    ]);

    const presentationsThatFitsPeriod = filter(convertedPresentations, testIfPresentationFits);
    const presentationsDataSplittedByInterruptSchedulingFlag = splitPresentationsByInterruptSchedulingFlag(presentationsThatFitsPeriod);

    return mergeInterruptingPresentationsWithNoneInterrupting(presentationsDataSplittedByInterruptSchedulingFlag);
};

export const normalizeNoRecurrentPresentationForScheduler = (startDateTime, endDateTime, presentationData) => {
    let eventStartDateTime = setTimePartOfDate(presentationData.eventDate, presentationData.startTime);
    let eventEndDateTime = addTimeToDate(eventStartDateTime, presentationData.duration);

    eventStartDateTime = eventStartDateTime.isBefore(startDateTime) ? moment(startDateTime) : eventStartDateTime;
    eventEndDateTime = eventEndDateTime.isAfter(endDateTime) ? moment(endDateTime) : eventEndDateTime;

    return {name: presentationData.presentationName, period: presentationData.originalData.daysOfWeek, eventStartDateTime, eventEndDateTime, originalData: presentationData.originalData};
};

export const preparePresentationsForScheduler = (startDateTime, endDateTime, presentationsData) => {
    const startDateTimeCopy = moment(startDateTime);
    const endDateTimeCopy = moment(endDateTime);

    const convertedPresentations = convertPresentationsToNoneRecurrentFormat(startDateTime, endDateTime, presentationsData);
    let preparedPresentationsForScheduler = [];

    while(startDateTimeCopy.isBefore(endDateTimeCopy)) {
        const endDateTime = moment(startDateTimeCopy).add(1, 'd');

        const foundPresentations = findPresentationsForPeriod(startDateTimeCopy, endDateTime, convertedPresentations);
        const normalizationFunc = partial(normalizeNoRecurrentPresentationForScheduler, startDateTimeCopy, endDateTime);
        const preparedPresentations = map(foundPresentations, normalizationFunc);

        preparedPresentationsForScheduler = preparedPresentationsForScheduler.concat(preparedPresentations);
        startDateTimeCopy.add(1, 'd');
    }

    return sortBy(preparedPresentationsForScheduler, presentationData => moment(presentationData.eventStartDateTime).valueOf());
};

export const preparePresentationsForDayScheduler = (startDateTime, presentationsData) => {
    const startDateTimeCopy = moment(startDateTime).set('h', 0).set('m', 0).set('s', 0).set('ms', 0);
    const endDateTime = moment(startDateTimeCopy).add(1, 'd');

    return preparePresentationsForScheduler(startDateTimeCopy, endDateTime, presentationsData);
};

export const findAndPreparePresentationsForDayScheduler = (startDateTime, presentationsData) => {
    const startDateTimeCopy = moment(startDateTime).set('h', 0).set('m', 0).set('s', 0).set('ms', 0);
    const endDateTime = moment(startDateTimeCopy).add(1, 'd');
    const foundPresentations = findPresentationsForPeriod(startDateTimeCopy, endDateTime, presentationsData);

    return preparePresentationsForScheduler(startDateTimeCopy, endDateTime, foundPresentations);
};

export const findAndPreparePresentationsForWeekSchedulerFromSunday = (startDateTime, presentationsData) => {
    const startDateTimeCopy = moment(startDateTime).set('h', 0).set('m', 0).set('s', 0).set('ms', 0);
    let startDateTimeWeekDayCopy = startDateTimeCopy.weekday();

    while(startDateTimeWeekDayCopy !== 0) {
        startDateTimeCopy.subtract(1, 'd');
        startDateTimeWeekDayCopy = startDateTimeCopy.weekday();
    }

    const endDateTime = moment(startDateTimeCopy).add(7, 'd');
    const foundPresentations = findPresentationsForPeriod(startDateTimeCopy, endDateTime, presentationsData);
    const weekPresentations = preparePresentationsForScheduler(startDateTimeCopy, endDateTime, foundPresentations);

    const startDateTimeCounter = moment(startDateTimeCopy);
    const endDateTimeCounter = moment(startDateTimeCounter).add(1, 'd');
    const weekPresentationsByDay = [];

    do {
        const presentationsInArray = chain(weekPresentations).filter((presentation) => {
            const isStartDateTimeFits = moment(presentation.eventStartDateTime).isBetween(startDateTimeCounter, endDateTimeCounter, null, '[)');
            const isEndDateTimeFits = moment(presentation.eventEndDateTime).isBetween(startDateTimeCounter, endDateTimeCounter, null, '(]');

            return isStartDateTimeFits && isEndDateTimeFits;
        }).reduce((presentationsArray, presentation) => {
            presentationsArray.push(presentation);
            return presentationsArray;
        }, []).value();

        weekPresentationsByDay.push(presentationsInArray);

        startDateTimeCounter.add(1, 'd');
        endDateTimeCounter.add(1, 'd');
    } while(endDateTimeCounter.isSameOrBefore(endDateTime));

    return weekPresentationsByDay;
};