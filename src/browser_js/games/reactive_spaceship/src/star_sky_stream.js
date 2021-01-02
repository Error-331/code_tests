// external imports
import { range, interval } from 'rxjs';
import { toArray, map, mergeMap } from 'rxjs/operators';

import { forEach } from 'ramda';

// local imports
import { STAR_SKY_SPEED, STAR_SKY_NUMBER_OF_STARS } from './constants';
import StarClass from './entities/star_class';

// implementation
const starSkyObservable = range(1, STAR_SKY_NUMBER_OF_STARS)
    .pipe(
        map(() => new StarClass()),

        toArray(),

        mergeMap(starArray => {
            return interval(STAR_SKY_SPEED)
                .pipe(
                    map(() => forEach(star => star.move(), starArray))
                )
        })
    );

// exports
export {
    starSkyObservable,
}

export default starSkyObservable;
