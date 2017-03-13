'use strict';

import {each, intersection} from 'lodash';
import {MILLISECONDS_IN_MINUTE, WEEK_DAYS, WEEK_ENDS, MAX_PRESENTATIONS_COUNT} from './constants';

export const formatNumber = (usrNumber) => {
    return usrNumber < 10 ? '0' + usrNumber : usrNumber.toString();
};

export const formatDateForScheduler = (usrDate) => {
    return `${usrDate.getFullYear()}-${formatNumber(usrDate.getMonth())}-${formatNumber(usrDate.getDay())} ${formatNumber(usrDate.getHours())}:${formatNumber(usrDate.getMinutes())}:${formatNumber(usrDate.getSeconds())}`;
};

export const calcPeriodInHours = (startDate, endDate) => {
    let startDateTimeStamp = startDate.getTime();
    let endDateTimeStamp = endDate.getTime();

    let period = endDateTimeStamp - startDateTimeStamp;

    let periodInMinutes = period / MILLISECONDS_IN_MINUTE;
    let periodInHours = periodInMinutes / 60;

    if (periodInMinutes % 60 !== 0) {
        periodInHours++;
    }

    return periodInHours;
};

export const parseDateData = (dateData) => {
    let parsedDateData = dateData.split('-');

    return {
        year: parseInt(parsedDateData[0]),
        month: parseInt(parsedDateData[1]) - 1,
        day: parseInt(parsedDateData[2])
    };
};

export const parseTimeData = (timeData) => {
    let parsedTimeData = timeData.split(':');
    let daysData = parsedTimeData[0].split('.');

    if (daysData.length > 1) {
        let hours = parseInt(daysData[1]);

        parsedTimeData[0] = hours + (parseInt(daysData[0]) * 24);
    } else {
        parsedTimeData[0] = parseInt(parsedTimeData[0]);
    }

    return {
        hours: parsedTimeData[0],
        minutes: parseInt(parsedTimeData[1]),
        seconds: parseInt(parsedTimeData[2])
    }
};

export const parseDate = (dateString) => {
    const dateObj = new Date();

    if (dateString.indexOf('T') === -1) {
        dateString += 'T00:00:00';
    }

    let timePortionStartPosition = dateString.indexOf('T');
    let datePortion = dateString.substr(0, timePortionStartPosition);
    let timePortion = dateString.substr(timePortionStartPosition + 1);

    let parsedDatePortion = parseDateData(datePortion);
    let parsedTimePortion = parseTimeData(timePortion);

    dateObj.setFullYear(parsedDatePortion.year, parsedDatePortion.month - 1, parsedDatePortion.day);

    dateObj.setHours(parsedTimePortion.hours);
    dateObj.setMinutes(parsedTimePortion.minutes);
    dateObj.setSeconds(parsedTimePortion.seconds);
    dateObj.setMilliseconds(0);

    return dateObj;
};

export const createDummyDate = () => {
    let dummyDate = new Date();

    dummyDate.setHours(0);
    dummyDate.setMinutes(0);
    dummyDate.setSeconds(0);
    dummyDate.setMilliseconds(0);

    return dummyDate;
};

export const createDummyDateByTimeData = (timeData) => {
    let dummyDate = createDummyDate();
    let parsedTimeData = parseTimeData(timeData);

    dummyDate.setHours(parsedTimeData.hours);
    dummyDate.setMinutes(parsedTimeData.minutes);
    dummyDate.setSeconds(parsedTimeData.seconds);

    return dummyDate;
};

export const setTimeByTimeData = (usrDate, duration) => {
    let usrDateCopy = new Date(usrDate);
    let parsedTimeData = parseTimeData(duration);

    usrDateCopy.setHours(parsedTimeData.hours);
    usrDateCopy.setMinutes(parsedTimeData.minutes);
    usrDateCopy.setSeconds(parsedTimeData.seconds);

    return usrDateCopy;
};

export const addDurationToDate = (usrDate, duration) => {
    let usrDateCopy = new Date(usrDate);
    let parsedTimeData = parseTimeData(duration);

    usrDateCopy.setHours(usrDateCopy.getHours() + parsedTimeData.hours);
    usrDateCopy.setMinutes(usrDateCopy.getMinutes() + parsedTimeData.minutes);
    usrDateCopy.setSeconds(usrDateCopy.getSeconds() + parsedTimeData.seconds);

    return usrDateCopy;
};

