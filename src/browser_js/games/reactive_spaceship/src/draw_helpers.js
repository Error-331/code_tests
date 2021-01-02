'use strict';

// external imports
import { forEach } from 'ramda';

// local imports
import { getCanvasContext, getCanvasWidth, getCanvasHeight } from './dom';

import { collision } from './game_object_helpers';

// implementation


const drawSpaceShip = (x, y) => {
    drawTriangle(x, y, 20, '#ff0000', 'up');
};



const drawHeroShots = (heroShotsData, enemiesData) => {
    forEach((shotData) => {
        for (var l=0; l < enemiesData.length; l++) {
            var enemy = enemiesData[l];
            if (!enemy.isDead && collision(shotData, enemy)) {
                enemy.isDead = true;
                shotData.x = shotData.y = -100;
                break;
            }
        }

        shotData.y -= SHOOT_SPEED;
        drawTriangle(shotData.x, shotData.y, 5, '#ffff00', 'up');
    }, heroShotsData);
};

// exports
export {
    drawSpaceShip,
    drawHeroShots,
};
