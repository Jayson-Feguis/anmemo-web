import _ from "lodash";

export const actions = {
  AUDIT_REQUEST: "AUDIT_REQUEST",
  AUDIT_SUCCESS: "AUDIT_SUCCESS",
  AUDIT_FAILED: "AUDIT_FAILED",
};

export function auditAction(action, payload) {
  if (_.isEqual(action, actions.AUDIT_REQUEST)) {
    return {
      type: actions.AUDIT_REQUEST,
    };
  } else if (_.isEqual(action, actions.AUDIT_SUCCESS)) {
    return {
      type: actions.AUDIT_SUCCESS,
      payload,
    };
  } else {
    return {
      type: actions.AUDIT_FAILED,
      payload,
    };
  }
}
