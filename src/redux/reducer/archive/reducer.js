import { actions } from "../../action/archive/actions";

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

const archiveReducer = (state = initState, act) => {
  switch (act.type) {
    case actions.ARCHIVE_REQUEST:
      return objPayload(state, [true, false, null, null, null]);
    case actions.ARCHIVE_SUCCESS:
      return objPayload(state, [
        false,
        true,
        null,
        "FETCHED ARCHIVE",
        act.payload,
      ]);
    case actions.ARCHIVE_FAILED:
      return objPayload(state, [false, false, act.payload, null]);
    case actions.RESTORE1_ACCOUNT_REQUEST:
      return objPayload(state, [true, false, null, null, null]);
    case actions.RESTORE1_ACCOUNT_SUCCESS:
      return objPayload(state, [
        false,
        true,
        null,
        "RESTORE1 ACCOUNT!",
        act.payload,
      ]);
    case actions.RESTORE1_ACCOUNT_FAILED:
      return objPayload(state, [false, false, act.payload, null]);
    default:
      return state;
  }
};

export default archiveReducer;
