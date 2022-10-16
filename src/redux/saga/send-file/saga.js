import { put, call, takeLatest } from "redux-saga/effects";
import { sendFileRequest } from "../../../request/request";
import { actions, uploadFileAction, getDocumentAction, sendFileAction, deleteDocumentAction } from "../../action/send-file/actions";
import _ from "lodash";

function* uploadFile(act) {
    try {
        const response = yield call(sendFileRequest.uploadFile, act.payload);
        if(!_.isNil(response.data)) {
            yield put(uploadFileAction(actions.UPLOAD_FILE_SUCCESS, response.data))
        }
    } catch(error) {
        yield put(uploadFileAction(actions.UPLOAD_FILE_FAILED, error.response.data.message));
    }
}

function* getDocument(act) {
    try {
        const response = yield call(sendFileRequest.getDocument, act.payload);
        if(!_.isNil(response.data)) {
            yield put(getDocumentAction(actions.GET_DOCUMENT_SUCCESS, response.data))
        }
    } catch(error) {
        yield put(getDocumentAction(actions.GET_DOCUMENT_FAILED, error.response.data.message));
    }
}

function* sendFile(act) {
    try {
        const response = yield call(sendFileRequest.sendFile, act.payload);
        if(!_.isNil(response.data)) {
            yield put(sendFileAction(actions.SEND_FILE_SUCCESS, response.data))
        }
    } catch(error) {
        yield put(sendFileAction(actions.SEND_FILE_FAILED, error.response.data.message));
    }
}

function* deleteDocument(act) {
    try {
        const response = yield call(sendFileRequest.deleteDocument, act.payload);
        if(!_.isNil(response.data)) {
            yield put(deleteDocumentAction(actions.DELETE_DOCUMENT_SUCCESS, response.data))
        }
    } catch(error) {
        yield put(deleteDocumentAction(actions.DELETE_DOCUMENT_FAILED, error.response.data.message));
    }
}

export function* sendFileWatcher() {
    yield takeLatest(actions.UPLOAD_FILE_REQUEST, uploadFile);
    yield takeLatest(actions.GET_DOCUMENT_REQUEST, getDocument);
    yield takeLatest(actions.SEND_FILE_REQUEST, sendFile);
    yield takeLatest(actions.DELETE_DOCUMENT_REQUEST, deleteDocument);
}