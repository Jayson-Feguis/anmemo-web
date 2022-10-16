import { put, call, takeLatest } from "redux-saga/effects";
import { audtiRequest } from "../../../request/request";
import { actions, auditAction } from "../../action/audit/actions";
import _ from "lodash";
function* audit(act) {
  try {
    const response = yield call(audtiRequest.getAudit, act.payload);
    if (!_.isNil(response.data)) {
      yield put(auditAction(actions.AUDIT_SUCCESS, response.data));
    }
  } catch (error) {
    yield put(auditAction(actions.AUDIT_FAILED, error.response.data.message));
  }
}

export function* auditWatcher() {
  yield takeLatest(actions.AUDIT_REQUEST, audit);
}
