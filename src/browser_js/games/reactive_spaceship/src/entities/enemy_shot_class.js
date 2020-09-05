// external imports

// internal imports
import {getCanvasWidth} from "../dom";
import {isEnemyObjectVisible} from "../game_object_helpers";

// implementation
class EnemyShotClass {
    x = null;
    y = null;

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

// export
export {
    EnemyShotClass
}

export default EnemyShotClass;
