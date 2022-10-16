import _ from "lodash";

export const actions = {
  GET_FACULTY_FILES_REQUEST: "GET_FACULTY_FILES_REQUEST",
  GET_FACULTY_FILES_SUCCESS: "GET_FACULTY_FILES_SUCCESS",
  GET_FACULTY_FILES_FAILED: "GET_FACULTY_FILES_FAILED",

  SEARCH_FACULTY_FILES_REQUEST: "SEARCH_FACULTY_FILES_REQUEST",
  SEARCH_FACULTY_FILES_SUCCESS: "SEARCH_FACULTY_FILES_SUCCESS",
  SEARCH_FACULTY_FILES_FAILED: "SEARCH_FACULTY_FILES_FAILED",
};

export function getFacultyFilesAction(action, payload) {
  if (_.isEqual(action, actions.GET_FACULTY_FILES_REQUEST)) {
    return {
      type: actions.GET_FACULTY_FILES_REQUEST,
      payload,
    };
  } else if (_.isEqual(action, actions.GET_FACULTY_FILES_SUCCESS)) {
    return {
      type: actions.GET_FACULTY_FILES_SUCCESS,
      payload,
    };
  } else {
    return {
      type: actions.GET_FACULTY_FILES_FAILED,
      payload,
    };
  }
}

export function searchFacultyFilesAction(action, payload) {
  if (_.isEqual(action, actions.SEARCH_FACULTY_FILES_REQUEST)) {
    return {
      type: actions.SEARCH_FACULTY_FILES_REQUEST,
      payload,
    };
  } else if (_.isEqual(action, actions.SEARCH_FACULTY_FILES_SUCCESS)) {
    return {
      type: actions.SEARCH_FACULTY_FILES_SUCCESS,
      payload,
    };
  } else {
    return {
      type: actions.SEARCH_FACULTY_FILES_FAILED,
      payload,
    };
  }
}
