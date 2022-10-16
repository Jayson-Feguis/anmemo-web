import React from "react";
import {
  FacultyNavBar,
  FacultyMemorandum as Memorandum,
} from "../../../component/Component";
import { Box } from "@mui/material";

function FacultyMemorandum(props) {
  return (
    <>
      <FacultyNavBar />
      <Box padding={{ xs: "10px", md: "0px 0px 0px 0px" }}>
        <Memorandum />
      </Box>
    </>
  );
}

export default FacultyMemorandum;
