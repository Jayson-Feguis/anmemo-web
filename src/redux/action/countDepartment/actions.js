import _ from "lodash";

export const actions = {
  COUNT_DEPARTMENT_REQUEST: "COUNT_DEPARTMENT_REQUEST",
  COUNT_DEPARTMENT_SUCCESS: "COUNT_DEPARTMENT_SUCCESS",
  COUNT_DEPARTMENT_FAILED: "COUNT_DEPARTMENT_FAILED",
};
// dispatch(accountAction(ACT.ACCOUNT_REQUEST));

export function departmentActionCount(action, payload) {
  if (_.isEqual(action, actions.COUNT_DEPARTMENT_REQUEST)) {
    return {
      type: actions.COUNT_DEPARTMENT_REQUEST,
    };
  } else if (_.isEqual(action, actions.COUNT_DEPARTMENT_SUCCESS)) {
    return {
      type: actions.COUNT_DEPARTMENT_SUCCESS,
      payload,
    };
  } else {
    return {
      type: actions.COUNT_DEPARTMENT_FAILED,
      payload,
    };
  }
}
