import _ from "lodash";

export const actions = {
  ACCOUNT_REQUEST: "ACCOUNT_REQUEST",
  ACCOUNT_SUCCESS: "ACCOUNT_SUCCESS",
  ACCOUNT_FAILED: "ACCOUNT_FAILED",

  UPDATE_ACCOUNT_REQUEST: "UPDATE_ACCOUNT_REQUEST",
  UPDATE_ACCOUNT_SUCCESS: "UPDATE_ACCOUNT_SUCCESS",
  UPDATE_ACCOUNT_FAILED: "UPDATE_ACCOUNT_FAILED",

  DELETE_ACCOUNT_REQUEST: "DELETE_ACCOUNT_REQUEST",
  DELETE_ACCOUNT_SUCCESS: "DELETE_ACCOUNT_SUCCESS",
  DELETE_ACCOUNT_FAILED: "DELETE_ACCOUNT_FAILED",

  APPROVE_ACCOUNT_REQUEST: "APPROVE_ACCOUNT_REQUEST",
  APPROVE_ACCOUNT_SUCCESS: "APPROVE_ACCOUNT_SUCCESS",
  APPROVE_ACCOUNT_FAILED: "APPROVE_ACCOUNT_FAILED",

  REGISTER_REQUEST: "REGISTER_REQUEST",
  REGISTER_SUCCESS: "REGISTER_SUCCESS",
  REGISTER_FAILED: "REGISTER_FAILED",

  RESTORE_ACCOUNT_REQUEST: "RESTORE_ACCOUNT_REQUEST",
  RESTORE_ACCOUNT_SUCCESS: "RESTORE_ACCOUNT_SUCCESS",
  RESTORE_ACCOUNT_FAILED: "RESTORE_ACCOUNT_FAILED",
};

export function accountAction(action, payload) {
  if (_.isEqual(action, actions.ACCOUNT_REQUEST)) {
    return {
      type: actions.ACCOUNT_REQUEST,
    };
  } else if (_.isEqual(action, actions.ACCOUNT_SUCCESS)) {
    return {
      type: actions.ACCOUNT_SUCCESS,
      payload,
    };
  } else {
    return {
      type: actions.ACCOUNT_FAILED,
      payload,
    };
  }
}

export function approveAccountAction(action, payload) {
  if (_.isEqual(action, actions.APPROVE_ACCOUNT_REQUEST)) {
    return {
      type: actions.APPROVE_ACCOUNT_REQUEST,
      payload,
    };
  } else if (_.isEqual(action, actions.APPROVE_ACCOUNT_SUCCESS)) {
    return {
      type: actions.APPROVE_ACCOUNT_SUCCESS,
      payload,
    };
  } else {
    return {
      type: actions.APPROVE_ACCOUNT_FAILED,
      payload,
    };
  }
}

export function updateAccountAction(action, payload) {
  if (_.isEqual(action, actions.UPDATE_ACCOUNT_REQUEST)) {
    return {
      type: actions.UPDATE_ACCOUNT_REQUEST,
      payload,
    };
  } else if (_.isEqual(action, actions.UPDATE_ACCOUNT_SUCCESS)) {
    return {
      type: actions.UPDATE_ACCOUNT_SUCCESS,
      payload,
    };
  } else {
    return {
      type: actions.UPDATE_ACCOUNT_FAILED,
      payload,
    };
  }
}

export function deleteAccountAction(action, payload) {
  if (_.isEqual(action, actions.DELETE_ACCOUNT_REQUEST)) {
    return {
      type: actions.DELETE_ACCOUNT_REQUEST,
      payload,
    };
  } else if (_.isEqual(action, actions.DELETE_ACCOUNT_SUCCESS)) {
    return {
      type: actions.DELETE_ACCOUNT_SUCCESS,
      payload,
    };
  } else {
    return {
      type: actions.DELETE_ACCOUNT_FAILED,
      payload,
    };
  }
}

export function restoreAccountAction(action, payload) {
  if (_.isEqual(action, actions.RESTORE_ACCOUNT_REQUEST)) {
    return {
      type: actions.RESTORE_ACCOUNT_REQUEST,
      payload,
    };
  } else if (_.isEqual(action, actions.RESTORE_ACCOUNT_SUCCESS)) {
    return {
      type: actions.RESTORE_ACCOUNT_SUCCESS,
      payload,
    };
  } else {
    return {
      type: actions.RESTORE_ACCOUNT_FAILED,
      payload,
    };
  }
}

export function registerAction(action, payload) {
  if (_.isEqual(action, actions.REGISTER_REQUEST)) {
    return {
      type: actions.REGISTER_REQUEST,
      payload,
    };
  } else if (_.isEqual(action, actions.REGISTER_SUCCESS)) {
    return {
      type: actions.REGISTER_SUCCESS,
      payload,
    };
  } else {
    return {
      type: actions.REGISTER_FAILED,
      payload,
    };
  }
}
