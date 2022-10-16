import React from "react";
import {
  FacultyNavBar,
  FacultyAnnouncement as Announcement,
} from "../../../component/Component";
import { Box } from "@mui/material";

function FacultyAnnouncement(props) {
  return (
    <>
      <FacultyNavBar />
      <Box padding={{ xs: "10px", md: "0px 0px 0px 0px" }}>
        <Announcement />
      </Box>
    </>
  );
}

export default FacultyAnnouncement;
