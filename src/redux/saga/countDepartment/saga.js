import { put, call, takeLatest } from "redux-saga/effects";
import { countDepartmentRequest } from "../../../request/request";
import {
  actions,
  departmentActionCount,
} from "../../action/countDepartment/actions";
import _ from "lodash";

function* departmentCount(act) {
  try {
    const response = yield call(
      countDepartmentRequest.getDepartmentCount,
      act.payload
    );
    if (!_.isNil(response.data)) {
      yield put(
        departmentActionCount(actions.COUNT_DEPARTMENT_SUCCESS, response.data)
      );
    }
  } catch (error) {
    yield put(
      departmentActionCount(
        actions.COUNT_DEPARTMENT_FAILED,
        error.response.data.message
      )
    );
  }
}

export function* countdepartmentWatcher() {
  yield takeLatest(actions.COUNT_DEPARTMENT_REQUEST, departmentCount);
}
