import _ from "lodash";

export const actions = {
  GET_ANNOUNCEMENT_RECEIVERS_REQUEST: "GET_ANNOUNCEMENT_RECEIVERS_REQUEST",
  GET_ANNOUNCEMENT_RECEIVERS_SUCCESS: "GET_ANNOUNCEMENT_RECEIVERS_SUCCESS",
  GET_ANNOUNCEMENT_RECEIVERS_FAILED: "GET_DOCUMENT_RECEIVERS_FAILED",

  DELETE_ANNOUNCEMENT_RECEIVERS_REQUEST:
    "DELETE_ANNOUNCEMENT_RECEIVERS_REQUEST",
  DELETE_ANNOUNCEMENT_RECEIVERS_SUCCESS:
    "DELETE_ANNOUNCEMENT_RECEIVERS_SUCCESS",
  DELETE_ANNOUNCEMENT_RECEIVERS_FAILED: "DELETE_DOCUMENT_RECEIVERS_FAILED",
};

export function getAnnouncementReceiversAction(action, payload) {
  if (_.isEqual(action, actions.GET_ANNOUNCEMENT_RECEIVERS_REQUEST)) {
    return {
      type: actions.GET_ANNOUNCEMENT_RECEIVERS_REQUEST,
      payload,
    };
  } else if (_.isEqual(action, actions.GET_ANNOUNCEMENT_RECEIVERS_SUCCESS)) {
    return {
      type: actions.GET_ANNOUNCEMENT_RECEIVERS_SUCCESS,
      payload,
    };
  } else {
    return {
      type: actions.GET_ANNOUNCEMENT_RECEIVERS_FAILED,
      payload,
    };
  }
}

export function deleteAnnouncementReceiversAction(action, payload) {
  if (_.isEqual(action, actions.DELETE_ANNOUNCEMENT_RECEIVERS_REQUEST)) {
    return {
      type: actions.DELETE_ANNOUNCEMENT_RECEIVERS_REQUEST,
      payload,
    };
  } else if (_.isEqual(action, actions.DELETE_ANNOUNCEMENT_RECEIVERS_SUCCESS)) {
    return {
      type: actions.DELETE_ANNOUNCEMENT_RECEIVERS_SUCCESS,
      payload,
    };
  } else {
    return {
      type: actions.DELETE_ANNOUNCEMENT_RECEIVERS_FAILED,
      payload,
    };
  }
}
