import React, { useState, useEffect } from "react";
import {
  Avatar,
  Badge,
  Box,
  Button,
  ToggleButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  Tooltip,
  Checkbox,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useStyles } from "./style";
import { useDispatch, useSelector } from "react-redux";
import {
  actions as ACTNOTIFICATION,
  getNotificationAction,
  updateNotificationAction,
  deleteNotificationAction,
} from "../../redux/action/notification/actions";
import _ from "lodash";
import io from "socket.io-client";
import ModalNotification from "./ModalNotification";
import { TbUrgent } from "react-icons/tb";
import { BsExclamationLg } from "react-icons/bs";
import { notification as notificationComponent } from "antd";
import "antd/dist/antd.min.css";
import { IoIosTrash } from "react-icons/io";
import { AiOutlineRead } from "react-icons/ai";
import { BiSelectMultiple } from "react-icons/bi";
import { render } from "react-dom";

const socket = io.connect(process.env.REACT_APP_SOCKET_SERVER);
const Notification = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const notification = useSelector((state) => state.notification);
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationList, setNotificationList] = useState(null);
  const [visible, setVisible] = useState(false);
  const [notificationModalContent, setNotificationModalContent] =
    useState(null);
  const [notificationCount, setNotificationCount] = useState(null);
  const [toggle, setToggle] = useState(false);
  const [isEnable, setIsEnable] = useState(false);
  const [checkedNotification, setCheckedNotification] = useState([]);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (notif) => {
    setAnchorEl(null);
    setCheckedNotification([]);
    setToggle(false);
    setIsEnable(false);
  };

  useEffect(() => {
    if (!_.isNil(notification.data)) {
      setNotificationList(notification.data.result);
    }

    socket.on("get_notification", (data) => {
      if (data.message === "get_notification") {
        if (!_.isNil(user.data)) {
          if (!_.isNil(user.data.result[0].ACCOUNT_ID)) {
            dispatch(
              getNotificationAction(
                ACTNOTIFICATION.GET_NOTIFICATION_REQUEST,
                user.data.result[0].ACCOUNT_ID
              )
            );
          }
        }
      }
    });

    handleUnreadNotification();
  }, [notification, notificationCount, notificationList, socket]);

  useEffect(() => {
    handleTriggerUrgentNotification();
  });

  //NOTIFICATION COUNT
  const handleUnreadNotification = () => {
    let unread =
      !_.isNil(notification.data) && notification.data.result.length > 0
        ? notification.data.result
        : [];

    if (!_.isNil(unread)) {
      const count = unread.filter((notif) => notif.NOTIF_STATUS === 1);
      setNotificationCount(count.length);
    } else {
      setNotificationCount(null);
    }
  };

  const handleTriggerUrgentNotification = () => {
    let urgent1 = [];
    let j = 0;

    if (
      !_.isNil(notification.data) &&
      notification.data.result.length > 0 &&
      j === 0
    ) {
      urgent1 = notification.data.result.filter(
        (notif) => notif.URGENCY_LEVEL === 3 && notif.NOTIF_STATUS === 1
      );

      if (!_.isEmpty(urgent1) && !_.isNil(urgent1) && j === 0) {
        urgent1.map((item) => openNotification(item, j));
      }
    }

    setInterval(() => {
      let urgent = [];
      let i = 0;

      if (
        !_.isNil(notification.data) &&
        notification.data.result.length > 0 &&
        i === 0
      ) {
        urgent = notification.data.result.filter(
          (notif) => notif.URGENCY_LEVEL === 3 && notif.NOTIF_STATUS === 1
        );

        if (!_.isEmpty(urgent) && !_.isNil(urgent) && i === 0) {
          urgent.map((item) => openNotification(item, i));
        }
        i = i + 1;
      }
    }, 180000);
  };

  const openNotification = (urgent, i) => {
    if (i === 0) {
      notificationComponent.open({
        message: urgent.NOTIF_TITLE,
        description: urgent.NOTIF_CONTENT,
        icon:
          urgent.URGENCY_LEVEL === 3 ? (
            <TbUrgent style={{ color: "red", fontSize: "32px" }} />
          ) : urgent.URGENCY_LEVEL === 2 ? (
            <BsExclamationLg style={{ color: "orange", fontSize: "32px" }} />
          ) : null,
      });
    }
  };

  const handleCheckbox = (e) => {
    let list = checkedNotification;
    if (e.target.checked === true) {
      list.push(e.target.value);
    } else {
      list = list.filter((id) => id !== e.target.value);
    }
    setCheckedNotification(list);

    if (toggle && !_.isEmpty(list)) {
      setIsEnable(true);
    } else {
      setIsEnable(false);
    }
  };

  const handleDeleteNotification = () => {
    dispatch(
      deleteNotificationAction(ACTNOTIFICATION.DELETE_NOTIFICATION_REQUEST, {
        notif_id: checkedNotification,
        account_id: !_.isNil(user.data) ? user.data.result[0].ACCOUNT_ID : null,
      })
    );

    setCheckedNotification([]);
    setToggle(false);
    setIsEnable(false);
  };

  const handleMarkAllAsRead = () => {
    let unread = [];
    notification.data.result
      .filter((notif) => notif.NOTIF_STATUS === 1)
      .map((item) => unread.push(item.NOTIF_ID));

    if (!_.isEmpty(unread)) {
      dispatch(
        updateNotificationAction(ACTNOTIFICATION.UPDATE_NOTIFICATION_REQUEST, {
          notif_id: unread,
          account_id: !_.isNil(user.data)
            ? user.data.result[0].ACCOUNT_ID
            : null,
        })
      );
    }

    setCheckedNotification([]);
    setToggle(false);
    setIsEnable(false);
  };

  return (
    <Box>
      <Button
        className={classes.menuColor}
        id="basic-button"
        aria-controls={open ? "notification" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <Badge badgeContent={notificationCount} color="secondary">
          <NotificationsIcon />
        </Badge>
      </Button>
      <Menu
        id="notification"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <Box display="flex">
          <Tooltip title="Select">
            <ToggleButton
              selected={toggle}
              onChange={() => {
                setToggle(!toggle);
                setIsEnable(false);
                if (!toggle) {
                  setCheckedNotification([]);
                }
              }}
            >
              <BiSelectMultiple />
            </ToggleButton>
          </Tooltip>

          <Tooltip title="Delete">
            <span>
              <ToggleButton
                disabled={!isEnable}
                onClick={handleDeleteNotification}
              >
                <IoIosTrash />
              </ToggleButton>
            </span>
          </Tooltip>

          <Tooltip title="Mark all as read">
            <span>
              <ToggleButton onClick={handleMarkAllAsRead}>
                <AiOutlineRead />
              </ToggleButton>
            </span>
          </Tooltip>
        </Box>
        <List className={classes.navlist}>
          {!_.isNil(notification.data) &&
          notification.data.result.length > 0 ? (
            notification.data.result.map((item, i) => (
              <Box display="flex">
                {toggle && (
                  <Checkbox
                    onChange={(e) => handleCheckbox(e)}
                    value={item.NOTIF_ID}
                  />
                )}
                <ListItem
                  key={i}
                  onClick={() => {
                    handleClose(item);
                    setVisible(true);
                    setNotificationModalContent(item);
                    if (item.NOTIF_STATUS === 1) {
                      let unread = [];
                      unread.push(item.NOTIF_ID);
                      if (!_.isEmpty(unread)) {
                        dispatch(
                          updateNotificationAction(
                            ACTNOTIFICATION.UPDATE_NOTIFICATION_REQUEST,
                            {
                              account_id: user.data.result[0].ACCOUNT_ID,
                              notif_id: unread,
                            }
                          )
                        );
                      }
                    }
                  }}
                  sx={{
                    "&:hover": {
                      backgroundColor: "lightgray",
                    },
                    transition: "all ease 0.5s",
                    position: "relative",
                  }}
                >
                  <ListItemIcon>
                    <Badge
                      variant={item.NOTIF_STATUS === 1 ? "dot" : null}
                      color="secondary"
                    >
                      <Avatar className={classes.ulAvatar}>
                        {item.NOTIF_CONTENT[0].toUpperCase()}
                      </Avatar>
                    </Badge>
                  </ListItemIcon>

                  <ListItemText
                    sx={{
                      fontSize: "100px !important",
                      "&.MuiListItemText-root": {
                        fontSize: "10px !important",
                      },
                      "&.MuiListItemText-secondary": {
                        textOverflow: "ellipsis !important",
                      },
                    }}
                    primary={item.NOTIF_TITLE}
                    secondary={
                      <div
                        dangerouslySetInnerHTML={{ __html: item.NOTIF_CONTENT }}
                      />
                    }
                  />
                  <Tooltip
                    title={
                      item.URGENCY_LEVEL === 3
                        ? "Urgent"
                        : item.URGENCY_LEVEL === 2
                        ? "Priority"
                        : null
                    }
                  >
                    <Box sx={{ position: "absolute", top: 15, right: 90 }}>
                      {item.URGENCY_LEVEL === 3 ? (
                        <TbUrgent style={{ color: "red", fontSize: "18px" }} />
                      ) : item.URGENCY_LEVEL === 2 ? (
                        <BsExclamationLg
                          style={{ color: "orange", fontSize: "18px" }}
                        />
                      ) : null}
                    </Box>
                  </Tooltip>
                </ListItem>
              </Box>
            ))
          ) : (
            <ListItem>You have no notification</ListItem>
          )}
        </List>
      </Menu>
      <ModalNotification
        visible={visible}
        setVisible={setVisible}
        notificationModalContent={notificationModalContent}
      />
    </Box>
  );
};

export default Notification;
