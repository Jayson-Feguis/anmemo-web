import { put, call, takeLatest } from "redux-saga/effects";
import { facultyFilesRequest } from "../../../request/request";
import {
  actions,
  getFacultyFilesAction,
  searchFacultyFilesAction,
} from "../../action/faculty-files/actions";
import _ from "lodash";

function* getFacultyFiles(act) {
  try {
    const response = yield call(
      facultyFilesRequest.getFacultyFiles,
      act.payload
    );
    if (!_.isNil(response.data)) {
      yield put(
        getFacultyFilesAction(actions.GET_FACULTY_FILES_SUCCESS, response.data)
      );
    }
  } catch (error) {
    yield put(
      getFacultyFilesAction(
        actions.GET_FACULTY_FILES_FAILED,
        error.response.data.message
      )
    );
  }
}

function* searchFacultyFiles(act) {
  try {
    const response = yield call(
      facultyFilesRequest.searchFacultyFiles,
      act.payload
    );
    if (!_.isNil(response.data)) {
      yield put(
        searchFacultyFilesAction(
          actions.SEARCH_FACULTY_FILES_SUCCESS,
          response.data
        )
      );
    }
  } catch (error) {
    yield put(
      searchFacultyFilesAction(
        actions.SEARCH_FACULTY_FILES_FAILED,
        error.response.data.message
      )
    );
  }
}

export function* facultyFilesWatcher() {
  yield takeLatest(actions.GET_FACULTY_FILES_REQUEST, getFacultyFiles);
  yield takeLatest(actions.SEARCH_FACULTY_FILES_REQUEST, searchFacultyFiles);
}
