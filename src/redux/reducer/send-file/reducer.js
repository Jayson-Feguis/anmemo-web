import { actions } from "../../action/send-file/actions";

const initState = {
  is_loading: false,
  is_success: false,
  error_msg: null,
  success_msg: null,
  data: null,
  updated_at: null,
  type: null,
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
    type: params[6],
  };
};

const sendFileReducer = (state = initState, act) => {
  switch (act.type) {
    case actions.UPLOAD_FILE_REQUEST:
      return objPayload(state, [true, false, null, null, null]);
    case actions.UPLOAD_FILE_SUCCESS:
      return objPayload(state, [
        false,
        true,
        null,
        "File upload successfully",
        act.payload,
        Date.now(),
        1,
      ]);
    case actions.UPLOAD_FILE_FAILED:
      return objPayload(state, [false, false, act.payload, null]);
    case actions.GET_DOCUMENT_REQUEST:
      return objPayload(state, [true, false, null, null, null]);
    case actions.GET_DOCUMENT_SUCCESS:
      return objPayload(state, [
        false,
        true,
        null,
        "FETCHED DOCUMENT!",
        act.payload,
      ]);
    case actions.GET_DOCUMENT_FAILED:
      return objPayload(state, [false, false, act.payload, null]);
    case actions.SEND_FILE_REQUEST:
      return objPayload(state, [true, false, null, null, null]);
    case actions.SEND_FILE_SUCCESS:
      return objPayload(state, [false, true, null, "FILE SENT!", act.payload]);
    case actions.SEND_FILE_FAILED:
      return objPayload(state, [false, false, act.payload, null]);
    case actions.DELETE_DOCUMENT_REQUEST:
      return objPayload(state, [true, false, null, null, null]);
    case actions.DELETE_DOCUMENT_SUCCESS:
      return objPayload(state, [
        false,
        true,
        null,
        "DOCUMENT DELETED!",
        act.payload,
        Date.now(),
        2,
      ]);
    case actions.DELETE_DOCUMENT_FAILED:
      return objPayload(state, [false, false, act.payload, null]);
    default:
      return state;
  }
};

export default sendFileReducer;
