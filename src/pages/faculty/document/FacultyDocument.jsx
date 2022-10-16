import React from "react";
import {
  FacultyNavBar,
  FacultyDocument as Document,
} from "../../../component/Component";
import { Box } from "@mui/material";

function FacultyDocument(props) {
  return (
    <>
      <FacultyNavBar />
      <Box padding={{ xs: "10px", md: "0px 0px 0px 0px" }}>
        <Document />
      </Box>
    </>
  );
}

export default FacultyDocument;
