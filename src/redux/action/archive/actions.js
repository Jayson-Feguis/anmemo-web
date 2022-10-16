import _ from "lodash";

export const actions = {
  ARCHIVE_REQUEST: "ARCHIVE_REQUEST",
  ARCHIVE_SUCCESS: "ARCHIVE_SUCCESS",
  ARCHIVE_FAILED: "ARCHIVE_FAILED",

  RESTORE1_ACCOUNT_REQUEST: "RESTORE1_ACCOUNT_REQUEST",
  RESTORE1_ACCOUNT_SUCCESS: "RESTORE1_ACCOUNT_SUCCESS",
  RESTORE1_ACCOUNT_FAILED: "RESTORE1_ACCOUNT_FAILED",
};

export function archiveAction(action, payload) {
  if (_.isEqual(action, actions.ARCHIVE_REQUEST)) {
    return {
      type: actions.ARCHIVE_REQUEST,
    };
  } else if (_.isEqual(action, actions.ARCHIVE_SUCCESS)) {
    return {
      type: actions.ARCHIVE_SUCCESS,
      payload,
    };
  } else {
    return {
      type: actions.ARCHIVE_FAILED,
      payload,
    };
  }
}

export function restoreAccountAction(action, payload) {
  if (action === actions.RESTORE1_ACCOUNT_REQUEST) {
    return {
      type: actions.RESTORE1_ACCOUNT_REQUEST,
      payload,
    };
  } else if (action === actions.RESTORE1_ACCOUNT_SUCCESS) {
    return {
      type: actions.RESTORE1_ACCOUNT_SUCCESS,
      payload,
    };
  } else {
    return {
      type: actions.RESTORE1_ACCOUNT_FAILED,
      payload,
    };
  }
}
