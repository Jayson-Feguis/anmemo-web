import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  Login,
  Admin,
  Audit,
  Account,
  Department,
  SendFile,
  Announcement,
  FacultyHome,
  FacultyDocument,
  FacultyAnnouncement,
  FacultyMemorandum,
  PageNotFound,
  ForgotPassword,
  Archive,
  AccountArchive,
  Editor,
} from "../pages/Pages";
import "./App.css";
import Public from "../view/Public";
import Private from "../view/Private";
import ROUTES from "../routes/Routes";
import { NavigationContext } from "../context/context";

function App() {
  const pages = [
    { path: ROUTES.LOGIN, component: Login, view: Public },
    { path: ROUTES.PAGENOTFOUND, component: PageNotFound, view: Public },
    { path: ROUTES.ADMIN, component: Admin, view: Private },
    { path: ROUTES.EDITOR, component: Editor, view: Private },
    { path: ROUTES.ACCOUNT, component: Account, view: Private },
    { path: ROUTES.ARCHIVE, component: Archive, view: Private },
    { path: ROUTES.ARCHIVE_ACCOUNT, component: AccountArchive, view: Private },
    { path: ROUTES.AUDIT, component: Audit, view: Private },
    { path: ROUTES.DEPARTMENT, component: Department, view: Private },
    { path: ROUTES.ANNOUNCEMENT, component: Announcement, view: Private },
    { path: ROUTES.SENDFILE, component: SendFile, view: Private },
    {
      path: ROUTES.FACULTY_HOME,
      component: FacultyAnnouncement,
      view: Private,
    },
    {
      path: ROUTES.FACULTY_DOCUMENT,
      component: FacultyDocument,
      view: Private,
    },
    {
      path: ROUTES.FACULTY_ANNOUNCEMENT,
      component: FacultyAnnouncement,
      view: Private,
    },
    {
      path: ROUTES.FACULTY_MEMORANDUM,
      component: FacultyMemorandum,
      view: Private,
    },
    { path: ROUTES.SECEDITOR, component: Editor, view: Private },
    { path: ROUTES.SECSENDFILE, component: SendFile, view: Private },
    { path: ROUTES.SECRETARY, component: Admin, view: Private },
    { path: ROUTES.FORGOT, component: ForgotPassword, view: Public },
    { path: ROUTES.DEANEDITOR, component: Editor, view: Private },
    { path: ROUTES.DEANSENDFILE, component: SendFile, view: Private },
    { path: ROUTES.DEAN, component: Admin, view: Private },
    { path: ROUTES.DEANANNOUNCEMENT, component: Announcement, view: Private },
  ];

  // drawer open state
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="App">
      <NavigationContext.Provider value={{ mobileOpen, setMobileOpen }}>
        <BrowserRouter>
          <Routes>
            {pages.map(({ path, component: Component, view: View }, index) => (
              <Route
                path={path}
                key={index}
                element={<View children={<Component />} />}
              />
            ))}
          </Routes>
        </BrowserRouter>
      </NavigationContext.Provider>
    </div>
  );
}

export default App;
