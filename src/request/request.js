import api from "./api";
import axiosInstance from "./axios_instance";

export const userRequest = {
  login: (data) => axiosInstance.post(api.LOGIN, data),
  getemail: (data) => axiosInstance.post(api.GETEMAIL, data),
  resetpass: (data) => axiosInstance.post(api.RESETPASS, data),
  logout2: (data) => axiosInstance.post(api.LOGOUT2, data),
};

export const countDepartmentRequest = {
  getDepartmentCount: (data) => axiosInstance.get(api.GET_DEPARTMENTCOUNT),
};
export const departmentRequest = {
  getDepartment: (data) => axiosInstance.get(api.GET_DEPARTMENT),
  addDepartment: (data) => axiosInstance.post(api.ADD_DEPARTMENT, data),
  updateDepartment: (data) => axiosInstance.post(api.UPDATE_DEPARTMENT, data),
  deleteDepartment: (data) => axiosInstance.post(api.DELETE_DEPARTMENT, data),
  restoreDepartment: (data) => axiosInstance.post(api.RESTORE_DEPARTMENT, data),
};

export const accountRequest = {
  getAccount: (data) => axiosInstance.get(api.GET_ACCOUNT),
  updateAccount: (data) => axiosInstance.post(api.UPDATE_ACCOUNT, data),
  deleteAccount: (data) => axiosInstance.post(api.DELETE_ACCOUNT, data),
  approveAccount: (data) => axiosInstance.post(api.APPROVE_ACCOUNT, data),
  restoreAccount: (data) => axiosInstance.post(api.RESTORE_ACCOUNT, data),
  register: (data) => axiosInstance.post(api.REGISTER, data),
};

export const sendFileRequest = {
  uploadFile: (data) => axiosInstance.post(api.UPLOAD_FILE, data),
  getDocument: (data) => axiosInstance.post(api.GET_DOCUMENT, data),
  sendFile: (data) => axiosInstance.post(api.SEND_FILE, data),
  deleteDocument: (data) => axiosInstance.post(api.DELETE_DOCUMENT, data),
};

export const notificationRequest = {
  getNotification: (data) =>
    axiosInstance.get(api.GET_NOTIFICATION + "/" + data),
  updateNotification: (data) =>
    axiosInstance.post(api.UPDATE_NOTIFICATION, data),
  deleteNotification: (data) =>
    axiosInstance.patch(api.DELETE_NOTIFICATION, data),
};

export const documentReceiversRequest = {
  getDocumentReceivers: (data) =>
    axiosInstance.post(api.GET_DOCUMENT_RECEIVERS, data),
  deleteDocumentReceivers: (data) =>
    axiosInstance.post(api.DELETE_DOCUMENT_RECEIVERS, data),
};

export const announcementRequest = {
  getAnnouncement: (data) =>
    axiosInstance.get(api.GET_ANNOUNCEMENT + "/" + data),
  addAnnouncement: (data) => axiosInstance.post(api.ADD_ANNOUNCEMENT, data),
  updateAnnouncement: (data) =>
    axiosInstance.patch(api.UPDATE_ANNOUNCEMENT, data),
  deleteAnnouncement: (data) =>
    axiosInstance.patch(api.DELETE_ANNOUNCEMENT, data),
};

export const announcementReceiversRequest = {
  getAnnouncementReceivers: (data) =>
    axiosInstance.get(api.GET_ANNOUNCEMENT_RECEIVERS + "/" + data),
  deleteAnnouncementReceivers: (data) =>
    axiosInstance.post(api.DELETE_ANNOUNCEMENT_RECEIVERS, data),
};

export const facultyFilesRequest = {
  getFacultyFiles: (data) =>
    axiosInstance.get(api.GET_FACULTY_FILES + "/" + data),
  searchFacultyFiles: (data) =>
    axiosInstance.post(api.SEARCH_FACULTY_FILES, data),
};

export const audtiRequest = {
  getAudit: (data) => axiosInstance.post(api.GET_AUDIT),
};

export const archiveRequest = {
  getArchive: (data) => axiosInstance.post(api.GET_ARCHIVE),
};
