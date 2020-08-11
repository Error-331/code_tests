'use strict';

// external imports
import { interval } from 'rxjs';
import { scan } from 'rxjs/operators';

import { identity, append, filter, pipe, memoizeWith } from 'ramda';

// local imports
import { ENEMY_FREQUENCY } from './constants';
import { getCanvasWidth, getCanvasHeight } from './dom';

// implementation
const getEnemyObservable = memoizeWith(identity, () => interval(ENEMY_FREQUENCY)
    .pipe(
        scan(enemiesData => {
            return pipe(
                filter(enemyData => enemyData.y < getCanvasHeight()),
                append({
                    x: parseInt(Math.random() * getCanvasWidth()),
                    y: -30,
                })
            )(enemiesData);
        }, [])
    ));

// exports
export {
    getEnemyObservable
}
