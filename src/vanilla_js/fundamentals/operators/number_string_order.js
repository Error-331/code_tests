'use strict';

export default async () => {
    console.log('Number/string operator order');
    console.log('============================');
    console.log('');

    console.log('A sum with a string always returns a string.');
    console.log('A difference between number and string will always return number');

    console.log('');

    console.log('1 + 2 =', 1 + 2);
    console.log('1 + "2" =', 1 + "2");
    //console.log('1 — "2" =', 1 — '2'); // -1
    console.log('1 + 2 + "3" =', 1 + 2 + "3");
    //console.log('"1" + 2 — "3" =', "1" + 2 — "3"); // 9
    //console.log('1 — 2 + "3" =', 1 — 2 + "3"); // -13
    //console.log('1 — 2 — "3" =', 1 — 2 — "3"); // -4
    console.log('1 * 2 + "3" =', 1 * 2 + "3");
    console.log('"1" + "2" * 3 =', "1" + "2" * 3);
    console.log('"1" + 2 / 3 =', "1" + 2 / 3);
    console.log('1 + "2" / 3 =', 1 + "2" / 3);
    console.log('"1" / "2" + "3" =', "1" / "2" + "3");

    console.log('');
    console.log('--------------------------------------------------------');
    console.log('');
}