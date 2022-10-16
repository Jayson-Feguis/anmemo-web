import { put, call, takeLatest } from "redux-saga/effects";
import { documentReceiversRequest } from "../../../request/request";
import {
  actions,
  getDocumentReceiversAction,
  deleteDocumentReceiversAction,
} from "../../action/document-receivers/actions";
import _ from "lodash";

function* getDocumentReceivers(act) {
  try {
    const response = yield call(
      documentReceiversRequest.getDocumentReceivers,
      act.payload
    );
    if (!_.isNil(response.data)) {
      yield put(
        getDocumentReceiversAction(
          actions.GET_DOCUMENT_RECEIVERS_SUCCESS,
          response.data
        )
      );
    }
  } catch (error) {
    yield put(
      getDocumentReceiversAction(
        actions.GET_DOCUMENT_RECEIVERS_FAILED,
        error.response.data.message
      )
    );
  }
}

function* deleteDocumentReceivers(act) {
  try {
    const response = yield call(
      documentReceiversRequest.deleteDocumentReceivers,
      act.payload
    );
    if (!_.isNil(response.data)) {
      yield put(
        deleteDocumentReceiversAction(
          actions.DELETE_DOCUMENT_RECEIVERS_SUCCESS,
          response.data
        )
      );
    }
  } catch (error) {
    yield put(
      deleteDocumentReceiversAction(
        actions.DELETE_DOCUMENT_RECEIVERS_FAILED,
        error.response.data.message
      )
    );
  }
}

export function* documentReceiversWatcher() {
  yield takeLatest(
    actions.GET_DOCUMENT_RECEIVERS_REQUEST,
    getDocumentReceivers
  );
  yield takeLatest(
    actions.DELETE_DOCUMENT_RECEIVERS_REQUEST,
    deleteDocumentReceivers
  );
}
