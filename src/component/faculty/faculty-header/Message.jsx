import React, { useState } from "react";
import {
  Avatar,
  Badge,
  Box,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
} from "@mui/material";
import { useStyles } from "./style";
import ForumIcon from "@mui/icons-material/Forum";

const Message = () => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const dropDownMenu = [
    { label: "Alex", desc: "likes your feeds..." },
    { label: "Kishor", desc: "likes your feeds..." },
    { label: "Musa", desc: "likes your feeds..." },
    { label: "Robin", desc: "likes your feeds..." },
  ];

  return (
    <Box>
      <Button
        className={classes.menuColor}
        id="basic-button"
        aria-controls={open ? "message" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <Badge badgeContent={3} color="secondary">
          <ForumIcon />
        </Badge>
      </Button>
      <Menu
        id="message"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <List className={classes.navlist}>
          {dropDownMenu.map((item, i) => (
            <ListItem key={i} onClick={handleClose}>
              <ListItemIcon>
                <Avatar className={classes.ulAvatar}>
                  {item.label[0].toUpperCase()}
                </Avatar>
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                secondary={item.desc}
              ></ListItemText>
            </ListItem>
          ))}
        </List>
      </Menu>
    </Box>
  );
};

export default Message;
