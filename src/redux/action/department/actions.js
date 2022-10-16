import _ from "lodash";

export const actions = {
  DEPARTMENT_REQUEST: "DEPARTMENT_REQUEST",
  DEPARTMENT_SUCCESS: "DEPARTMENT_SUCCESS",
  DEPARTMENT_FAILED: "DEPARTMENT_FAILED",

  ADD_DEPARTMENT_REQUEST: "ADD_DEPARTMENT_REQUEST",
  ADD_DEPARTMENT_SUCCESS: "ADD_DEPARTMENT_SUCCESS",
  ADD_DEPARTMENT_FAILED: "ADD_DEPARTMENT_FAILED",

  UPDATE_DEPARTMENT_REQUEST: "UPDATE_DEPARTMENT_REQUEST",
  UPDATE_DEPARTMENT_SUCCESS: "UPDATE_DEPARTMENT_SUCCESS",
  UPDATE_DEPARTMENT_FAILED: "UPDATE_DEPARTMENT_FAILED",

  DELETE_DEPARTMENT_REQUEST: "DELETE_DEPARTMENT_REQUEST",
  DELETE_DEPARTMENT_SUCCESS: "DELETE_DEPARTMENT_SUCCESS",
  DELETE_DEPARTMENT_FAILED: "DELETE_DEPARTMENT_FAILED",

  RESTORE_DEPARTMENT_REQUEST: "RESTORE_DEPARTMENT_REQUEST",
  RESTORE_DEPARTMENT_SUCCESS: "RESTORE_DEPARTMENT_SUCCESS",
  RESTORE_DEPARTMENT_FAILED: "RESTORE_DEPARTMENT_FAILED",
};
// dispatch(accountAction(ACT.ACCOUNT_REQUEST));
export function departmentAction(action, payload) {
  if (_.isEqual(action, actions.DEPARTMENT_REQUEST)) {
    return {
      type: actions.DEPARTMENT_REQUEST,
    };
  } else if (_.isEqual(action, actions.DEPARTMENT_SUCCESS)) {
    return {
      type: actions.DEPARTMENT_SUCCESS,
      payload,
    };
  } else {
    return {
      type: actions.DEPARTMENT_FAILED,
      payload,
    };
  }
}

export function addDepartmentAction(action, payload) {
  if (_.isEqual(action, actions.ADD_DEPARTMENT_REQUEST)) {
    return {
      type: actions.ADD_DEPARTMENT_REQUEST,
      payload,
    };
  } else if (_.isEqual(action, actions.ADD_DEPARTMENT_SUCCESS)) {
    return {
      type: actions.ADD_DEPARTMENT_SUCCESS,
      payload,
    };
  } else {
    return {
      type: actions.ADD_DEPARTMENT_FAILED,
      payload,
    };
  }
}

export function updateDepartmentAction(action, payload) {
  if (_.isEqual(action, actions.UPDATE_DEPARTMENT_REQUEST)) {
    return {
      type: actions.UPDATE_DEPARTMENT_REQUEST,
      payload,
    };
  } else if (_.isEqual(action, actions.UPDATE_DEPARTMENT_SUCCESS)) {
    return {
      type: actions.UPDATE_DEPARTMENT_SUCCESS,
      payload,
    };
  } else {
    return {
      type: actions.UPDATE_DEPARTMENT_FAILED,
      payload,
    };
  }
}

export function deleteDepartmentAction(action, payload) {
  if (_.isEqual(action, actions.DELETE_DEPARTMENT_REQUEST)) {
    return {
      type: actions.DELETE_DEPARTMENT_REQUEST,
      payload,
    };
  } else if (_.isEqual(action, actions.DELETE_DEPARTMENT_SUCCESS)) {
    return {
      type: actions.DELETE_DEPARTMENT_SUCCESS,
      payload,
    };
  } else {
    return {
      type: actions.DELETE_DEPARTMENT_FAILED,
      payload,
    };
  }
}

export function restoreDepartmentAction(action, payload) {
  if (_.isEqual(action, actions.RESTORE_DEPARTMENT_REQUEST)) {
    return {
      type: actions.RESTORE_DEPARTMENT_REQUEST,
      payload,
    };
  } else if (_.isEqual(action, actions.RESTORE_DEPARTMENT_SUCCESS)) {
    return {
      type: actions.RESTORE_DEPARTMENT_SUCCESS,
      payload,
    };
  } else {
    return {
      type: actions.RESTORE_DEPARTMENT_FAILED,
      payload,
    };
  }
}
