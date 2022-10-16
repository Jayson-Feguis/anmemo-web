import _ from "lodash";

export const actions = {
  GET_DOCUMENT_RECEIVERS_REQUEST: "GET_DOCUMENT_RECEIVERS_REQUEST",
  GET_DOCUMENT_RECEIVERS_SUCCESS: "GET_DOCUMENT_RECEIVERS_SUCCESS",
  GET_DOCUMENT_RECEIVERS_FAILED: "GET_DOCUMENT_RECEIVERS_FAILED",

  DELETE_DOCUMENT_RECEIVERS_REQUEST: "DELETE_DOCUMENT_RECEIVERS_REQUEST",
  DELETE_DOCUMENT_RECEIVERS_SUCCESS: "DELETE_DOCUMENT_RECEIVERS_SUCCESS",
  DELETE_DOCUMENT_RECEIVERS_FAILED: "DELETE_DOCUMENT_RECEIVERS_FAILED",
};

export function getDocumentReceiversAction(action, payload) {
  if (_.isEqual(action, actions.GET_DOCUMENT_RECEIVERS_REQUEST)) {
    return {
      type: actions.GET_DOCUMENT_RECEIVERS_REQUEST,
      payload,
    };
  } else if (_.isEqual(action, actions.GET_DOCUMENT_RECEIVERS_SUCCESS)) {
    return {
      type: actions.GET_DOCUMENT_RECEIVERS_SUCCESS,
      payload,
    };
  } else {
    return {
      type: actions.GET_DOCUMENT_RECEIVERS_FAILED,
      payload,
    };
  }
}

export function deleteDocumentReceiversAction(action, payload) {
  if (_.isEqual(action, actions.DELETE_DOCUMENT_RECEIVERS_REQUEST)) {
    return {
      type: actions.DELETE_DOCUMENT_RECEIVERS_REQUEST,
      payload,
    };
  } else if (_.isEqual(action, actions.DELETE_DOCUMENT_RECEIVERS_SUCCESS)) {
    return {
      type: actions.DELETE_DOCUMENT_RECEIVERS_SUCCESS,
      payload,
    };
  } else {
    return {
      type: actions.DELETE_DOCUMENT_RECEIVERS_FAILED,
      payload,
    };
  }
}
