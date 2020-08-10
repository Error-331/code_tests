'use strict';

// external imports
import { range, interval } from 'rxjs';
import { toArray, map, mergeMap } from 'rxjs/operators';

import { always, pipe, gt, ifElse, prop, addIndex, forEach, assoc, lens, view, over } from 'ramda';

// local imports
import { STAR_SKY_SPEED, STAR_SKY_NUMBER_OF_STARS } from './constants';
import { getCanvasWidth, getCanvasHeight } from './dom';

// implementation
const starYLens = lens(prop('y'), assoc('y'));

const starSkyObservable = range(1, STAR_SKY_NUMBER_OF_STARS)
    .pipe(
        map(() => {
            return {
                x: parseInt(Math.random() * getCanvasWidth()),
                y: parseInt(Math.random() * getCanvasHeight()),
                size: Math.random() * 3 + 1
            };
        }),
        toArray(),

        mergeMap(starArray => {
            return interval(STAR_SKY_SPEED)
                .pipe(
                    map(() => {
                        /*

                        starArray.forEach(function(star) {
                            if (star.y >= canvas.height) {
                                star.y = 0; // Reset star to top of the screen
                            }

                            star.y += 3; // Move star
                        });

                        return starArray;

                         */

                        return addIndex(forEach)((starData, starIndex) => {
                            starArray[starIndex] = ifElse(
                                pipe(
                                    view(starYLens),
                                    gt(getCanvasHeight())
                                ),
                                over(starYLens, y => y + 3),
                                over(starYLens, always(0)),
                            )(starData);
                        }, starArray)
                    })
                )
        })
    );

// exports
export {
    starYLens,
    starSkyObservable,
}
