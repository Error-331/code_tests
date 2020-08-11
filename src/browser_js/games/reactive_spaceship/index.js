'use strict';

// external imports
import { sampleTime } from 'rxjs/operators';

// local imports
import { STAR_SKY_SPEED } from './src/constants'

import { initDOM } from './src/dom';
import { drawStars, drawSpaceShip, drawEnemies, drawHeroShots } from './src/draw_helpers';

import { getGameObservable } from './src/game_stream';

// implementation
initDOM();

getGameObservable()
    .pipe(
        sampleTime(STAR_SKY_SPEED)
    )
    .subscribe({
        next([starsArray, spaceship, enemiesData, heroShotsData]) {
            drawStars(starsArray);
            drawSpaceShip(spaceship.x, spaceship.y);
            drawEnemies(enemiesData);
            drawHeroShots(heroShotsData);
        },
        error(error) { console.error('Error during game cycle: ' + error); },
        complete() { console.log('Game cycle stopped'); }
    });



