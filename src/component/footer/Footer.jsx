import React from "react";
import { Typography, Grid, Box } from "@mui/material";
function Footer(props) {
  return (
    <Box
      width="100%"
      height="10%"
      backgroundColor="#FEBA29"
      zIndex="1"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bottom={0}
      left={0}
      right={0}
      position="fixed"
    >
      <Typography>© 2022 ANMEMO. All rights reserved.</Typography>
    </Box>
  );
}

export default Footer;
