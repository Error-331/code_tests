'use strict';

import Either from 'lodash-fantasy/data/Either';

export default async () => {

    const left1 = Either.left('Left value 1');
    const left2 = Either.left(val => `${val}_ap_left2`);

    const right1 = Either.right('Right value 1');
    const right2 = Either.right(val => `${val}_ap_right2`);

    console.log('"Fantasy Lodash" library tests');
    console.log('==============================');
    console.log();

    console.log('Left1:', left1);
    console.log('Left2:', left2);

    console.log();

    console.log('Right1:', right1);
    console.log('Right2:', right2);

    console.log();

    console.log('left1.isLeft(): ', left1.isLeft());
    console.log('left2.isLeft(): ', left2.isLeft());

    console.log();

    console.log('left1.fmap((lValue) => `${lValue}_fmorph1`): ', left1.fmap((lValue) => `${lValue}_fmorph1`));
    console.log('left2.fmap((lValue) => `${lValue}_fmorph2("left2")`): ', left2.fmap((lValue) => `${lValue("left2")}_fmorph2`));

    console.log();

    console.log('left1.map((lValue) => `${lValue}_mmorph1`): ', left1.map((lValue) => `${lValue}_mmorph1`));
    console.log('left2.map((lValue) => `${lValue}_mmorph2("left2")`): ', left2.map((lValue) => `${lValue("left2")}_mmorph2`));

    console.log();

    console.log('left1.ap(left2): ', left1.ap(left2));
    console.log('left1.ap(right2): ', left1.ap(right2));

    console.log();

    const leftChain1 = left1
        .chain((val) => Either.left(`${val}_chain1`))
        .chain((val) => Either.left(`${val}_chain2`));

    console.log('leftChain1: ', leftChain1);

    console.log();

    console.log('right1.isRight(): ', right1.isRight());
    console.log('right2.isRight(): ', right2.isRight());

    console.log();

    console.log('right1.fmap((rValue) => `${rValue}_fmorph1`): ', right1.fmap((rValue) => `${rValue}_fmorph1`));
    console.log('right2.fmap((rValue) => `${rValue("right2")}_fmorph2`): ', right2.fmap((rValue) => `${rValue("right2")}_fmorph2`));

    console.log();

    console.log('right1.map((rValue) => `${rValue}_mmorph1`): ', right1.map((rValue) => `${rValue}_mmorph1`));
    console.log('right2.map((rValue) => `${rValue("right2")}_mmorph2`): ', right2.map((rValue) => `${rValue("right2")}_mmorph2`));

    console.log();

    console.log('right1.ap(right2): ', right1.ap(right2));
    console.log('right1.ap(left2): ', right1.ap(left2));

    console.log();

    const rightChain1 = right1
        .chain((val) => Either.right(`${val}_chain1`))
        .chain((val) => Either.right(`${val}_chain2`));

    console.log('rightChain1: ', rightChain1);

    console.log('');
    console.log('--------------------------------------------------------');
    console.log('');
}
