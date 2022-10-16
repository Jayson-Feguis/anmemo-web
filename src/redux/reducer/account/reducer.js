import { actions } from "../../action/account/actions";

const initState = {
  is_loading: false,
  is_success: false,
  error_msg: null,
  success_msg: null,
  data: null,
  updated_at: null,
};

const objPayload = (state, params) => {
  return {
    ...state,
    is_loading: params[0],
    is_success: params[1],
    error_msg: params[2],
    success_msg: params[3],
    data: params[4] ?? state.params,
    updated_at: params[5],
  };
};

const accountReducer = (state = initState, act) => {
  switch (act.type) {
    case actions.ACCOUNT_REQUEST:
      return objPayload(state, [true, false, null, null, null]);
    case actions.ACCOUNT_SUCCESS:
      return objPayload(state, [
        false,
        true,
        null,
        "FETCHED ACCOUNT!",
        act.payload,
      ]);
    case actions.ACCOUNT_FAILED:
      return objPayload(state, [false, false, act.payload, null]);
    case actions.UPDATE_ACCOUNT_REQUEST:
      return objPayload(state, [true, false, null, null, null]);
    case actions.UPDATE_ACCOUNT_SUCCESS:
      return objPayload(state, [
        false,
        true,
        null,
        "Account updated successfully",
        act.payload,
        Date.now(),
      ]);
    case actions.UPDATE_ACCOUNT_FAILED:
      return objPayload(state, [false, false, act.payload, null]);
    case actions.DELETE_ACCOUNT_REQUEST:
      return objPayload(state, [true, false, null, null, null]);
    case actions.DELETE_ACCOUNT_SUCCESS:
      return objPayload(state, [
        false,
        true,
        null,
        "Account deleted successfully",
        act.payload,
        Date.now(),
      ]);
    case actions.DELETE_ACCOUNT_FAILED:
      return objPayload(state, [false, false, act.payload, null]);
    case actions.APPROVE_ACCOUNT_REQUEST:
      return objPayload(state, [true, false, null, null, null]);
    case actions.APPROVE_ACCOUNT_SUCCESS:
      return objPayload(state, [
        false,
        true,
        null,
        "Account approved successfully",
        act.payload,
        Date.now(),
      ]);
    case actions.APPROVE_ACCOUNT_FAILED:
      return objPayload(state, [false, false, act.payload, null]);
    case actions.RESTORE_ACCOUNT_REQUEST:
      return objPayload(state, [true, false, null, null, null]);
    case actions.RESTORE_ACCOUNT_SUCCESS:
      return objPayload(state, [
        false,
        true,
        null,
        "Account restored successfully",
        act.payload,
        Date.now(),
      ]);
    case actions.RESTORE_ACCOUNT_FAILED:
      return objPayload(state, [true, false, null, null, null]);
    case actions.REGISTER_REQUEST:
      return objPayload(state, [true, false, null, null, null]);
    case actions.REGISTER_SUCCESS:
      return objPayload(state, [
        false,
        true,
        null,
        "Account added successfully",
        act.payload,
        Date.now(),
      ]);
    case actions.REGISTER_FAILED:
      return objPayload(state, [false, false, act.payload, null]);
    default:
      return state;
  }
};

export default accountReducer;
