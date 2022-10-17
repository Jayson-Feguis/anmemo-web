import { put, call, takeLatest } from "redux-saga/effects";
import { userRequest } from "../../../request/request";
import {
  actions,
  loginAction,
  emailAction,
  resetAction,
} from "../../action/user/actions";
import _ from "lodash";

function* login(act) {
  try {
    const response = yield call(userRequest.login, act.payload);
    if (!_.isNil(response.data)) {
      yield put(loginAction(actions.LOGIN_SUCCESS, response.data));
    }
  } catch (error) {
    yield put(loginAction(actions.LOGIN_FAILED, error.response.data.message));
  }
}

function* logout2(act) {
  try {
    const response = yield call(userRequest.logout2, act.payload);
    if (!_.isNil(response.data)) {
      yield put(loginAction(actions.LOGOUT2_SUCCESS, response.data));
    }
  } catch (error) {
    yield put(loginAction(actions.LOGOUT2_FAILED, error.response.data.message));
  }
}

function* emailGet(act) {
  try {
    const response = yield call(userRequest.getemail, act.payload);
    if (!_.isNil(response.data)) {
      yield put(emailAction(actions.EMAIL_SUCCESS, response.data));
    }
  } catch (error) {
    yield put(emailAction(actions.EMAIL_FAILED, error.response.data.message));
  }
}

function* resetPassword(act) {
  try {
    const response = yield call(userRequest.resetpass, act.payload);
    if (!_.isNil(response.data)) {
      yield put(resetAction(actions.RESET_SUCCESS, response.data));
    }
  } catch (error) {
    yield put(resetAction(actions.RESET_FAILED, error.response.data.message));
  }
}
export function* userWatcher() {
  yield takeLatest(actions.LOGIN_REQUEST, login);
  yield takeLatest(actions.EMAIL_REQUEST, emailGet);
  yield takeLatest(actions.RESET_REQUEST, resetPassword);
  yield takeLatest(actions.LOGOUT2_REQUEST, logout2);
}
