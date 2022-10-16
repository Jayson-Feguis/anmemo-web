import React from "react";
import { AdminNavBar, AdminAnnouncement } from "../../../component/Component";
import { Box } from "@mui/material";

function Announcement(props) {
  const { mobileOpen, handleDrawerToggle, handleDrawerClose } = props;
  return (
    <>
      <AdminNavBar />
      <Box>
        <AdminAnnouncement />
      </Box>
    </>
  );
}

export default Announcement;
