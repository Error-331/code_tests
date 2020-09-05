'use strict';

// external imports
import { interval, of } from 'rxjs';
import { scan, map as rxMap, mergeMapTo } from 'rxjs/operators';

import { identity, append, filter, map, pipe, memoizeWith, last } from 'ramda';

// local imports
import { ENEMY_FREQUENCY, ENEMY_SHOOT_FREQUENCY } from './constants';
import EnemyShotClass from './entities/enemy_class';
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
                append(new EnemyShotClass()),
                (currentEnemiesData) => {
                    const lastEnemy = last(currentEnemiesData);
                    const shootGeneratorObservable = interval(ENEMY_SHOOT_FREQUENCY).subscribe(lastEnemy);

                    lastEnemy.addShotsGeneratorObservable(shootGeneratorObservable);

                    return currentEnemiesData;
                }
            )(enemiesData);
        }, []),
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
