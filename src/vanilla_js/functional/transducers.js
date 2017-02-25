'use strict';

// https://medium.com/@dtipson/javascript-transducers-2-stateful-gateful-1faa1b01ae50#.ki3knee0c

export default async () => {
    const reduce = (reducerFunction, accumulator, items) => {
        for (let item of items){
            let next = reducerFunction(accumulator, item);
            accumulator = next && next[reduce.stopper] || next;

            if (next[reduce.stopper]){
                break;
            }
        }

        return accumulator;
    };

    Object.defineProperty(reduce, 'stopper', {
        enumerable: false,
        configurable: false,
        writable: false,
        value: Symbol('stop reducing')//no possible computation could come up with this by accident
    });

    const compose = (reducingFunction1, reducingFunction2) => x => reducingFunction1(reducingFunction2(x));

    const mapping = transformerFunction => reducingFunction => (accumulator, item) => reducingFunction(accumulator, transformerFunction(item, accumulator));
    const filtering = transformerFunction => reducingFunction => (accumulator, item) => transformerFunction(item, accumulator) ? reducingFunction(accumulator, item) : accumulator;

    const concat = (array, value) => array.concat([value]);
    const dropGate = skips => x => --skips < 0;
    const dropping = skips => filtering(dropGate(skips));

    const taking = allows => reducerFn => {
        let _allows = allows;
        return (acc, item) => {
            return --_allows > 0 ? reducerFn(acc, item) : { [reduce.stopper]: reducerFn(acc, item) };
        }
    };

    console.log('Transducers examples');
    console.log('====================');
    console.log('');

    console.log('Skip first three array elements, reduce(dropping(3)(concat),[],[1,2,3,4,5]) =', reduce(dropping(3)(concat),[],[1,2,3,4,5]));
    console.log('Taking first three elements and incrementing them, reduce(compose(mapping(x => x + 1), taking(3))(concat), [], [3,4,9,13,14,12,56]) =', reduce(compose(mapping(x => x + 1), taking(3))(concat), [], [3,4,9,13,14,12,56]));
    console.log('Dropping first two elements and taking next three, reduce(compose(dropping(2), taking(3))(concat), [], [3,4,9,13,14,12,45,56]) =', reduce(compose(dropping(2), taking(3))(concat), [], [3,4,9,13,14,12,45,56]));

    // let composed = compose(dropping(3),mapping(x=>x+1))(concat); - not work, because 'skips' counter will save its state

    const noiseFilter = (testFn, chances, isOpen=false) => {
        let fails = 0;
        return x => {
            if(testFn(x)){
                isOpen = true;
                fails = 0;
            }
            else{
                fails++;
            }

            if(fails > chances){
                isOpen = false;
            }
            return isOpen;
        }
    };

    const noiseFiltering = (testFn, failChances) => filtering(noiseFilter(testFn, failChances));
    const motionFilter = noiseFiltering(motionValue => motionValue > 2, 5);

    console.log('');
    console.log('Noise filtering example result =' , reduce(motionFilter(concat), [], [1,3,4,2,7,8,9,10,2,2,1,1,0,0,0,0,0,7,3,4,2,2,1,6]));

    console.log('');
    console.log('--------------------------------------------------------');
    console.log('');

};