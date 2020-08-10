'use strict';

// external imports
import { combineLatest } from 'rxjs';
import { identity, memoizeWith } from 'ramda';

// local imports
import { starSkyObservable } from './star_sky_stream';
import { getSpaceShipObservable } from './space_ship_stream';
import { enemyObservable } from './enemy_stream';

// implementation
const getGameObservable = memoizeWith(identity, () => combineLatest(
    starSkyObservable,
    getSpaceShipObservable(),
    enemyObservable,
));

export {
    getGameObservable
};
