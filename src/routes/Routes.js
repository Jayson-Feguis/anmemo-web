const ROUTES = {
  LOGIN: "/",
  PAGENOTFOUND: "/*",
  FORGOT: "/forgot-password",

  //ADMIN
  ADMIN: "/admin",
  ACCOUNT: "/admin/accounts",
  AUDIT: "/admin/audit",
  ARCHIVE: "/admin/archive",
  DEPARTMENT: "/admin/department",
  ANNOUNCEMENT: "/admin/announcement",
  SENDFILE: "/admin/send-file",
  EDITOR: "/admin/editor",

  ARCHIVE_ACCOUNT: "/admin/archive/account",
  ARCHIVE_DEPARTMENT: "/admin/archive/department",
  ARCHIVE_DOCUMENT: "/admin/archive/document",
  //SECRETARY
  SECEDITOR: "/secretary/editor",
  SECANNOUNCEMENT: "/secretary/announcement",
  SECSENDFILE: "/secretary/send-file",
  SECRETARY: "/secretary",
  //FACULTY
  FACULTY_HOME: "/faculty/home",
  FACULTY_DOCUMENT: "/faculty/document",
  FACULTY_MEMORANDUM: "/faculty/memorandum",
  FACULTY_ANNOUNCEMENT: "/faculty/announcement",
  //Dean
  DEANEDITOR: "/dean/editor",
  DEANANNOUNCEMENT: "/dean/announcement",
  DEANSENDFILE: "/dean/send-file",
  DEAN: "/dean",
};

export default ROUTES;
