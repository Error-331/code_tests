'use strict';

// external imports
import { fromEvent } from 'rxjs';
import { identity, memoizeWith } from 'ramda';

// local imports
import { getCanvasElement } from './dom';

// implementation
const getMouseMoveObservable = memoizeWith(identity, () => fromEvent(getCanvasElement(), 'mousemove'));
const getMouseClickObservable = memoizeWith(identity, () => fromEvent(getCanvasElement(), 'click'));

// exports
export {
    getMouseMoveObservable,
    getMouseClickObservable,
};
