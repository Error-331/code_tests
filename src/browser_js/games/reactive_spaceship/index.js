'use strict';

// external imports

// local imports
import { initDOM } from './src/dom';
import { drawStars, drawSpaceShip, drawEnemies } from './src/draw_helpers';

import { getGameObservable } from './src/game_stream';

// implementation
initDOM();

getGameObservable()
    .subscribe({
        next([starsArray, spaceship, enemiesData]) {
            drawStars(starsArray);
            drawSpaceShip(spaceship.x, spaceship.y);
            console.log('ff', enemiesData);
            drawEnemies(enemiesData);
        },
        error(error) { console.error('Error during game cycle: ' + error); },
        complete() { console.log('Game cycle stopped'); }
    });



