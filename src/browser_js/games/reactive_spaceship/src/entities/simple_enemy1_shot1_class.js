// external imports

// internal imports
import { ENEMY_SHOOT_SPEED } from './../constants';

import { getCanvasHeight } from './../dom';
import { drawTriangle } from './../helpers/draw_helpers';

// implementation
class SimpleEnemy1Shot1Class {
    #x = null;
    #y = null;

    //this.#shots = this.#shots.filter(isEnemyObjectVisible);

    constructor(x, y) {
        this.#x = x;
        this.#y = y;
    }

    isVisible() {
        return this.#y < getCanvasHeight();
    }

    isDone() {
        return !this.isVisible();
    }

    move() {
        this.#y += ENEMY_SHOOT_SPEED;
    }


    draw() {
        this.isVisible() ? drawTriangle(this.#x, this.#y, 5, '#00ffff', 'down') : null;
    }
}

// export
export {
    SimpleEnemy1Shot1Class
}

export default SimpleEnemy1Shot1Class;
