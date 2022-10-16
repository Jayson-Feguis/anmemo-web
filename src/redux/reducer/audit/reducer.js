import { actions } from "../../action/audit/actions";

const initState = {
  is_loading: false,
  is_success: false,
  error_msg: null,
  success_msg: null,
  data: null,
};

const objPayload = (state, params) => {
  return {
    ...state,
    is_loading: params[0],
    is_success: params[1],
    error_msg: params[2],
    success_msg: params[3],
    data: params[4],
  };
};

const auditReducer = (state = initState, act) => {
  switch (act.type) {
    case actions.AUDIT_REQUEST:
      return objPayload(state, [true, false, null, null, null]);
    case actions.AUDIT_SUCCESS:
      return objPayload(state, [
        false,
        true,
        null,
        "FETCHED Audit Trail",
        act.payload,
      ]);
    case actions.AUDIT_FAILED:
      return objPayload(state, [false, false, act.payload, null]);
    default:
      return state;
  }
};

export default auditReducer;
