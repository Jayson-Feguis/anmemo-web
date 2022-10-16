import { actions } from "../../action/department/actions";

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

const departmentReducer = (state = initState, act) => {
  switch (act.type) {
    case actions.DEPARTMENT_REQUEST:
      return objPayload(state, [true, false, null, null, null]);
    case actions.DEPARTMENT_SUCCESS:
      return objPayload(state, [
        false,
        true,
        null,
        "FETCHED DEPARTMENT!",
        act.payload,
      ]);
    case actions.DEPARTMENT_FAILED:
      return objPayload(state, [false, false, act.payload, null]);
    case actions.COUNT_DEPARTMENT_REQUEST:
      return objPayload(state, [true, false, null, null, null]);
    case actions.COUNT_DEPARTMENT_SUCCESS:
      return objPayload(state, [
        false,
        true,
        null,
        "FETCHED DEPARTMENT!",
        act.payload,
      ]);
    case actions.COUNT_DEPARTMENT_FAILED:
      return objPayload(state, [false, false, act.payload, null]);
    case actions.ADD_DEPARTMENT_REQUEST:
      return objPayload(state, [true, false, null, null, null]);
    case actions.ADD_DEPARTMENT_SUCCESS:
      return objPayload(state, [
        false,
        true,
        null,
        "Department added successfully",
        act.payload,
        Date.now(),
      ]);
    case actions.ADD_DEPARTMENT_FAILED:
      return objPayload(state, [false, false, act.payload, null]);
    case actions.UPDATE_DEPARTMENT_REQUEST:
      return objPayload(state, [true, false, null, null, null]);
    case actions.UPDATE_DEPARTMENT_SUCCESS:
      return objPayload(state, [
        false,
        true,
        null,
        "Department updated successfully",
        act.payload,
        Date.now(),
      ]);
    case actions.UPDATE_DEPARTMENT_FAILED:
      return objPayload(state, [false, false, act.payload, null]);
    case actions.DELETE_DEPARTMENT_REQUEST:
      return objPayload(state, [true, false, null, null, null]);
    case actions.DELETE_DEPARTMENT_SUCCESS:
      return objPayload(state, [
        false,
        true,
        null,
        "Department deleted successfully",
        act.payload,
        Date.now(),
      ]);
    case actions.DELETE_DEPARTMENT_FAILED:
      return objPayload(state, [false, false, act.payload, null]);

    case actions.RESTORE_DEPARTMENT_REQUEST:
      return objPayload(state, [true, false, null, null, null]);
    case actions.RESTORE_DEPARTMENT_SUCCESS:
      return objPayload(state, [
        false,
        true,
        null,
        "Department restored successfully",
        act.payload,
        Date.now(),
      ]);
    case actions.RESTORE_DEPARTMENT_FAILED:
      return objPayload(state, [false, false, act.payload, null]);
    default:
      return state;
  }
};

export default departmentReducer;
