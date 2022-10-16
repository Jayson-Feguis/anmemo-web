import React from "react";
import {
  FacultyNavBar,
  FacultyHome as Home,
} from "../../../component/Component";
import { Box } from "@mui/material";

function FacultyHome(props) {
  return (
    <>
      <FacultyNavBar />
      <Box padding={{ xs: "10px", md: "0px 0px 0px 0px" }}>
        <Home />
      </Box>
    </>
  );
}

export default FacultyHome;
