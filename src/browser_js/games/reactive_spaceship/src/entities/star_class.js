// external imports

// internal imports
import { getCanvasHeight, getCanvasWidth } from './../dom';
import { drawRectangle } from './../helpers/draw_helpers';

// implementation
class StarClass {
    #x = null;
    #y = null;

    #size = null;

    constructor() {
        this.#x = parseInt(Math.random() * getCanvasWidth());
        this.#y = parseInt(Math.random() * getCanvasHeight());

        this.#size = Math.random() * 3 + 1;
    }

    move() {
        if (this.#y > getCanvasHeight()) {
            this.#y = 0
        } else {
            this.#y += 3;
        }

        return this;
    }

    draw() {
        drawRectangle(this.#x, this.#y, this.#size, this.#size, '#ffffff');
    }
}

// export
export {
    StarClass
}

export default StarClass;
