import React from "react";
import { AdminNavBar, AdminSendFile } from "../../../component/Component";
import { Box } from "@mui/material";

function SendFile(props) {
  return (
    <>
      <AdminNavBar />
      <Box>
        <AdminSendFile />
      </Box>
    </>
  );
}

export default SendFile;
