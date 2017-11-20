'use strict';

// https://codility.com/
//
// Find how many weeks John can spent on Hawaii

export default async () => {
    // not very accurate and not best solution
    const notVeryAccurateNotBestSolutionFunc = (function () {
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const monthLengths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        const weekDaysNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

        const specialMonthIndex = 1;

        function findWeekDayIndexByDayNumber(userDaysInMonth, userWeekDayIndex) {
            for (let dayCounter = 0; dayCounter < userDaysInMonth; dayCounter++) {
                userWeekDayIndex++;
                userWeekDayIndex = userWeekDayIndex >= weekDaysNames.length ? 0 : userWeekDayIndex;
            }

            return userWeekDayIndex;
        }

        function findWeekDayIndexByName(userWeekDay) {
            userWeekDay = userWeekDay.toLowerCase();
            return weekDaysNames.findIndex(weekDay => weekDay.toLowerCase() === userWeekDay);
        }

        function findWeekDayIndex(userYear, userFirstYearDayWeekDayIndex, userMonthIndex, monthEnd = false) {
            for (let monthIndexCounter = 0; monthIndexCounter < monthLengths.length && monthIndexCounter < userMonthIndex; monthIndexCounter++) {
                let daysInMonth = monthLengths[monthIndexCounter];

                if (monthIndexCounter === specialMonthIndex && userYear % 4 === 0) {
                    daysInMonth = 29;
                }

                userFirstYearDayWeekDayIndex = findWeekDayIndexByDayNumber(daysInMonth, userFirstYearDayWeekDayIndex);
            }

            if (monthEnd) {
                userFirstYearDayWeekDayIndex = findWeekDayIndexByDayNumber(monthLengths[userMonthIndex] - 1, userFirstYearDayWeekDayIndex);
            }

            return userFirstYearDayWeekDayIndex;
        }

        function findMonthIndex(userMonthName) {
            userMonthName = userMonthName.toLowerCase();
            return monthNames.findIndex(monthName => monthName.toLowerCase() === userMonthName);
        }

        function findTotalWeeksOnHawaii(totalVacationDays, firstDayIndex) {
            let isOnHawaii = false;
            let totalWeeksOnHawaii = 0;

            for (let dayCounter1 = 0; dayCounter1 < totalVacationDays; dayCounter1++) {
                if (firstDayIndex === 0 && !isOnHawaii) {
                    isOnHawaii = true;
                }

                if (isOnHawaii && firstDayIndex === weekDaysNames.length - 1) {
                    totalWeeksOnHawaii++;
                    isOnHawaii = false;
                }

                firstDayIndex++;
                firstDayIndex = firstDayIndex >= weekDaysNames.length ? 0 : firstDayIndex;
            }

            return totalWeeksOnHawaii;
        }

        return function(userYear, userStartingMonthName, userEndingMonthName, firstDayOfYearWeekName) {
            const firstYearDayWeekDayIndex = findWeekDayIndexByName(firstDayOfYearWeekName);
            const startingMonthIndex = findMonthIndex(userStartingMonthName);
            const lastMonthIndex = findMonthIndex(userEndingMonthName);

            const firstVacationDayWeekIndex = findWeekDayIndex(userYear, firstYearDayWeekDayIndex, startingMonthIndex);

            const startingMonthDays = monthLengths[startingMonthIndex];
            const endingMonthDays = monthLengths[lastMonthIndex];

            const totalVacationDays = startingMonthDays + endingMonthDays;

            return findTotalWeeksOnHawaii(totalVacationDays, firstVacationDayWeekIndex);
        }
    }());

    console.log('Weeks in Hawaii');
    console.log('===============');
    console.log('');

    console.log('Not very accurate and not best solution...');
    console.log('');
    console.log('2014, April-May, year starting on Wednesday -', notVeryAccurateNotBestSolutionFunc(2014, 'april', 'may', 'wednesday'), 'days');

    console.log('');
    console.log('--------------------------------------------------------');
    console.log('');
}