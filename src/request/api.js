const departmentEndpoint = (endpoint) => "department/" + endpoint;
const accountEndpoint = (endpoint) => "account/" + endpoint;
const sendFileEndpoint = (endpoint) => "send-file/" + endpoint;
const notificationEndpoint = (endpoint) => "notification/" + endpoint;
const countDepartmentEndpoint = (endpoint) => "countDepartment/" + endpoint;
const documentReceiversEndpoint = (endpoint) =>
  "document-receivers/" + endpoint;
const announcementEndpoint = (endpoint) => "announcement/" + endpoint;
const announcementReceiversEndpoint = (endpoint) =>
  "announcement-receivers/" + endpoint;
const facultyFilesEndpoint = (endpoint) => "faculty-files/" + endpoint;
const auditEndpoint = (endpoint) => "audit/" + endpoint;
const archiveEndpoint = (endpoint) => "archive/" + endpoint;
const Api = {
  LOGIN: "login",
  REGISTER: "register",
  GETEMAIL: "getemail",
  RESETPASS: "resetpass",
  LOGOUT2: "logout2",
  GET_DEPARTMENTCOUNT: countDepartmentEndpoint("get"),

  GET_DEPARTMENT: departmentEndpoint("get"),
  RESTORE_DEPARTMENT: departmentEndpoint("restore"),
  ADD_DEPARTMENT: departmentEndpoint("add"),
  UPDATE_DEPARTMENT: departmentEndpoint("update"),
  DELETE_DEPARTMENT: departmentEndpoint("delete"),

  GET_ACCOUNT: accountEndpoint("get"),
  UPDATE_ACCOUNT: accountEndpoint("update"),
  DELETE_ACCOUNT: accountEndpoint("delete"),
  APPROVE_ACCOUNT: accountEndpoint("approved"),
  RESTORE_ACCOUNT: accountEndpoint("restore"),

  UPLOAD_FILE: sendFileEndpoint("upload"),
  GET_DOCUMENT: sendFileEndpoint("get"),
  SEND_FILE: sendFileEndpoint("send"),
  DELETE_DOCUMENT: sendFileEndpoint("delete"),

  GET_NOTIFICATION: notificationEndpoint("get"),
  UPDATE_NOTIFICATION: notificationEndpoint("update"),
  DELETE_NOTIFICATION: notificationEndpoint("delete"),

  GET_DOCUMENT_RECEIVERS: documentReceiversEndpoint("get"),
  DELETE_DOCUMENT_RECEIVERS: documentReceiversEndpoint("delete"),

  GET_ANNOUNCEMENT: announcementEndpoint("get"),
  ADD_ANNOUNCEMENT: announcementEndpoint("add"),
  UPDATE_ANNOUNCEMENT: announcementEndpoint("update"),
  DELETE_ANNOUNCEMENT: announcementEndpoint("delete"),

  GET_ANNOUNCEMENT_RECEIVERS: announcementReceiversEndpoint("get"),
  DELETE_ANNOUNCEMENT_RECEIVERS: announcementReceiversEndpoint("delete"),

  GET_FACULTY_FILES: facultyFilesEndpoint("get"),
  SEARCH_FACULTY_FILES: facultyFilesEndpoint("search"),

  GET_AUDIT: auditEndpoint("get"),

  GET_ARCHIVE: archiveEndpoint("get"),
};

export default Api;
