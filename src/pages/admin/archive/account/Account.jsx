import React from "react";
import { AdminNavBar, ArchiveAccount } from "../../../../component/Component";
import { Box } from "@mui/material";

function AccountArchive(props) {
  const { mobileOpen, handleDrawerToggle, handleDrawerClose } = props;
  return (
    <>
      <AdminNavBar />
      <Box padding={{ xs: "10px", md: "0px 0px 0px 250px" }}>
        <ArchiveAccount />
      </Box>
    </>
  );
}

export default AccountArchive;
