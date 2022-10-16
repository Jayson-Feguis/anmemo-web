import { put, call, takeLatest } from "redux-saga/effects";
import { archiveRequest } from "../../../request/request";
import {
  actions,
  archiveAction,
  restoreAccountAction,
} from "../../action/archive/actions";
import _ from "lodash";
function* archive(act) {
  try {
    const response = yield call(archiveRequest.getArchive, act.payload);
    console.log(response);
    if (!_.isNil(response.data)) {
      yield put(archiveAction(actions.ARCHIVE_SUCCESS, response.data));
    }
  } catch (error) {
    yield put(
      archiveAction(actions.ARCHIVE_FAILED, error.response.data.message)
    );
  }
}

function* restoreAccount(act) {
  try {
    const response = yield call(archiveRequest.restoreAccount, act.payload);
    if (!_.isNil(response.data)) {
      yield put(
        restoreAccountAction,
        (actions.RESTORE1_ACCOUNT_SUCCESS, response.data)
      );
    }
  } catch (error) {
    yield put(
      restoreAccountAction,
      (actions.RESTORE1_ACCOUNT_FAILED, error.response.data.message)
    );
  }
}

export function* archiveWatcher() {
  yield takeLatest(actions.ARCHIVE_REQUEST, archive);
  yield takeLatest(actions.RESTORE1_ACCOUNT_REQUEST, restoreAccount);
}
