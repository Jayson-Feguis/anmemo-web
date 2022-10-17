import {
  AppBar,
  Box,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Notification } from "../../Component";
import Profile from "./Profile";
import MenuIcon from "@mui/icons-material/Menu";
import _ from "lodash";
import { useSelector } from "react-redux";
import { HEADER_COLOR } from "../../../utils/constant";
const AdminHeader = (props) => {
  const { handleDrawerToggle } = props;

  const [isUser, setUser] = useState(null);

  const user = useSelector((state) => state.user);
  useEffect(() => {
    if (!_.isNil(user.data)) {
      setUser(user.data.result);
    }
  }, [user]);

  function userType(type) {
    if (type === 1) {
      return "Administrator Panel";
    } else if (type === 2) {
      return "Secretary Panel";
    } else if (type === 4) {
      return "Dean Panel";
    } else {
      return null;
    }
  }

  function userType2(type) {
    if (type === 1) {
      return "Administrator";
    } else if (type === 2) {
      return "Secretary";
    } else if (type === 4) {
      return "Dean";
    } else {
      return null;
    }
  }
  return (
    <AppBar
      position="sticky"
      sx={{
        background: HEADER_COLOR,
      }}
    >
      <Container
        sx={{
          background: HEADER_COLOR,
        }}
        maxWidth="xl"
      >
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href=""
            sx={{
              ml: 5,
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontWeight: "700",
              fontFamily: "Montserrat",
              fontSize: "22px",
              letterSpacing: ".2rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            {!_.isNil(user.data)
              ? user.data.result.length > 0
                ? userType(user.data.result[0].ACCOUNT_TYPE)
                : null
              : null}
          </Typography>

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
            {/* <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            <Notification />
                            <Message />
                            <Profile />
                        </Menu> */}
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "Montserrat",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            {!_.isNil(user.data)
              ? user?.data?.result.length > 0
                ? userType(user?.data?.result[0].ACCOUNT_TYPE)
                : null
              : null}
          </Typography>
          <Box sx={{ flexGrow: 1 }}></Box>

          <Box
            sx={{
              flexGrow: 0,
              display: { xs: "flex", md: "flex", alignItems: "center" },
            }}
          >
            <Notification />
            <Box
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
            >
              <Profile />

              <Typography
                sx={{
                  fontSize: "13px",
                  color: "white",
                  marginLeft:
                    user?.data?.result[0].ACCOUNT_TYPE === 1
                      ? "-18px"
                      : user?.data?.result[0].ACCOUNT_TYPE === 4
                      ? "-7px"
                      : user?.data?.result[0].ACCOUNT_TYPE === 2
                      ? "-10px"
                      : null,
                }}
              >
                {userType2(user?.data?.result[0].ACCOUNT_TYPE)}
              </Typography>
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default AdminHeader;