export const findEndlessEveryDayPresentations = (usrData) => {
    let foundPresentations = [];

    each(usrData, (presentationData, presentationId) => {
        let startDate = createDummyDateByTimeData(presentationData.startTime);
        let endDate = addDurationToDate(startDate, presentationData.duration);

        let durationInHours = calcPeriodInHours(startDate, endDate);

        let isRecurrent = presentationData.isRecurrent === true;
        let isAllDay = durationInHours >= 24;

        let isNoStartDate = presentationData.recurrenceStartDate === null;
        let isNoEndDate = presentationData.recurrenceEndDate === null;

        let isEveryDay = presentationData.daysOfWeek === 'EveryDay';

        if (isRecurrent && isAllDay && isNoStartDate && isNoEndDate && isEveryDay) {
            foundPresentations.push(presentationData);
        }
    });

    return foundPresentations;
};

export const findEndlessRecurrentPresentations = (usrData) => {
    let foundPresentations = [];

    each(usrData, (presentationData) => {
        let isRecurrent = presentationData.isRecurrent === true;
        let isNoEndDate = presentationData.recurrenceEndDate === null;

        if (isRecurrent && isNoEndDate) {
            foundPresentations.push(presentationData);
        }
    });

    return foundPresentations;
};

export const getPossibleWeekDaysForPeriod = (startDate, endDate) => {
    let startDateCopy = new Date(startDate);
    let weekDays = [];

    let startDateTimeStamp = startDateCopy.getTime();
    let endDateTimeStamp = endDate.getTime();

    let dayCounter = 0;

    while(startDateTimeStamp < endDateTimeStamp && dayCounter < 7) {
        let weekDay = startDateCopy.getDay();

        if (weekDays.indexOf(weekDay) !== -1) {
            return weekDays;
        }

        weekDays.push(weekDay);

        startDateCopy.setDate(startDateCopy.getDate() + 1);
        startDateTimeStamp = startDateCopy.getTime();

        dayCounter++;
    }

    return weekDays;
};

export const isPresentationWeekDaysFit = (presentationDaysOfWeek, possibleWeekDays) => {
    presentationDaysOfWeek = presentationDaysOfWeek.toLowerCase();

    switch(presentationDaysOfWeek) {
        case 'weekdays':
            return intersection(possibleWeekDays, WEEK_DAYS).length > 0;

        case 'weekends':
            return intersection(possibleWeekDays, WEEK_ENDS).length > 0;

        case 'monday':
            return possibleWeekDays.indexOf(1) !== -1;

        case 'tuesday':
            return possibleWeekDays.indexOf(2) !== -1;

        case 'wednesday':
            return possibleWeekDays.indexOf(3) !== -1;

        case 'thursday':
            return possibleWeekDays.indexOf(4) !== -1;

        case 'friday':
            return possibleWeekDays.indexOf(5) !== -1;

        case 'everyday':
            return true;
        default:
            return false;
    }
};

export const testNoRecurrentPresentation = (startDate, endDate, presentationData) => {
    const eventStartDate = setTimeByTimeData(parseDate(presentationData.eventDate), presentationData.startTime);
    const eventEndDate = addDurationToDate(eventStartDate, presentationData.duration);

    const periodStartTimeStamp = startDate.getTime();
    const periodEndTimeStamp = endDate.getTime();

    const eventStartTimeStamp = eventStartDate.getTime();
    const eventEndTimeStamp = eventEndDate.getTime();

    const isEventStartTimeFits = eventStartTimeStamp < periodEndTimeStamp;
    const isEventEndTimeFits = eventEndTimeStamp > periodStartTimeStamp;

    return isEventStartTimeFits && isEventEndTimeFits;
};

