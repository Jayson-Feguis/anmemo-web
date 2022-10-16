import _ from "lodash";

export const actions = {
    GET_NOTIFICATION_REQUEST: 'GET_NOTIFICATION_REQUEST',
    GET_NOTIFICATION_SUCCESS: 'GET_NOTIFICATION_SUCCESS',
    GET_NOTIFICATION_FAILED:  'GET_NOTIFICATION_FAILED',

    UPDATE_NOTIFICATION_REQUEST: 'UPDATE_NOTIFICATION_REQUEST',
    UPDATE_NOTIFICATION_SUCCESS: 'UPDATE_NOTIFICATION_SUCCESS',
    UPDATE_NOTIFICATION_FAILED:  'UPDATE_NOTIFICATION_FAILED',

    DELETE_NOTIFICATION_REQUEST: 'DELETE_NOTIFICATION_REQUEST',
    DELETE_NOTIFICATION_SUCCESS: 'DELETE_NOTIFICATION_SUCCESS',
    DELETE_NOTIFICATION_FAILED:  'DELETE_NOTIFICATION_FAILED',
}
// dispatch(accountAction(ACT.ACCOUNT_REQUEST));
export function getNotificationAction(action, payload) {
    if(_.isEqual(action, actions.GET_NOTIFICATION_REQUEST)) {
        return {
            type: actions.GET_NOTIFICATION_REQUEST,
            payload
        }
    } else if(_.isEqual(action, actions.GET_NOTIFICATION_SUCCESS)) {
        return {
            type: actions.GET_NOTIFICATION_SUCCESS,
            payload
        }
    } else {
        return {
            type: actions.GET_NOTIFICATION_FAILED,
            payload
        }
    }
}

export function updateNotificationAction(action, payload) {
    if(_.isEqual(action, actions.UPDATE_NOTIFICATION_REQUEST)) {
        return {
            type: actions.UPDATE_NOTIFICATION_REQUEST,
            payload
        }
    } else if(_.isEqual(action, actions.UPDATE_NOTIFICATION_SUCCESS)) {
        return {
            type: actions.UPDATE_NOTIFICATION_SUCCESS,
            payload
        }
    } else {
        return {
            type: actions.UPDATE_NOTIFICATION_FAILED,
            payload
        }
    }
}

export function deleteNotificationAction(action, payload) {
    if(_.isEqual(action, actions.DELETE_NOTIFICATION_REQUEST)) {
        return {
            type: actions.DELETE_NOTIFICATION_REQUEST,
            payload
        }
    } else if(_.isEqual(action, actions.DELETE_NOTIFICATION_SUCCESS)) {
        return {
            type: actions.DELETE_NOTIFICATION_SUCCESS,
            payload
        }
    } else {
        return {
            type: actions.DELETE_NOTIFICATION_FAILED,
            payload
        }
    }
}
