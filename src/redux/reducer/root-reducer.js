import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import userReducer from "./user/reducer";
import departmentReducer from "./department/reducer";
import countdepartmentReducer from "./countDepartment/reducer";
import auditReducer from "./audit/reducer";
import archiveReducer from "./archive/reducer";
import accountReducer from "./account/reducer";
import sendFileReducer from "./send-file/reducer";
import notificationReducer from "./notification/reducer";
import documentReceiverReducer from "./document-receivers/reducer";
import announcementReducer from "./announcement/reducer";
import announcementReceiverReducer from "./announcement-receivers/reducer";
import facultyFilesReducer from "./faculty-files/reducer";
import storage from "redux-persist/lib/storage";
import { actions } from "../action/user/actions";
import { encryptTransform } from "redux-persist-transform-encrypt";

const persistConfig = {
  transforms: [
    encryptTransform({
      secretKey: process.env.REACT_APP_PERSIST_SECREY_KEY,
      onError: function (error) {
        // Handle the error.
      },
    }),
  ],
  key: "root",
  storage,
  whitelist: [
    "user",
    "department",
    "account",
    "sendfile",
    "notification",
    "documentreceivers",
    "countdepartment",
    "announcement",
    "announcementreceivers",
    "facultyfiles",
    "audit_trail",
    "archive",
  ],
};

const reducers = combineReducers({
  user: userReducer,
  department: departmentReducer,
  account: accountReducer,
  sendfile: sendFileReducer,
  notification: notificationReducer,
  documentreceivers: documentReceiverReducer,
  countdepartment: countdepartmentReducer,
  announcement: announcementReducer,
  announcementreceivers: announcementReceiverReducer,
  facultyfiles: facultyFilesReducer,
  audit_trail: auditReducer,
  archive: archiveReducer,
});

const rootReducer = (state, action) => {
  if (action.type === actions.LOGOUT2_REQUEST) state = undefined;
  return reducers(state, action);
};

export default persistReducer(persistConfig, rootReducer);
