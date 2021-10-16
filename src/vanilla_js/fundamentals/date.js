'use strict';


export default async () => {
    const curDate1 = new Date();

    const someDate1 = new Date('2022-10-01T00:00:00');
    const someDate2 = new Date('2030-12-01T00:00:00');

    console.log('"Date" examples');
    console.log('===============');
    console.log('');

    console.log('curDate1 - ', curDate1);
    console.log('curDate1.toString() - ', curDate1.toString());
    console.log('');

    console.log('curDate1.getDate() - ',  curDate1.getDate());
    console.log('curDate1.getMonth() - ', curDate1.getMonth());
    console.log('curDate1.getFullYear() - ', curDate1.getFullYear());
    console.log('');

    console.log('curDate1.getHours() - ', curDate1.getHours());
    console.log('curDate1.getMinutes() - ', curDate1.getMinutes());
    console.log('curDate1.getSeconds() - ', curDate1.getSeconds());
    console.log('');

    console.log('curDate1.getTimezoneOffset() - ', curDate1.getTimezoneOffset());
    console.log('curDate1.getTimezoneOffset() / 60 - ', curDate1.getTimezoneOffset() / 60);
    console.log('');

    console.log('someDate1 - ', someDate1);
    console.log('someDate1.toString() - ', someDate1.toString());

    console.log('');

    console.log('someDate2 > someDate1 - ', someDate2 > someDate1); // true
    console.log('someDate2 < someDate1 - ', someDate2 < someDate1); // false

    console.log('');

    console.log('+someDate1 <= +someDate2', +someDate1 <= +someDate2); // true
    console.log('+someDate2 >= +someDate1', +someDate2 >= +someDate1); // true
    console.log('+someDate1 === +someDate1', +someDate1 === +someDate1); // true
    console.log('+someDate1 !== +someDate2', +someDate1 !== +someDate2); // true

    console.log('');
    console.log('--------------------------------------------------------');
    console.log('');
}

