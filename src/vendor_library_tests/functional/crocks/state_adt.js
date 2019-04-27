'use strict';

// https://egghead.io/courses/redux-and-the-state-adt

import State from 'crocks/State';

import when from 'crocks/logic/when';
import propEq from 'crocks/predicates/propEq';

import prop from 'crocks/Maybe/prop';
import find from 'crocks/Maybe/find';

import map from 'crocks/pointfree/map';
import option from 'crocks/pointfree/option';
import chain from 'crocks/pointfree/chain'

import compose from 'crocks/helpers/compose';
import curry from 'crocks/helpers/curry';
import mapProps from 'crocks/helpers/mapProps';
import composeK from 'crocks/helpers/composeK';
import assign from 'crocks/helpers/assign';

const { modify, get } = State;

export default async () => {
  console.log('"Crocks" library tests (State ADT)');
  console.log('==================================');

  // inc :: Number -> Number
  const inc =
    x => x + 1;

  // dec :: Number -> Number
  const dec =
    x => x - 1;

  // clamp :: (Number, Number) -> Number -> Number
  const clamp = (min, max) =>
    x => Math.min(Math.max(min, x), max);

  // clampAfter :: Number -> Number -> (a -> Number) -> a -> Number
  const clampAfter = curry(
    (min, max, fn) => compose(clamp(min, max), fn)
  );

  // limitMoves :: (a -> Number) -> a -> Number
  const limitMoves =
    clampAfter(0, 8);

  // over :: (Number, Number) -> Number -> Number
  const over = (key, fn) =>
    modify(mapProps({ [key]: fn} ));

  // assignBy :: ((a -> Boolean), Object) -> Object -> Object
  const assignBy = (pred, obj) =>
    when(pred, assign(obj));

  // decLeft :: () -> State AppState ()
  const decLeft = () =>
    over('left', limitMoves(dec));

  // markSelected :: String -> Object -> Object
  const markSelected = id =>
    assignBy(propEq('id', id), { selected: true });

  // incMoves :: () -> State AppState ()
  const incMoves = () =>
    over('moves', limitMoves(inc));

  // applyMove :: () -> State AppState ()
  const applyMove = () =>
    decLeft().chain(incMoves);

  const applyMoveK =
    composeK(incMoves, decLeft);

  // selectCard :: String -> State AppState()
  const selectCard = id =>
    over('cards', map(markSelected(id)));

  // answer :: String -> State AppState ()
  const answer = id =>
    State.of(id)
      .chain(selectCard)
      .chain(applyMove);

  const answerK =
    composeK(applyMove, selectCard);

  // getState :: String -> State Object (Maybe a)
  const getState = key =>
    get(prop(key));

  // getHint :: () -> State AppState Hint
  const getHint = () =>
    getState('hint')
      .map(option({ color: 'unk', shape: 'unk' }));

  // getCard :: String -> State AppState Card
  const getCard = id =>
    getState('cards')
      .map(chain(find(propEq('id', id))))
      .map(option( { id, color: 'unk', shape: 'unk' } ));

  const state = {
    cards: [
      { id: 'green-square', color: 'green', shape: 'square' },
      { id: 'orange-square', color: 'orange', shape: 'square' },
      { id: 'blue-triangle', color: 'blue', 'shape': 'triangle' },
    ],

    hint: {
      color: 'green',
      shape: 'square',
    },

    left: 8,
    moves: 0,
  };

  console.log(decLeft().execWith(state));
  console.log(decLeft().chain(incMoves).chain(decLeft).chain(incMoves).execWith(state));

  console.log(applyMove().execWith(state));

  console.log(applyMoveK().chain(applyMoveK).execWith(state));

  console.log(selectCard('green-square').execWith(state));

  console.log(State.of('green-square').chain(selectCard).execWith(state));

  console.log(answer('green-square').evalWith(state));

  console.log(answer('green-square').execWith(state));

  console.log(getHint().evalWith(state));

  console.log(getCard('green-square').evalWith(state));
  console.log(getCard('yellow-hole').evalWith(state));
  //console.log('c', getCard('green-square').execWith(state));

  console.log('');
  console.log('--------------------------------------------------------');
  console.log('');
};