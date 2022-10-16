import { actions } from "../../action/announcement/actions";

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
    data: params[4],
    updated_at: params[5],
  };
};

const announcementReducer = (state = initState, act) => {
  switch (act.type) {
    case actions.GET_ANNOUNCEMENT_REQUEST:
      return objPayload(state, [true, false, null, null, null]);
    case actions.GET_ANNOUNCEMENT_SUCCESS:
      return objPayload(state, [
        false,
        true,
        null,
        "FETCHED ANNOUNCEMENT!",
        act.payload,
      ]);
    case actions.GET_ANNOUNCEMENT_FAILED:
      return objPayload(state, [false, false, act.payload, null]);
    case actions.ADD_ANNOUNCEMENT_REQUEST:
      return objPayload(state, [true, false, null, null, null]);
    case actions.ADD_ANNOUNCEMENT_SUCCESS:
      return objPayload(state, [
        false,
        true,
        null,
        "ADDED ANNOUNCEMENT!",
        act.payload,
        Date.now(),
      ]);
    case actions.ADD_ANNOUNCEMENT_FAILED:
      return objPayload(state, [false, false, act.payload, null]);
    case actions.UPDATE_ANNOUNCEMENT_REQUEST:
      return objPayload(state, [true, false, null, null, null]);
    case actions.UPDATE_ANNOUNCEMENT_SUCCESS:
      return objPayload(state, [
        false,
        true,
        null,
        "ANNOUNCEMENT UPDATED!",
        act.payload,
      ]);
    case actions.UPDATE_ANNOUNCEMENT_FAILED:
      return objPayload(state, [false, false, act.payload, null]);
    case actions.DELETE_ANNOUNCEMENT_REQUEST:
      return objPayload(state, [true, false, null, null, null]);
    case actions.DELETE_ANNOUNCEMENT_SUCCESS:
      return objPayload(state, [
        false,
        true,
        null,
        "ANNOUNCEMENT DELETED!",
        act.payload,
      ]);
    case actions.DELETE_ANNOUNCEMENT_FAILED:
      return objPayload(state, [false, false, act.payload, null]);
    default:
      return state;
  }
};

export default announcementReducer;
