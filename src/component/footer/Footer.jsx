import React from "react";
import { Typography, Grid, Box } from "@mui/material";
function Footer(props) {
  return (
    <Box
      width="100%"
      backgroundColor="#FEBA29"
      zIndex="1"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bottom={0}
      left={0}
      right={0}
      padding="40px 0px"
    >
      <Typography>© 2022 ANMEMO. All rights reserved.</Typography>
    </Box>
  );
}

export default Footer;
