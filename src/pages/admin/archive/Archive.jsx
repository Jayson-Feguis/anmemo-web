import React from "react";
import { AdminNavBar, AdminArchive } from "../../../component/Component";
import { Box } from "@mui/material";

function Archive(props) {
  const { mobileOpen, handleDrawerToggle, handleDrawerClose } = props;
  return (
    <>
      <AdminNavBar />
      <Box padding={{ xs: "10px", md: "0px 0px 0px 250px" }}>
        <AdminArchive />
      </Box>
    </>
  );
}

export default Archive;