export const testRecurrentPresentation = (startDate, endDate, presentationData) => {
    const recurrenceStartDate = presentationData.recurrenceStartDate === null ? new Date(startDate) : parseDate(presentationData.recurrenceStartDate);
    const recurrenceEndDate = presentationData.recurrenceEndDate === null ? new Date(endDate) : parseDate(presentationData.recurrenceEndDate);

    const periodStartTimeStamp = startDate.getTime();
    const periodEndTimeStamp = endDate.getTime();

    const recurrenceStartDateTimeStamp = recurrenceStartDate.getTime();
    const recurrenceEndDateTimeStamp = recurrenceEndDate.getTime();

    const isRecurrenceStartDateFits = recurrenceStartDateTimeStamp <= periodEndTimeStamp;
    const isRecurrenceEndDateFits = recurrenceEndDateTimeStamp >= periodStartTimeStamp;

    if (!(isRecurrenceStartDateFits && isRecurrenceEndDateFits)) {
        return false;
    }

    const eventStartDate = recurrenceStartDateTimeStamp < periodStartTimeStamp ? new Date(periodStartTimeStamp) : new Date(recurrenceStartDateTimeStamp);
    const eventEndDate = recurrenceEndDateTimeStamp > periodEndTimeStamp ? new Date(periodEndTimeStamp) : new Date(recurrenceEndDateTimeStamp);

    const possibleWeekDays = getPossibleWeekDaysForPeriod(eventStartDate, eventEndDate);
    const presentationDaysOfWeek = presentationData.daysOfWeek.toLowerCase();

    return isPresentationWeekDaysFit(presentationData.daysOfWeek, possibleWeekDays);
};

export const findPresentationsForPeriod = (startDate, endDate, presentationsData) => {
    let foundPresentations = [];

    each(presentationsData, (presentationData) => {
        let isPassingTest = false;

        if (!presentationData.isRecurrent) {
            isPassingTest = testNoRecurrentPresentation(startDate, endDate, presentationData);
        } else {
            isPassingTest = testRecurrentPresentation(startDate, endDate, presentationData);
        }

        if (isPassingTest) {
            foundPresentations.push(presentationData);
        }
    });

    return foundPresentations;
};

export const convertRecurrentPresentationToSchedulerFormat = (startDate, endDate, presentationData) => {
    const recurrenceStartDate = presentationData.recurrenceStartDate === null ? new Date(startDate) : parseDate(presentationData.recurrenceStartDate);
    const recurrenceEndDate = presentationData.recurrenceEndDate === null ? new Date(endDate) : parseDate(presentationData.recurrenceEndDate);

    const periodStartTimeStamp = startDate.getTime();
    const periodEndTimeStamp = endDate.getTime();

    const recurrenceStartDateTimeStamp = recurrenceStartDate.getTime();
    const recurrenceEndDateTimeStamp = recurrenceEndDate.getTime();

    let currentPresentationPeriodStartDate = recurrenceStartDateTimeStamp < periodStartTimeStamp ? new Date(periodStartTimeStamp) : new Date(recurrenceStartDateTimeStamp);
    const currentPresentationPeriodEndDate = recurrenceEndDateTimeStamp > periodEndTimeStamp ? new Date(periodEndTimeStamp) : new Date(recurrenceEndDateTimeStamp);

    let currentPresentationPeriodStartDateTimeStamp = currentPresentationPeriodStartDate.getTime();
    const currentPresentationPeriodEndDateTimeStamp = currentPresentationPeriodEndDate.getTime();

    let presentationCount = 0;
    const convertedPresentations = [];

    while ((currentPresentationPeriodStartDateTimeStamp < currentPresentationPeriodEndDateTimeStamp) && (presentationCount < MAX_PRESENTATIONS_COUNT)) {
        let presentationDay = [currentPresentationPeriodStartDate.getDay()];

        if (isPresentationWeekDaysFit(presentationData.daysOfWeek, presentationDay)) {

            let convertedPresentationStartDate = setTimeByTimeData(currentPresentationPeriodStartDate, presentationData.startTime);
            let convertedPresentationEndDate = addDurationToDate(convertedPresentationStartDate, presentationData.duration);

            convertedPresentations.push({
                'startDate': formatDateForScheduler(convertedPresentationStartDate),
                'endDate': formatDateForScheduler(convertedPresentationEndDate),
                'period': presentationData.daysOfWeek
            });
        }

        currentPresentationPeriodStartDate.setDate(currentPresentationPeriodStartDate.getDate() + 1);
        currentPresentationPeriodStartDateTimeStamp = currentPresentationPeriodStartDate.getTime();
        presentationCount++;
    }

    return convertedPresentations;
};

export const convertPresentationsToSchedulerFormat = (startDate, endDate, presentationsData) => {
    let convertedPresentations = [];

    return each(presentationsData, (presentationData) => {
        if (!presentationData.isRecurrent) {
            //isPassingTest = testNoRecurrentPresentation(startDate, endDate, presentationData);
        } else {
            convertedPresentations = convertedPresentations.concat(convertRecurrentPresentationToSchedulerFormat(startDate, endDate, presentationData));
        }
    });

    return convertedPresentations;
};