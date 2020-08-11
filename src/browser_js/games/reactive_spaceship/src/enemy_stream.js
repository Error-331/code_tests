'use strict';

// external imports
import { interval } from 'rxjs';
import { scan } from 'rxjs/operators';

import { identity, append, filter, pipe, memoizeWith, last } from 'ramda';

// local imports
import { ENEMY_FREQUENCY, ENEMY_SHOOT_FREQUENCY } from './constants';
import { getCanvasWidth } from './dom';

import { isEnemyObjectVisible } from './game_object_helpers';

// implementation
const getEnemyObservable = memoizeWith(identity, () => interval(ENEMY_FREQUENCY)
    .pipe(
        scan(enemiesData => {
            return pipe(
                filter(
                    pipe(
                        isEnemyObjectVisible,
                        (enemyData) => {
                            return !(enemyData.isDead && enemyData.shots.length === 0);
                        }
                    )
                ),
                append({
                    x: parseInt(Math.random() * getCanvasWidth()),
                    y: -30,
                    shots: [],
                }),

                (currentEnemiesData) => {
                    interval(ENEMY_SHOOT_FREQUENCY).subscribe(() => {
                        const lastEnemy = last(currentEnemiesData);

                        if (!lastEnemy.isDead) {
                            lastEnemy.shots.push({ x: lastEnemy.x, y: lastEnemy.y });
                        }

                        lastEnemy.shots = lastEnemy.shots.filter(isEnemyObjectVisible);
                    });

                    return currentEnemiesData;
                }
            )(enemiesData);
        }, [])
    ));

// exports
export {
    getEnemyObservable
}
