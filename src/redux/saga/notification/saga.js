import { put, call, takeLatest } from "redux-saga/effects";
import { notificationRequest } from "../../../request/request";
import { actions, getNotificationAction, updateNotificationAction, deleteNotificationAction } from "../../action/notification/actions";
import _ from "lodash";

function* getNotification(act) {
    try {
        const response = yield call(notificationRequest.getNotification, act.payload);
        if(!_.isNil(response.data)) {
            yield put(getNotificationAction(actions.GET_NOTIFICATION_SUCCESS, response.data))
        }
    } catch(error) {
        yield put(getNotificationAction(actions.GET_NOTIFICATION_FAILED, error.response.data.message));
    }
}

function* updateNotification(act) {
    try {
        const response = yield call(notificationRequest.updateNotification, act.payload);
        if(!_.isNil(response.data)) {
            yield put(updateNotificationAction(actions.UPDATE_NOTIFICATION_SUCCESS, response.data))
        }
    } catch(error) {
        yield put(updateNotificationAction(actions.UPDATE_NOTIFICATION_FAILED, error.response.data.message));
    }
}

function* deleteNotification(act) {
    try {
        const response = yield call(notificationRequest.deleteNotification, act.payload);
        if(!_.isNil(response.data)) {
            yield put(deleteNotificationAction(actions.DELETE_NOTIFICATION_SUCCESS, response.data))
        }
    } catch(error) {
        yield put(deleteNotificationAction(actions.DELETE_NOTIFICATION_FAILED, error.response.data.message));
    }
}

export function* notificationWatcher() {
    yield takeLatest(actions.GET_NOTIFICATION_REQUEST, getNotification);
    yield takeLatest(actions.UPDATE_NOTIFICATION_REQUEST, updateNotification);
    yield takeLatest(actions.DELETE_NOTIFICATION_REQUEST, deleteNotification);
}