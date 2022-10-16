import _ from "lodash";

export const actions = {
    UPLOAD_FILE_REQUEST: 'UPLOAD_FILE_REQUEST',
    UPLOAD_FILE_SUCCESS: 'UPLOAD_FILE_SUCCESS',
    UPLOAD_FILE_FAILED:  'UPLOAD_FILE_FAILED',

    GET_DOCUMENT_REQUEST: 'GET_DOCUMENT_REQUEST',
    GET_DOCUMENT_SUCCESS: 'GET_DOCUMENT_SUCCESS',
    GET_DOCUMENT_FAILED:  'GET_DOCUMENT_FAILED',

    SEND_FILE_REQUEST: 'SEND_FILE_REQUEST',
    SEND_FILE_SUCCESS: 'SEND_FILE_SUCCESS',
    SEND_FILE_FAILED:  'SEND_FILE_FAILED',

    DELETE_DOCUMENT_REQUEST: 'DELETE_DOCUMENT_REQUEST',
    DELETE_DOCUMENT_SUCCESS: 'DELETE_DOCUMENT_SUCCESS',
    DELETE_DOCUMENT_FAILED:  'DELETE_DOCUMENT_FAILED',
}

export function uploadFileAction(action, payload) {
    if(_.isEqual(action, actions.UPLOAD_FILE_REQUEST)) {
        return {
            type: actions.UPLOAD_FILE_REQUEST,
            payload
        }
    } else if(_.isEqual(action, actions.UPLOAD_FILE_SUCCESS)) {
        return {
            type: actions.UPLOAD_FILE_SUCCESS,
            payload
        }
    } else {
        return {
            type: actions.UPLOAD_FILE_FAILED,
            payload
        }
    }
}

export function getDocumentAction(action, payload) {
    if(_.isEqual(action, actions.GET_DOCUMENT_REQUEST)) {
        return {
            type: actions.GET_DOCUMENT_REQUEST,
            payload
        }
    } else if(_.isEqual(action, actions.GET_DOCUMENT_SUCCESS)) {
        return {
            type: actions.GET_DOCUMENT_SUCCESS,
            payload
        }
    } else {
        return {
            type: actions.GET_DOCUMENT_FAILED,
            payload
        }
    }
}

export function sendFileAction(action, payload) {
    if(_.isEqual(action, actions.SEND_FILE_REQUEST)) {
        return {
            type: actions.SEND_FILE_REQUEST,
            payload
        }
    } else if(_.isEqual(action, actions.SEND_FILE_SUCCESS)) {
        return {
            type: actions.SEND_FILE_SUCCESS,
            payload
        }
    } else {
        return {
            type: actions.SEND_FILE_FAILED,
            payload
        }
    }
}

export function deleteDocumentAction(action, payload) {
    if(_.isEqual(action, actions.DELETE_DOCUMENT_REQUEST)) {
        return {
            type: actions.DELETE_DOCUMENT_REQUEST,
            payload
        }
    } else if(_.isEqual(action, actions.DELETE_DOCUMENT_SUCCESS)) {
        return {
            type: actions.DELETE_DOCUMENT_SUCCESS,
            payload
        }
    } else {
        return {
            type: actions.DELETE_DOCUMENT_FAILED,
            payload
        }
    }
}
