export const MILLISECONDS_IN_HOUR = 3600000;
export const MILLISECONDS_IN_MINUTE = 60000;

export const EVERY_DAY_NAME = 'EveryDay';
export const EVERY_WEEKDAY_NAME = 'EveryWeekday';
export const EVERY_WEEKEND_NAME = 'EveryWeekend';

export const WEEK_DAYS_NUMBERS = [1,2,3,4,5];
export const WEEK_ENDS_NUMBERS = [0, 6];
export const ALL_DAYS_NUMBERS = WEEK_DAYS_NUMBERS.concat(WEEK_ENDS_NUMBERS);

export const TIME_ZONE_REG_EXP = new RegExp('\\+\\d{2}\\:\\d{2}$');
export const MAX_PRESENTATIONS_COUNT = 100;