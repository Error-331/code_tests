// external imports
import { map } from 'rxjs/operators';
import { identity, memoizeWith } from 'ramda';

// local imports
import { getMouseMoveObservable } from './mouse_stream';

import HeroSpaceshipClass from './entities/hero_spaceship_class';

// implementation
const getSpaceShipObservable = memoizeWith(identity, () => getMouseMoveObservable().pipe(
    map(event => {
        return HeroSpaceshipClass.move(event.clientX);
    }),
));

// export
export {
    getSpaceShipObservable
};

export default getSpaceShipObservable;
