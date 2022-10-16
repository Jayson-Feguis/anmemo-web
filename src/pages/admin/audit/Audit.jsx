import React from "react";
import { AdminNavBar, AdminAudit } from "../../../component/Component";
import { Box } from "@mui/material";

function Audit(props) {
  const { mobileOpen, handleDrawerToggle, handleDrawerClose } = props;
  return (
    <>
      <AdminNavBar />
      <Box>
        <AdminAudit />
      </Box>
    </>
  );
}

export default Audit;
