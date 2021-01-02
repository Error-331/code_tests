// external imports
import { forEach, filter} from 'ramda';

// internal imports
import { getCanvasHeight, getCanvasWidth } from './../dom';

import SimpleEnemy1Shot1Class from './simple_enemy1_shot1_class';

import { getRandomInt } from './../helpers/math_helpers';
import { drawTriangle } from './../helpers/draw_helpers';

// implementation
class SimpleEnemy1Class {
    #id = null;
    #isDead = false;

    #x = null;
    #y = null;

    #shots = [];

    constructor() {
        this.#id = `${new Date().getTime().toString()}_${getRandomInt(1, 1000)}`;

        this.#x = parseInt(Math.random() * getCanvasWidth());
        this.#y = -30;
    }

    isReachEnd() {
        return this.#y >= getCanvasHeight() + 40;
    }

    isVisible() {
        return (this.#x > -40 && this.#x < getCanvasWidth() + 40) &&
            (this.#y > -40 && this.#y < getCanvasHeight() + 40);
    }

    isDone() {
        return (this.#isDead || this.isReachEnd()) && this.#shots.length === 0;
    }

    move() {
        if (!this.#isDead && !this.isReachEnd()) {
            this.#x += getRandomInt(-15, 15);
            this.#y += 5;
        }

        return this;
    }

    shot() {
        if (!this.#isDead && !this.isReachEnd()) {
            this.#shots.push(
                new SimpleEnemy1Shot1Class(this.#x, this.#y)
            );
        }

        return this;
    }

    moveShots() {
        this.#shots = filter(shot => !shot.isDone(), this.#shots);
        forEach(shot => shot.move(), this.#shots);

        return this;
    }

    #drawEnemyShots() {
        forEach(shot => shot.draw(), this.#shots);
    }

    #drawEnemy() {
        this.isVisible() ? drawTriangle(this.#x, this.#y, 20, '#00ff00', 'down') : null;
    }

    draw() {
        this.#drawEnemy();
        this.#drawEnemyShots();
    }

    get id() {
        return this.#id;
    }

    get isDead() {
        return this.#isDead;
    }
}

// export
export {
    SimpleEnemy1Class
}

export default SimpleEnemy1Class;
