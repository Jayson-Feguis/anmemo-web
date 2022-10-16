import { put, call, takeLatest } from "redux-saga/effects";
import { announcementReceiversRequest } from "../../../request/request";
import {
  actions,
  getAnnouncementReceiversAction,
  deleteAnnouncementReceiversAction,
} from "../../action/announcement-receivers/actions";
import _ from "lodash";

function* getAnnouncementReceivers(act) {
  try {
    const response = yield call(
      announcementReceiversRequest.getAnnouncementReceivers,
      act.payload
    );
    if (!_.isNil(response.data)) {
      yield put(
        getAnnouncementReceiversAction(
          actions.GET_ANNOUNCEMENT_RECEIVERS_SUCCESS,
          response.data
        )
      );
    }
  } catch (error) {
    yield put(
      getAnnouncementReceiversAction(
        actions.GET_ANNOUNCEMENT_RECEIVERS_FAILED,
        error.response.data.message
      )
    );
  }
}

function* deleteAnnouncementReceivers(act) {
  try {
    const response = yield call(
      announcementReceiversRequest.deleteAnnouncementReceivers,
      act.payload
    );
    if (!_.isNil(response.data)) {
      yield put(
        deleteAnnouncementReceiversAction(
          actions.DELETE_ANNOUNCEMENT_RECEIVERS_SUCCESS,
          response.data
        )
      );
    }
  } catch (error) {
    yield put(
      deleteAnnouncementReceiversAction(
        actions.DELETE_ANNOUNCEMENT_RECEIVERS_FAILED,
        error.response.data.message
      )
    );
  }
}

export function* announcementReceiversWatcher() {
  yield takeLatest(
    actions.GET_ANNOUNCEMENT_RECEIVERS_REQUEST,
    getAnnouncementReceivers
  );
  yield takeLatest(
    actions.DELETE_ANNOUNCEMENT_RECEIVERS_REQUEST,
    deleteAnnouncementReceivers
  );
}
