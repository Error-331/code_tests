'use strict';

// external imports

// local imports
import { getCanvasWidth, getCanvasHeight } from './dom';

// implementation
const collision = (target1, target2) => {
    return (target1.x > target2.x - 20 && target1.x < target2.x + 20) &&
        (target1.y > target2.y - 20 && target1.y < target2.y + 20);
};

const isGameOver = (ship, enemies) => {
    /*return enemies.some(function(enemy) {
        if (collision(ship, enemy)) {
            return true;
        }

        return enemy.shots.some(function(shot) {
            return collision(ship, shot);
        });
    });*/
    return false;
};


// exports
export {
    collision,
    isGameOver
}
