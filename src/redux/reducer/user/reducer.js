import { actions } from "../../action/user/actions";

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

const userReducer = (state = initState, act) => {
  switch (act.type) {
    case actions.LOGIN_REQUEST:
      return objPayload(state, [true, false, null, null, null]);
    case actions.LOGIN_SUCCESS:
      return objPayload(state, [false, true, null, null, act.payload]);
    case actions.LOGIN_FAILED:
      return objPayload(state, [false, false, act.payload, null]);
    case actions.LOGOUT2_REQUEST:
      return objPayload(state, [true, false, null, null, null]);
    case actions.LOGOUT2_SUCCESS:
      return initState;
    case actions.LOGOUT2_FAILED:
      return objPayload(state, [false, false, act.payload, null]);
    case actions.REGISTER1_REQUEST:
      return objPayload(state, [true, false, null, null, null]);
    case actions.REGISTER1_SUCCESS:
      return objPayload(state, [false, true, null, act.payload, null]);
    case actions.REGISTER1_FAILED:
      return objPayload(state, [false, false, act.payload, null]);
    case actions.EMAIL_REQUEST:
      return objPayload(state, [true, false, null, null, null]);
    case actions.EMAIL_SUCCESS:
      return objPayload(state, [false, "emailnice", null, act.payload, null]);
    case actions.EMAIL_FAILED:
      return objPayload(state, [false, "emailfalse", act.payload, null]);
    case actions.RESET_REQUEST:
      return objPayload(state, [true, false, null, null, null]);
    case actions.RESET_SUCCESS:
      return objPayload(state, [false, "napalitan", null, act.payload, null]);
    case actions.RESET_FAILED:
      return objPayload(state, [false, "hindi napalitan", act.payload, null]);
    default:
      return state;
  }
};

export default userReducer;
