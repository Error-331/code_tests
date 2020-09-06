'use strict';

// external imports
import { interval, of, timer } from 'rxjs';
import { scan, map as rxMap, switchMap } from 'rxjs/operators';

import { identity, append, filter, map, pipe, memoizeWith, last } from 'ramda';

// local imports
import { ENEMY_FREQUENCY, ENEMY_SHOOT_FREQUENCY } from './constants';
import EnemyClass from './entities/enemy_class';
import { getCanvasWidth } from './dom';

import { isEnemyObjectVisible } from './game_object_helpers';

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// implementation
const getEnemyObservable = memoizeWith(identity, () =>
    interval(ENEMY_FREQUENCY)
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
                    isDead: false,
                    x: parseInt(Math.random() * getCanvasWidth()),
                    y: -30,
                    shots: [],
                    id: Date.now()
                }),

                c => {
                    console.log('num', JSON.stringify(c));
                    return c;
                }
            )(enemiesData);
        }, []),

        switchMap(
            currentEnemiesData => {
                const lastEnemy = last(currentEnemiesData);

                return timer(0, ENEMY_SHOOT_FREQUENCY).pipe(rxMap(i => {
                    if (!lastEnemy.isDead) {
                        lastEnemy.shots.push({ x: lastEnemy.x, y: lastEnemy.y });
                    }

                    lastEnemy.shots = lastEnemy.shots.filter(isEnemyObjectVisible);


                    return currentEnemiesData;
                }))
            }
        ),
    ));

const getEnemyTransformObservableCreator = (enemiesData) =>
    of(enemiesData)
        .pipe(
            rxMap(map(enemyData => {
                enemyData.y += 5;
                enemyData.x += getRandomInt(-15, 15);

                return enemyData;
            })),
        );


// exports
export {
    getEnemyObservable,
    getEnemyTransformObservableCreator,
}
