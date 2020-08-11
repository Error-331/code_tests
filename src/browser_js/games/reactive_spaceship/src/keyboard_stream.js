'use strict';

// external imports
import { fromEvent } from 'rxjs';
import { filter } from 'rxjs/operators';

import { identity, memoizeWith } from 'ramda';

// local imports
import { getCanvasElement } from './dom';

// implementation
const getKeyDownObservable = memoizeWith(identity, () => fromEvent(document, 'keydown').pipe(filter(event => event.keyCode === 32)));

// exports
export {
    getKeyDownObservable,
};
