'use strict';

import mori from 'mori';

export default async () => {

    const list1 = mori.list(2, 4, 6, 10, 2, 6, 10, 4, 13);
    const list2 = mori.list('val_1', 'val_3', 'val_10', 'val_5', 'val_9', 'val_1', 'val_3', 'val_10');

    const list3 = mori.list(list1, list2);

    console.log('"Mori" library tests');
    console.log('====================');

    console.log('Lists examples:');
    console.log('');

    console.log('list1 (toString):', list1);
    console.log('list2 (toString):', list2);

    console.log('');
    console.log('Collection operations examples:');
    console.log('');

    console.log('mori.conj(list1, 331): ', mori.conj(list1, 331));
    console.log('mori.conj(list2, "val_331"):', mori.conj(list2, 'val_331'));

    console.log('');

    console.log(mori.into(list1, list2));
    console.log(mori.into(list2, list1));

    console.log('');

    console.log(mori.distinct(list1));
    console.log(mori.distinct(list2));

    console.log('');

    console.log(mori.empty(list1));
    console.log(mori.empty(list2));

    console.log('');

    console.log(mori.get(list1, 2));
    console.log(mori.get(list2, 3));
    console.log(mori.get(list3, 1));

    console.log('');

    console.log(mori.getIn(list3, [1, 2]));


    console.log('');
    console.log('--------------------------------------------------------');
    console.log('');
}

/*
    Notes:

    - Lists support efficient addition at the head of the list;

 */