'use strict';

// external imports
import { merge } from 'rxjs';
import { sampleTime, timestamp, map, scan, withLatestFrom, startWith, distinctUntilChanged } from 'rxjs/operators';

import { identity, append, filter, pipe, memoizeWith } from 'ramda';

// local imports
import { getMouseClickObservable } from './mouse_stream';
import { getKeyDownObservable } from './keyboard_stream';

import { getInitialSpaceShipYPos, getSpaceShipObservable } from './space_ship_stream';

// implementation
const getPlayerFireObservable = memoizeWith(identity, () => merge(getMouseClickObservable(), getKeyDownObservable())
    .pipe(
        sampleTime(200),
        timestamp()
    ));

const getHeroShotsObservable = memoizeWith(identity, () => getPlayerFireObservable()
    .pipe(
        withLatestFrom(getSpaceShipObservable()),

        map(([shotEvent, spaceShip]) => {
            return {
                timestamp: shotEvent.timestamp,
                x: spaceShip.x
            };
        }),
        distinctUntilChanged((oldShotData, newShotData) => oldShotData.timestamp === newShotData.timestamp),
        scan((shotArray, shot) => {
            return pipe(
                filter(shotData => shotData.y >= 0),
                append({x: shot.x, y: getInitialSpaceShipYPos()})
            )(shotArray);
        }, []),
        startWith([])
    )
);

export {
    getPlayerFireObservable,
    getHeroShotsObservable,
};
