import React from "react";
import { AdminNavBar, AdminAccount } from "../../../component/Component";
import { Box } from "@mui/material";

function Account(props) {
  const { mobileOpen, handleDrawerToggle, handleDrawerClose } = props;
  return (
    <>
      <AdminNavBar />
      <Box>
        <AdminAccount />
      </Box>
    </>
  );
}

export default Account;
