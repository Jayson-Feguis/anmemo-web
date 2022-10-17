import _ from "lodash";

export const actions = {
  LOGIN_REQUEST: "LOGIN_REQUEST",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_FAILED: "LOGIN_FAILED",

  LOGOUT_REQUEST: "LOGOUT_REQUEST",
  LOGOUT_SUCCESS: "LOGOUT_SUCCESS",
  LOGOUT_FAILED: "LOGOUT_FAILED",

  LOGOUT2_REQUEST: "LOGOUT2_REQUEST",
  LOGOUT2_SUCCESS: "LOGOUT2_SUCCESS",
  LOGOUT2_FAILED: "LOGOUT2_FAILED",

  EMAIL_REQUEST: "EMAIL_REQUEST",
  EMAIL_SUCCESS: "EMAIL_SUCCESS",
  EMAIL_FAILED: "EMAIL_FAILED",

  RESET_REQUEST: "RESET_REQUEST",
  RESET_SUCCESS: "RESET_SUCCESS",
  RESET_FAILED: "RESET_FAILED",
};

export function loginAction(action, payload) {
  if (_.isEqual(action, actions.LOGIN_REQUEST)) {
    return {
      type: actions.LOGIN_REQUEST,
      payload,
    };
  } else if (_.isEqual(action, actions.LOGIN_SUCCESS)) {
    return {
      type: actions.LOGIN_SUCCESS,
      payload,
    };
  } else {
    return {
      type: actions.LOGIN_FAILED,
      payload,
    };
  }
}

export function logout2Action(action, payload) {
  if (_.isEqual(action, actions.LOGOUT2_REQUEST)) {
    return {
      type: actions.LOGOUT2_REQUEST,
      payload,
    };
  } else if (_.isEqual(action, actions.LOGOUT2_SUCCESS)) {
    return {
      type: actions.LOGOUT2_SUCCESS,
      payload,
    };
  } else {
    return {
      type: actions.LOGOUT2_FAILED,
      payload,
    };
  }
}

export function logoutAction(action, payload) {
  if (_.isEqual(action, actions.LOGOUT_REQUEST)) {
    return {
      type: actions.LOGOUT_REQUEST,
    };
  } else if (_.isEqual(action, actions.LOGOUT_SUCCESS)) {
    return {
      type: actions.LOGOUT_SUCCESS,
      payload,
    };
  } else {
    return {
      type: actions.LOGOUT_FAILED,
      payload,
    };
  }
}

export function emailAction(action, payload) {
  if (_.isEqual(action, actions.EMAIL_REQUEST)) {
    return {
      type: actions.EMAIL_REQUEST,
      payload,
    };
  } else if (_.isEqual(action, actions.EMAIL_SUCCESS)) {
    return {
      type: actions.EMAIL_SUCCESS,
      payload,
    };
  } else {
    return {
      type: actions.EMAIL_FAILED,
      payload,
    };
  }
}

export function resetAction(action, payload) {
  if (_.isEqual(action, actions.RESET_REQUEST)) {
    return {
      type: actions.RESET_REQUEST,
      payload,
    };
  } else if (_.isEqual(action, actions.RESET_SUCCESS)) {
    return {
      type: actions.RESET_SUCCESS,
      payload,
    };
  } else {
    return {
      type: actions.RESET_FAILED,
      payload,
    };
  }
}
