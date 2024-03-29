import { delay, put, takeEvery } from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { incrementSaga, incrementSuccess } from './counterSlice';

// export function* log(action: PayloadAction) {
//   console.log('Log', action);
// }

function* handleIncrementSaga(action: PayloadAction<number>) {
  console.log('Waiting 2s');
  //wait 2s
  yield delay(2000);
  console.log('Waiting done and dispatch action');
  //dispatch action
  yield put(incrementSuccess(action.payload));
}

export default function* counterSaga() {
  console.log('Counter Saga');
  yield takeEvery(incrementSaga.toString(), handleIncrementSaga);
}
