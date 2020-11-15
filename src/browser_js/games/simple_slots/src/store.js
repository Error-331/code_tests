'use strict';

// external imports
import { is, ifElse, append, keys, init, last, forEach, hasPath, path, pipe, curry, clone } from 'ramda';

// local imports

// implementation
const blockLayoutSubState = {
    visibility: 1,
    disabled: false,

    x: 0,
    y: 0,
};

const animationSubState = {

};

const startButtonInitialState = {
    layout: clone(blockLayoutSubState),

    data: {
        caption: 'stop',
    }
};

const stopButtonInitialState = {
    visibility: 1,
    disabled: true,
    caption: 'stop',
};

const reelInitialState = {
    size: 3,
    stateId: 0, // stopped

    signId: 1,
    speed: 0,

    isModified: false,
};

let state = {};

const resetStatePortion = curry((pathToProp, initialStateForPath, currentState) => {
    return ifElse(
        hasPath(pathToProp),

        pipe(
            path(init(pathToProp)),
            currentState => {
                const lastKey = last(pathToProp);

                return pipe(
                    keys,
                    forEach(initialStateKey => {
                        return ifElse(
                            is(Object),
                            initialSubState => resetStatePortion(append(initialStateKey, pathToProp), initialSubState, state),
                            initialSubState => currentState[lastKey][initialStateKey] = initialSubState,
                        )(initialStateForPath[initialStateKey])
                    })
                )(initialStateForPath)
            }
        ),

        pipe(
            path(init(pathToProp)),
            currentState => currentState[last(pathToProp)] = clone(initialStateForPath)
        )
    )(currentState);
});

const resetStartButton = resetStatePortion(
    ['startButton'],
    startButtonInitialState
);

const resetStopButton = resetStatePortion(
    ['stopButton'],
    stopButtonInitialState
);

const resetReel1State = resetStatePortion(
    ['reel1'],
    reelInitialState
);

const resetReel2State = resetStatePortion(
    ['reel2'],
    reelInitialState
);

const resetReel3State = resetStatePortion(
    ['reel3'],
    reelInitialState
);

const resetReel4State = resetStatePortion(
    ['reel4'],
    reelInitialState
);

const resetState = () => {
    resetStartButton(state);
    resetStopButton(state);

    resetReel1State(state);
    resetReel2State(state);
    resetReel3State(state);
    resetReel4State(state);
};

const getRefToState = () => state;

// exports
export {
    getRefToState,
    resetState,
};

