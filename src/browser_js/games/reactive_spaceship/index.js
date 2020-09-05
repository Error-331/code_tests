'use strict';

// external imports
import { sampleTime, takeWhile, mergeMap } from 'rxjs/operators';

// local imports
import { STAR_SKY_SPEED } from './src/constants'

import { initDOM } from './src/dom';
import { drawStars, drawSpaceShip, drawEnemies, drawHeroShots } from './src/draw_helpers';
import { isGameOver } from './src/game_object_helpers';

import { getGameObservable } from './src/game_stream';
import {combineLatest, of} from "rxjs";
import {getEnemyTransformObservableCreator} from './src/enemy_stream';


// implementation
initDOM();

getGameObservable()
    .pipe(
        sampleTime(STAR_SKY_SPEED),
        takeWhile(([starsArray, spaceship, enemiesData]) => isGameOver(spaceship, enemiesData) === false),
        mergeMap(
            ([starsArray, spaceship, enemiesData, heroShotsData]) => {
                return combineLatest(of(starsArray), of(spaceship), getEnemyTransformObservableCreator(enemiesData), of(heroShotsData));
            }
        )
    ) // [starsArray, spaceship, enemiesData, heroShotsData]
    .subscribe({
        next([starsArray, spaceship, enemiesData, heroShotsData]) {
            drawStars(starsArray);
            drawSpaceShip(spaceship.x, spaceship.y);
            drawEnemies(enemiesData);
            drawHeroShots(heroShotsData, enemiesData);
        },
        error(error) { console.error('Error during game cycle: ' + error); },
        complete() { console.log('Game cycle stopped'); }
    });



