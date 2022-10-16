import { put, call, takeLatest } from "redux-saga/effects";
import { announcementRequest } from "../../../request/request";
import {
  actions,
  getAnnouncementAction,
  addAnnouncementAction,
  updateAnnouncementAction,
  deleteAnnouncementAction,
} from "../../action/announcement/actions";
import _ from "lodash";

function* getAnnouncement(act) {
  try {
    const response = yield call(
      announcementRequest.getAnnouncement,
      act.payload
    );
    if (!_.isNil(response.data)) {
      yield put(
        getAnnouncementAction(actions.GET_ANNOUNCEMENT_SUCCESS, response.data)
      );
    }
  } catch (error) {
    yield put(
      getAnnouncementAction(
        actions.GET_ANNOUNCEMENT_FAILED,
        error.response.data.message
      )
    );
  }
}

function* addAnnouncement(act) {
  try {
    const response = yield call(
      announcementRequest.addAnnouncement,
      act.payload
    );
    if (!_.isNil(response.data)) {
      yield put(
        addAnnouncementAction(actions.ADD_ANNOUNCEMENT_SUCCESS, response.data)
      );
    }
  } catch (error) {
    yield put(
      addAnnouncementAction(
        actions.ADD_ANNOUNCEMENT_FAILED,
        error.response.data.message
      )
    );
  }
}

function* updateAnnouncement(act) {
  try {
    const response = yield call(
      announcementRequest.updateAnnouncement,
      act.payload
    );
    if (!_.isNil(response.data)) {
      yield put(
        updateAnnouncementAction(
          actions.UPDATE_ANNOUNCEMENT_SUCCESS,
          response.data
        )
      );
    }
  } catch (error) {
    yield put(
      updateAnnouncementAction(
        actions.UPDATE_ANNOUNCEMENT_FAILED,
        error.response.data.message
      )
    );
  }
}

function* deleteAnnouncement(act) {
  try {
    const response = yield call(
      announcementRequest.deleteAnnouncement,
      act.payload
    );
    if (!_.isNil(response.data)) {
      yield put(
        deleteAnnouncementAction(
          actions.DELETE_ANNOUNCEMENT_SUCCESS,
          response.data
        )
      );
    }
  } catch (error) {
    yield put(
      deleteAnnouncementAction(
        actions.DELETE_ANNOUNCEMENT_FAILED,
        error.response.data.message
      )
    );
  }
}

export function* announcementWatcher() {
  yield takeLatest(actions.GET_ANNOUNCEMENT_REQUEST, getAnnouncement);
  yield takeLatest(actions.ADD_ANNOUNCEMENT_REQUEST, addAnnouncement);
  yield takeLatest(actions.UPDATE_ANNOUNCEMENT_REQUEST, updateAnnouncement);
  yield takeLatest(actions.DELETE_ANNOUNCEMENT_REQUEST, deleteAnnouncement);
}
