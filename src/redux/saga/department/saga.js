import { put, call, takeLatest } from "redux-saga/effects";
import { departmentRequest } from "../../../request/request";
import {
  actions,
  departmentAction,
  addDepartmentAction,
  updateDepartmentAction,
  deleteDepartmentAction,
  restoreDepartmentAction,
} from "../../action/department/actions";
import _ from "lodash";
function* department(act) {
  try {
    const response = yield call(departmentRequest.getDepartment, act.payload);
    if (!_.isNil(response.data)) {
      yield put(departmentAction(actions.DEPARTMENT_SUCCESS, response.data));
    }
  } catch (error) {
    yield put(
      departmentAction(actions.DEPARTMENT_FAILED, error.response.data.message)
    );
  }
}

function* addDepartment(act) {
  try {
    const response = yield call(departmentRequest.addDepartment, act.payload);
    if (!_.isNil(response.data)) {
      yield put(
        addDepartmentAction(actions.ADD_DEPARTMENT_SUCCESS, response.data)
      );
    }
  } catch (error) {
    yield put(
      addDepartmentAction(
        actions.ADD_DEPARTMENT_FAILED,
        error.response.data.message
      )
    );
  }
}

function* updateDepartment(act) {
  try {
    const response = yield call(
      departmentRequest.updateDepartment,
      act.payload
    );
    if (!_.isNil(response.data)) {
      yield put(
        updateDepartmentAction(actions.UPDATE_DEPARTMENT_SUCCESS, response.data)
      );
    }
  } catch (error) {
    yield put(
      updateDepartmentAction(
        actions.UPDATE_DEPARTMENT_FAILED,
        error.response.data.message
      )
    );
  }
}

function* deleteDepartment(act) {
  try {
    const response = yield call(
      departmentRequest.deleteDepartment,
      act.payload
    );
    if (!_.isNil(response.data)) {
      yield put(
        deleteDepartmentAction(actions.DELETE_DEPARTMENT_SUCCESS, response.data)
      );
    }
  } catch (error) {
    yield put(
      deleteDepartmentAction(
        actions.DELETE_DEPARTMENT_FAILED,
        error.response.data.message
      )
    );
  }
}

function* restoreDepartment(act) {
  try {
    const response = yield call(
      departmentRequest.restoreDepartment,
      act.payload
    );
    if (!_.isNil(response.data)) {
      yield put(
        restoreDepartmentAction(
          actions.RESTORE_DEPARTMENT_SUCCESS,
          response.data
        )
      );
    }
  } catch (error) {
    yield put(
      restoreDepartmentAction(
        actions.RESTORE_DEPARTMENT_FAILED,
        error.response.data.message
      )
    );
  }
}

export function* departmentWatcher() {
  yield takeLatest(actions.DEPARTMENT_REQUEST, department);
  yield takeLatest(actions.ADD_DEPARTMENT_REQUEST, addDepartment);
  yield takeLatest(actions.UPDATE_DEPARTMENT_REQUEST, updateDepartment);
  yield takeLatest(actions.DELETE_DEPARTMENT_REQUEST, deleteDepartment);
  yield takeLatest(actions.RESTORE_DEPARTMENT_REQUEST, restoreDepartment);
}
