import React, { useContext, useState } from "react";
import { NavigationContext } from "../../../context/context";
import FacultyHeader from "./FacultyHeader";
import LeftPanel from "../faculty-left-side-panel/LeftPanel";

function FacultyNavBar(props) {
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
      <FacultyHeader
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

export default FacultyNavBar;
