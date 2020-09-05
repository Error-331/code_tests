// external imports

// internal imports
import {getCanvasWidth} from "../dom";
import {isEnemyObjectVisible} from "../game_object_helpers";

import { EnemyShotClass } from './enemy_shot_class';

// implementation
class EnemyClass {
    isDead = null;

    x = null;
    y = null;

    shots = [];

    shotsGeneratorObservables = [];

    constructor() {
        this.isDead = false;

        this.x = parseInt(Math.random() * getCanvasWidth());
        this.y = -30;
    }

    addShotsGeneratorObservable(shotsGeneratorObservable) {
        this.shotsGeneratorObservables.push(shotsGeneratorObservable);
    }

    shot() {
        this.shots.push(new EnemyShotClass(this.x, this.y));
    }

    next() {
        if (!this.isDead) {
            this.shot();
        }

       // this.shots = this.shots.filter(isEnemyObjectVisible);
    }
}

// export
export {
    EnemyClass
}

export default EnemyClass;
