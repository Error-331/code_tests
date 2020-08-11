'use strict';

// external imports
import { map, startWith } from 'rxjs/operators';
import { identity, memoizeWith } from 'ramda';

// local imports
import { getCanvasHeight, getCanvasWidth } from './dom';
import { getMouseMoveObservable } from './mouse_stream';

// implementation
const getInitialSpaceShipYPos = memoizeWith(identity, () => getCanvasHeight() - 30);
const getSpaceShipObservable = memoizeWith(identity, () => getMouseMoveObservable().pipe(
    map(event => {
        return {
            x: event.clientX,
            y: getInitialSpaceShipYPos()
        }
    }),

    startWith({
        x: getCanvasWidth() / 2,
        y: getInitialSpaceShipYPos()
    })
));

export {
    getInitialSpaceShipYPos,
    getSpaceShipObservable
};
