import { put, call, takeLatest } from "redux-saga/effects";
import { userRequest } from "../../../request/request";
import {
  actions,
  loginAction,
  registerAction,
  emailAction,
  resetAction,
} from "../../action/user/actions";
import _ from "lodash";
import ROUTES from "../../../routes/Routes";

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

function* register(act) {
  try {
    const response = yield call(userRequest.register, act.payload);
    if (!_.isNil(response.data)) {
      yield put(registerAction(actions.REGISTER1_SUCCESS, response.data));
      yield new Promise(() => {
        setTimeout(() => (window.location = ROUTES.ACCOUNT), 1000);
      });
    }
  } catch (error) {
    yield put(
      registerAction(actions.REGISTER1_FAILED, error.response.data.message)
    );
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
  yield takeLatest(actions.REGISTER1_REQUEST, register);
  yield takeLatest(actions.EMAIL_REQUEST, emailGet);
  yield takeLatest(actions.RESET_REQUEST, resetPassword);
  yield takeLatest(actions.LOGOUT2_REQUEST, logout2);
}
