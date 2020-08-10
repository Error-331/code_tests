'use strict';

// external imports
import { interval } from 'rxjs';
import { scan } from 'rxjs/operators';

// local imports
import { ENEMY_FREQUENCY } from './constants';
import { getCanvasWidth } from './dom';

// implementation
const enemyObservable = interval(ENEMY_FREQUENCY)
    .pipe(
        scan((enemyArray) => {
            const enemy = {
                x: parseInt(Math.random() * getCanvasWidth()),
                y: -30,
            };
            enemyArray.push(enemy);
            return enemyArray;
        }, [])
    );

// exports
export {
    enemyObservable
}
