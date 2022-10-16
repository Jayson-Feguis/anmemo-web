import { all, fork } from "redux-saga/effects";
import { userWatcher } from "./user/saga";
import { departmentWatcher } from "./department/saga";
import { accountWatcher } from "./account/saga";
import { sendFileWatcher } from "./send-file/saga";
import { notificationWatcher } from "./notification/saga";
import { documentReceiversWatcher } from "./document-receivers/saga";
import { countdepartmentWatcher } from "./countDepartment/saga";
import { announcementWatcher } from "./announcement/saga";
import { announcementReceiversWatcher } from "./announcement-receivers/saga";
import { facultyFilesWatcher } from "./faculty-files/saga";
import { auditWatcher } from "./audit/saga";
import { archiveWatcher } from "./archive/saga";
export default function* rootSaga() {
  yield all([
    userWatcher(),
    departmentWatcher(),
    accountWatcher(),
    sendFileWatcher(),
    notificationWatcher(),
    documentReceiversWatcher(),
    countdepartmentWatcher(),
    announcementWatcher(),
    announcementReceiversWatcher(),
    facultyFilesWatcher(),
    auditWatcher(),
    archiveWatcher(),
  ]);
}
