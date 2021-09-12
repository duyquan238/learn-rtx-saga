import { PayloadAction } from '@reduxjs/toolkit';
import { call, delay, fork, put, take } from '@redux-saga/core/effects';
import { authActions, LoginPayload } from './authSlice';
import { push } from 'connected-react-router';

function* handleLogin(payload: LoginPayload) {
  try {
    yield delay(1000);
    localStorage.setItem('access_token', 'abc');
    yield put(
      authActions.loginSuccess({
        id: 1,
        name: 'Easy frontend',
      })
    );
    //Put is used to dispatch an action
    yield put(push('/admin/dashboard'));
  } catch (error: any) {
    yield put(authActions.loginFailed(error.message));
  }
}
function* handleLogout() {
  yield delay(500);
  localStorage.removeItem('access_token');
  yield put(push('/login'));
}

function* watchLoginFlow() {
  while (true) {
    const isLoggedIn = Boolean(localStorage.getItem('access_token'));
    // use call instead of fork because we want to wait handle logout or login done before continue handle the other
    if (isLoggedIn) {
      yield take(authActions.logout.type);
      yield call(handleLogout);
    } else {
      const action: PayloadAction<LoginPayload> = yield take(authActions.login.type);
      yield call(handleLogin, action.payload);
    }
  }
}

export function* authSaga() {
  yield fork(watchLoginFlow);
}
