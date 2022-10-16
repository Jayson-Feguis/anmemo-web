import React, { useContext } from "react";
import { NavigationContext } from "../../../context/context";
import AdminHeader from "./AdminHeader";
import LeftPanel from "../admin-left-side-panel/LeftPanel";

function AdminNavBar(props) {
  const { mobileOpen, setMobileOpen } = useContext(NavigationContext);

  // open drawer handler
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // close drawer handler
  const handleDrawerClose = () => {
    setMobileOpen(false);
  };

  return (
    <>
      <AdminHeader
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
        handleDrawerClose={handleDrawerClose}
      />
      <LeftPanel
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
        handleDrawerClose={handleDrawerClose}
      />
    </>
  );
}

export default AdminNavBar;
