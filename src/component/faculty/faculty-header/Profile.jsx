import React, { useState, useEffect } from "react";
import {
  Avatar,
  Box,
  Button,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import _ from "lodash";
import { useStyles } from "./style";
import { useDispatch, useSelector } from "react-redux";
import {
  actions,
  logoutAction,
  logout2Action,
} from "../../../redux/action/user/actions";

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}
function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}

const Profile = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const account = useSelector((state) => state.account);
  const [initialValueEdit, setInitialValueEdit] = useState({
    user_id: null,
  });
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const dropDownMenu = [{ label: "Logout", icon: <LogoutIcon /> }];

  const logoutAccount = (id) => {
    dispatch(
      logout2Action(actions.LOGOUT2_REQUEST, {
        user_id: !_.isNil(user.data) ? user.data.result[0].ACCOUNT_ID : null,
      })
    );
    dispatch(logoutAction(actions.LOGOUT_REQUEST));
  };

  return (
    <Box>
      <Avatar
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{ "&:hover": { cursor: "pointer" } }}
        src={
          !_.isNil(user?.data?.result[0]?.ACCOUNT_PICTURE)
            ? process.env.REACT_APP_DOCUMENT_STATIC_ENDPOINT +
              user?.data?.result[0]?.ACCOUNT_PICTURE
            : process.env.REACT_APP_DOCUMENT_STATIC_ENDPOINT + "user.png"
        }
      />
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {dropDownMenu.map((item, i) => (
          <MenuItem
            key={i}
            component={ListItem}
            onClick={item.label === "Logout" ? logoutAccount : handleClose}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText>{item.label}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default Profile;
