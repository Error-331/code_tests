// external imports
import { of, interval, timer,  merge } from 'rxjs';
import { scan, map as rxMap, mergeMap, mergeAll, tap, takeWhile  } from 'rxjs/operators';

import { identity, filter, memoizeWith, propEq, findIndex, remove } from 'ramda';

// local imports
import { ENEMY_FREQUENCY, ENEMY_MOVE_FREQUENCY, ENEMY_SHOOT_FREQUENCY, ENEMY_SHOT_MOVE_FREQUENCY } from './constants';

import SimpleEnemy1Class from './entities/simple_enemy1_class';

// implementation
const getEnemyObservable = memoizeWith(identity, () =>
    interval(ENEMY_FREQUENCY)
    .pipe(
        rxMap(
            () =>
                of(new SimpleEnemy1Class())
                    .pipe(
                        mergeMap(
                            (enemy) =>
                                merge(
                                    interval(ENEMY_MOVE_FREQUENCY)
                                        .pipe(
                                            rxMap(() => enemy.move())
                                        ),
                                    interval(ENEMY_SHOT_MOVE_FREQUENCY)
                                        .pipe(
                                            rxMap(() => enemy.moveShots())
                                        ),
                                    timer(0, ENEMY_SHOOT_FREQUENCY)
                                        .pipe(
                                            rxMap(() => this.shot())
                                        )
                                )
                        ))
                    .pipe(
                        takeWhile(enemy => !enemy.isDone())
                    )
        ),

        mergeAll(),

        scan((enemiesData, enemyData) => {
            const enemyIndex = findIndex(propEq('id', enemyData.id))(enemiesData);

            if (enemyIndex !== -1) {
                if (enemyData.isDone()) {
                    enemiesData = remove(enemyIndex, 1, acc);
                } else {
                    enemiesData[enemyIndex] = enemyData;
                }
            } else {
                enemiesData.push(enemyData)
            }

            return filter((enemiesData) => !enemiesData.isDone(), enemiesData);
        }, []),

       tap(f => console.log('fff', f))

    ));

// exports
export {
    getEnemyObservable,
}

export default getEnemyObservable;
