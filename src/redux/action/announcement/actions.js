import _ from "lodash";

export const actions = {
  GET_ANNOUNCEMENT_REQUEST: "GET_ANNOUNCEMENT_REQUEST",
  GET_ANNOUNCEMENT_SUCCESS: "GET_ANNOUNCEMENT_SUCCESS",
  GET_ANNOUNCEMENT_FAILED: "GET_ANNOUNCEMENT_FAILED",

  ADD_ANNOUNCEMENT_REQUEST: "ADD_ANNOUNCEMENT_REQUEST",
  ADD_ANNOUNCEMENT_SUCCESS: "ADD_ANNOUNCEMENT_SUCCESS",
  ADD_ANNOUNCEMENT_FAILED: "ADD_ANNOUNCEMENT_FAILED",

  UPDATE_ANNOUNCEMENT_REQUEST: "UPDATE_ANNOUNCEMENT_REQUEST",
  UPDATE_ANNOUNCEMENT_SUCCESS: "UPDATE_ANNOUNCEMENT_SUCCESS",
  UPDATE_ANNOUNCEMENT_FAILED: "UPDATE_ANNOUNCEMENT_FAILED",

  DELETE_ANNOUNCEMENT_REQUEST: "DELETE_ANNOUNCEMENT_REQUEST",
  DELETE_ANNOUNCEMENT_SUCCESS: "DELETE_ANNOUNCEMENT_SUCCESS",
  DELETE_ANNOUNCEMENT_FAILED: "DELETE_ANNOUNCEMENT_FAILED",
};

export function getAnnouncementAction(action, payload) {
  if (_.isEqual(action, actions.GET_ANNOUNCEMENT_REQUEST)) {
    return {
      type: actions.GET_ANNOUNCEMENT_REQUEST,
      payload,
    };
  } else if (_.isEqual(action, actions.GET_ANNOUNCEMENT_SUCCESS)) {
    return {
      type: actions.GET_ANNOUNCEMENT_SUCCESS,
      payload,
    };
  } else {
    return {
      type: actions.GET_ANNOUNCEMENT_FAILED,
      payload,
    };
  }
}

export function addAnnouncementAction(action, payload) {
  if (_.isEqual(action, actions.ADD_ANNOUNCEMENT_REQUEST)) {
    return {
      type: actions.ADD_ANNOUNCEMENT_REQUEST,
      payload,
    };
  } else if (_.isEqual(action, actions.ADD_ANNOUNCEMENT_SUCCESS)) {
    return {
      type: actions.ADD_ANNOUNCEMENT_SUCCESS,
      payload,
    };
  } else {
    return {
      type: actions.ADD_ANNOUNCEMENT_FAILED,
      payload,
    };
  }
}

export function updateAnnouncementAction(action, payload) {
  if (_.isEqual(action, actions.UPDATE_ANNOUNCEMENT_REQUEST)) {
    return {
      type: actions.UPDATE_ANNOUNCEMENT_REQUEST,
      payload,
    };
  } else if (_.isEqual(action, actions.UPDATE_ANNOUNCEMENT_SUCCESS)) {
    return {
      type: actions.UPDATE_ANNOUNCEMENT_SUCCESS,
      payload,
    };
  } else {
    return {
      type: actions.UPDATE_ANNOUNCEMENT_FAILED,
      payload,
    };
  }
}

export function deleteAnnouncementAction(action, payload) {
  if (_.isEqual(action, actions.DELETE_ANNOUNCEMENT_REQUEST)) {
    return {
      type: actions.DELETE_ANNOUNCEMENT_REQUEST,
      payload,
    };
  } else if (_.isEqual(action, actions.DELETE_ANNOUNCEMENT_SUCCESS)) {
    return {
      type: actions.DELETE_ANNOUNCEMENT_SUCCESS,
      payload,
    };
  } else {
    return {
      type: actions.DELETE_ANNOUNCEMENT_FAILED,
      payload,
    };
  }
}
