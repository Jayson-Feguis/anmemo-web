import { put, call, takeLatest } from "redux-saga/effects";
import { accountRequest } from "../../../request/request";
import {
  actions,
  approveAccountAction,
  updateAccountAction,
  deleteAccountAction,
  accountAction,
  restoreAccountAction,
  registerAction,
} from "../../action/account/actions";
import _ from "lodash";
import ROUTES from "../../../routes/Routes";
function* account(act) {
  try {
    const response = yield call(accountRequest.getAccount, act.payload);
    if (!_.isNil(response.data)) {
      yield put(accountAction(actions.ACCOUNT_SUCCESS, response.data));
    }
  } catch (error) {
    yield put(
      accountAction(actions.ACCOUNT_FAILED, error.response.data.message)
    );
  }
}

function* updateAccount(act) {
  try {
    const response = yield call(accountRequest.updateAccount, act.payload);
    if (!_.isNil(response.data)) {
      yield put(
        updateAccountAction(actions.UPDATE_ACCOUNT_SUCCESS, response.data)
      );
    }
  } catch (error) {
    yield put(
      updateAccountAction(
        actions.UPDATE_ACCOUNT_FAILED,
        error.response.data.message
      )
    );
  }
}

function* deleteAccount(act) {
  try {
    const response = yield call(accountRequest.deleteAccount, act.payload);
    if (!_.isNil(response.data)) {
      yield put(
        deleteAccountAction(actions.DELETE_ACCOUNT_SUCCESS, response.data)
      );
    }
  } catch (error) {
    yield put(
      deleteAccountAction(
        actions.DELETE_ACCOUNT_FAILED,
        error.response.data.message
      )
    );
  }
}
function* approveAccount(act) {
  try {
    const response = yield call(accountRequest.approveAccount, act.payload);
    if (!_.isNil(response.data)) {
      yield put(
        approveAccountAction(actions.APPROVE_ACCOUNT_SUCCESS, response.data)
      );
    }
  } catch (error) {
    yield put(
      approveAccountAction(
        actions.APPROVE_ACCOUNT_FAILED,
        error.response.data.message
      )
    );
  }
}

function* restoreAccount(act) {
  try {
    const response = yield call(accountRequest.restoreAccount, act.payload);
    if (!_.isNil(response.data)) {
      yield put(
        restoreAccountAction(actions.RESTORE_ACCOUNT_SUCCESS, response.data)
      );
    }
  } catch (error) {
    yield put(
      restoreAccountAction(
        actions.RESTORE_ACCOUNT_FAILED,
        error.response.data.message
      )
    );
  }
}

function* register(act) {
  try {
    const response = yield call(accountRequest.register, act.payload);
    if (!_.isNil(response.data)) {
      yield put(registerAction(actions.REGISTER_SUCCESS, response.data));
      yield new Promise(() => {
        setTimeout(() => (window.location = ROUTES.ACCOUNT), 1000);
      });
    }
  } catch (error) {
    yield put(
      registerAction(actions.REGISTER_FAILED, error.response.data.message)
    );
  }
}

export function* accountWatcher() {
  yield takeLatest(actions.ACCOUNT_REQUEST, account);
  yield takeLatest(actions.UPDATE_ACCOUNT_REQUEST, updateAccount);
  yield takeLatest(actions.DELETE_ACCOUNT_REQUEST, deleteAccount);
  yield takeLatest(actions.APPROVE_ACCOUNT_REQUEST, approveAccount);
  yield takeLatest(actions.RESTORE_ACCOUNT_REQUEST, restoreAccount);
  yield takeLatest(actions.REGISTER_REQUEST, register);
}
