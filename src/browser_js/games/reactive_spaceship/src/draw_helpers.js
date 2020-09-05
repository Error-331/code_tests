'use strict';

// external imports
import { forEach } from 'ramda';

// local imports
import { SHOOT_SPEED } from './constants';
import { getCanvasContext, getCanvasWidth, getCanvasHeight } from './dom';

import { collision } from './game_object_helpers';

// implementation
const drawTriangle = (x, y, width, color, direction) => {
    const canvasContext = getCanvasContext();

    canvasContext.fillStyle = color;
    canvasContext.beginPath();
    canvasContext.moveTo(x - width, y);

    canvasContext.lineTo(x, direction === 'up' ? y - width : y + width);
    canvasContext.lineTo(x + width, y);
    canvasContext.lineTo(x - width,y);

    canvasContext.fill();
};

const drawStars = (starsData) => {
    const canvasContext = getCanvasContext();

    const canvasWidth = getCanvasWidth();
    const canvasHeight = getCanvasHeight();

    canvasContext.fillStyle = '#000000';
    canvasContext.fillRect(0, 0, canvasWidth, canvasHeight);
    canvasContext.fillStyle = '#ffffff';

    forEach((starData) => {
        canvasContext.fillRect(starData.x, starData.y, starData.size, starData.size);
    }, starsData);
};

const drawSpaceShip = (x, y) => {
    drawTriangle(x, y, 20, '#ff0000', 'up');
};

const drawEnemies = (enemiesData) => {
    forEach((enemyData) => {
        if (!enemyData.isDead) {
            drawTriangle(enemyData.x, enemyData.y, 20, '#00ff00', 'down');
        }
console.log('fff', enemyData.shots);
        forEach(function(shot) {
            shot.y += SHOOT_SPEED;
            drawTriangle(shot.x, shot.y, 5, '#00ffff', 'down');
        }, enemyData.shots);
    }, enemiesData);
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
    drawTriangle,
    drawStars,
    drawSpaceShip,
    drawEnemies,
    drawHeroShots,
};
