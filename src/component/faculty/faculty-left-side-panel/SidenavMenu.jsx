import {
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useStyles } from "./style";
import ROUTES from "../../../routes/Routes";
import { navItems } from "../faculty-header/nav-items";

const SidenavMenu = (props) => {
  const { handleDrawerClose } = props;
  const [isPath, setPath] = useState(1);
  const classes = useStyles();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const pathname = location.pathname;
    if (pathname === "/faculty/home") {
      setPath(1);
    } else if (pathname === "/faculty/document") {
      setPath(2);
    }
  }, [location]);

  return (
    <List sx={{ zIndex: -1 }}>
      {navItems.map((item, i) => (
        <Button
          key={i}
          sx={{ width: "100%" }}
          size="small"
          onClick={() => {
            handleDrawerClose();
            navigate(item.link);
          }}
        >
          <ListItem
            className={
              isPath === item.id ? classes.navlinksactive : classes.navlinks
            }
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText>{item.label}</ListItemText>
          </ListItem>
        </Button>
      ))}
    </List>
  );
};

export default SidenavMenu;
