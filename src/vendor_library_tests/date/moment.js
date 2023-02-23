'use strict';

import moment from 'moment';

export default async () => {
    console.log('"Moment" library tests');
    console.log('======================');

    console.log('');
    console.log('Formatting examples:');
    console.log('');

    console.log('1/7/2023 is formatted as', moment('1/7/2023').format('YYYY-MM-DD, h:mm:ss a'));
    console.log('2/4/2023 is formatted as', moment('2/4/2023').format('YYYY-MM-DD, h:mm:ss a'));
    console.log('1/7/2022 is formatted as', moment('1/7/2022').format('MM/DD/YYYY h:mm:ss a zz'));

    console.log('');

    console.log('');
    console.log('isSame examples:');
    console.log('');

    console.log('2017-03-11T00:00:00 is same 2017-03-11T00:00:00 -', moment('2017-03-11T00:00:00').isSame('2017-03-11T00:00:00'));
    console.log('2017-03-11T00:00:00 is same 2017-03-11T10:00:00 -', moment('2017-03-11T00:00:00').isSame('2017-03-11T10:00:00'));
    console.log('2017-03-11T10:00:00 is same 2017-03-11T10:00:00 -', moment('2017-03-11T10:00:00').isSame('2017-03-11T10:00:00'));

    console.log('');

    console.log('2017-03-11 is same 2017-03-11 -', moment('2017-03-11').isSame('2017-03-11'));
    console.log('2017-03-11 is same 2017-05-27 -', moment('2017-03-11').isSame('2017-05-27'));

    console.log('');
    console.log('isBetween examples:');
    console.log('');

    console.log('2017-03-11T10:00:00 is between 2017-03-11T00:00:00-2017-03-11T23:59:59 -' ,moment('2017-03-11T10:00:00').isBetween('2017-03-11T00:00:00', '2017-03-11T23:59:59'));
    console.log('2017-03-11T00:00:00 is between 2017-03-11T00:00:00-2017-03-11T23:59:59 -',moment('2017-03-11T00:00:00').isBetween('2017-03-11T00:00:00', '2017-03-11T23:59:59'));
    console.log('2017-03-11T23:59:59 is between 2017-03-11T00:00:00-2017-03-11T23:59:59 -',moment('2017-03-11T23:59:59').isBetween('2017-03-11T00:00:00', '2017-03-11T23:59:59'));

    console.log('2017-03-11T10:00:00 is between [2017-03-11T00:00:00-2017-03-11T23:59:59] -',moment('2017-03-11T10:00:00').isBetween('2017-03-11T00:00:00', '2017-03-11T23:59:59', null, '[]'));
    console.log('2017-03-11T00:00:00 is between [2017-03-11T00:00:00-2017-03-11T23:59:59] -',moment('2017-03-11T00:00:00').isBetween('2017-03-11T00:00:00', '2017-03-11T23:59:59', null, '[]'));
    console.log('2017-03-11T23:59:59 is between [2017-03-11T00:00:00-2017-03-11T23:59:59] -',moment('2017-03-11T23:59:59').isBetween('2017-03-11T00:00:00', '2017-03-11T23:59:59', null , '[]'));

    console.log('');
    console.log('add examples:');
    console.log('');

    console.log('2017-03-11T10:00:00 add 48h', moment('2017-03-11T10:00:00').add('48', 'h'));


    console.log('');
    console.log('--------------------------------------------------------');
    console.log('');
}