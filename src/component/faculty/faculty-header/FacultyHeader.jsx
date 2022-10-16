import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Toolbar,
} from "@mui/material";
import React from "react";
import Message from "./Message";
import { Notification } from "../../Component";
import Profile from "./Profile";
import MenuIcon from "@mui/icons-material/Menu";
import { navItems } from "./nav-items";
import { useNavigate, useLocation } from "react-router-dom";
import { HEADER_COLOR, SECONDARY_COLOR } from "../../../utils/constant";

const FacultyHeader = (props) => {
  const { handleDrawerToggle } = props;
  const navigate = useNavigate();
  const location = useLocation();
  let navigationItems = navItems;

  return (
    <AppBar
      position="sticky"
      sx={{
        background: HEADER_COLOR,
        zIndex: 10,
      }}
    >
      <Container
        sx={{
          background: HEADER_COLOR,
        }}
        maxWidth="xl"
      >
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              gap: "10px",
            }}
          >
            {navigationItems.map((value, index) => (
              <Button
                variant="text"
                key={index}
                onClick={() => navigate(value.link)}
                sx={{
                  color: value.link === location.pathname ? "black" : "white",
                  backgroundColor:
                    value.link === location.pathname ? SECONDARY_COLOR : "none",
                  "&:hover": {
                    color: "black !important",
                    backgroundColor: `${SECONDARY_COLOR} !important`,
                  },
                }}
              >
                {value.label}
              </Button>
            ))}
          </Box>
          <Box
            sx={{
              flexGrow: 0,
              display: { xs: "flex", md: "flex", alignItems: "center" },
            }}
          >
            <Notification />
            {/* <Message /> */}
            <Profile />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default FacultyHeader;
