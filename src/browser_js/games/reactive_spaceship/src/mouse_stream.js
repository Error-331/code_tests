'use strict';

// external imports
import { fromEvent } from 'rxjs';
import { identity, memoizeWith } from 'ramda';

// local imports
import { getCanvasElement } from './dom';

// implementation
const getMouseMoveObservable = memoizeWith(identity, () => fromEvent(getCanvasElement(), 'mousemove'));

// exports
export {
    getMouseMoveObservable
};
