// external imports

// internal imports
import { getCanvasHeight } from './../dom';
import { drawTriangle } from './../helpers/draw_helpers';

// implementation
class HeroSpaceshipClass {
    static x = 0;
    static y = 0;

    static move(x) {
        this.x = x;
        this.y = getCanvasHeight() - 30;

        return this;
    }

    static draw() {
        drawTriangle(HeroSpaceshipClass.x, HeroSpaceshipClass.y, 20, '#ff0000', 'up');
    }
}

// export
export {
    HeroSpaceshipClass
}

export default HeroSpaceshipClass;
