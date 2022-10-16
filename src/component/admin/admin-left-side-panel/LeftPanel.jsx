import { Box, Drawer } from "@mui/material";
import React from "react";
import SidenavMenu from "./SidenavMenu";

const LeftPanel = (props) => {
  const { mobileOpen, handleDrawerToggle, handleDrawerClose } = props;

  const drawerWidth = 240;

  /* const [mobileOpen, setMobileOpen] = useState(false);
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    }; */

  return (
    <Box
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 }, position: 'relative', zIndex: 1}}
      aria-label="mailbox folders"
    >
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        <SidenavMenu handleDrawerClose={handleDrawerClose}></SidenavMenu>
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            marginTop: "65px",
          },
        }}
        open
      >
        <SidenavMenu handleDrawerClose={handleDrawerClose}></SidenavMenu>
      </Drawer>
    </Box>
  );
};

export default LeftPanel;
