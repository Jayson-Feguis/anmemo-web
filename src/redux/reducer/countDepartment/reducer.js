import { actions } from "../../action/countDepartment/actions";

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

const countdepartmentReducer = (state = initState, act) => {
  switch (act.type) {
    case actions.COUNT_DEPARTMENT_REQUEST:
      return objPayload(state, [true, false, null, null, null]);
    case actions.COUNT_DEPARTMENT_SUCCESS:
      return objPayload(state, [
        false,
        true,
        null,
        "FETCHED COUNT DEPARTMENT!",
        act.payload,
      ]);
    default:
      return state;
  }
};

export default countdepartmentReducer;
