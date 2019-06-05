'use strict';

import stateADT from './crocks/state_adt'

export default async () => {
  console.log('"Crocks" library tests');
  console.log('======================');

  await stateADT();

  console.log('');
  console.log('--------------------------------------------------------');
  console.log('');
}