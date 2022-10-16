import React from "react";
import { AdminNavBar, AdminDashboard } from "../../component/Component";
import { Box } from "@mui/material";
import { DIRTY_WHITE_COLOR } from "../../utils/constant";

const Header = (props) => {
  const { mobileOpen, handleDrawerToggle, handleDrawerClose } = props;

  return (
    <Box>
      <AdminNavBar />
      <Box background={DIRTY_WHITE_COLOR}>
        <AdminDashboard />
      </Box>
    </Box>
  );
};

export default Header;
