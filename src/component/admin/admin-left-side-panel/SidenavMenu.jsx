import {
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
} from "@mui/material";
import {
  DashboardRounded,
  Send,
  Person,
  HistoryEdu,
  AccountBalance,
  VerifiedUser,
  TextFields,
} from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useStyles } from "./style";
import ROUTES from "../../../routes/Routes";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";
import { actions, auditAction } from "../../../redux/action/audit/actions";
import {
  actions as act,
  archiveAction,
} from "../../../redux/action/archive/actions";
import { NavLink } from "react-router-dom";
import {
  actions as acc,
  accountAction,
} from "../../../redux/action/account/actions";
import {
  actions as depAction,
  departmentAction,
} from "../../../redux/action/department/actions";
import {
  actions as ACTSENDFILE,
  getDocumentAction,
} from "../../../redux/action/send-file/actions";

const SidenavMenu = (props) => {
  const { handleDrawerClose } = props;
  const [isPath, setPath] = useState("");
  const location = useLocation();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [isUser, setUser] = useState(null);

  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (!_.isNil(user.data)) {
      setUser(user.data.result);
    }
  }, [user]);
  const listItemData = [
    {
      id: "1",
      label: "Dashboard",
      link: ROUTES.ADMIN,
      icon: <DashboardRounded />,
    },
    { id: "2", label: "Account", link: ROUTES.ACCOUNT, icon: <Person /> },
    // {
    //   id: "3",
    //   label: "Department",
    //   link: ROUTES.DEPARTMENT,
    //   icon: <AccountBalance />,
    // },
    {
      id: "4",
      label: "Post Announcement",
      link: ROUTES.ANNOUNCEMENT,
      icon: <HistoryEdu />,
    },
    {
      id: "5",
      label: "Send File",
      link: ROUTES.SENDFILE,
      icon: <Send />,
    },
    {
      id: "6",
      label: "Audit Trail",
      link: ROUTES.AUDIT,
      icon: <VerifiedUser />,
    },
    {
      id: "7",
      label: "Generate File",
      link: ROUTES.EDITOR,
      icon: <TextFields />,
    },
  ];

  const listItemData2 = [
    {
      id: "1",
      label: "Dashboard",
      link: ROUTES.SECRETARY,
      icon: <DashboardRounded />,
    },

    {
      id: "5",
      label: "Send File",
      link: ROUTES.SECSENDFILE,
      icon: <Send />,
    },
    {
      id: "7",
      label: "Generate File",
      link: ROUTES.SECEDITOR,
      icon: <TextFields />,
    },
  ];

  const listItemData3 = [
    {
      id: "1",
      label: "Dashboard",
      link: ROUTES.DEAN,
      icon: <DashboardRounded />,
    },
    {
      id: "4",
      label: "Post Announcement",
      link: ROUTES.DEANANNOUNCEMENT,
      icon: <HistoryEdu />,
    },

    {
      id: "5",
      label: "Send File",
      link: ROUTES.DEANSENDFILE,
      icon: <Send />,
    },
    {
      id: "7",
      label: "Generate File",
      link: ROUTES.DEANEDITOR,
      icon: <TextFields />,
    },
  ];

  useEffect(() => {
    const pathname = location.pathname;
    if (pathname === "/admin") {
      setPath("1");
    } else if (pathname === "/admin/accounts") {
      setPath("2");
      dispatch(accountAction(acc.ACCOUNT_REQUEST));
    } else if (pathname === "/admin/department") {
      setPath("3");
      dispatch(departmentAction(depAction.DEPARTMENT_REQUEST));
    } else if (pathname === "/admin/announcement") {
      setPath("4");
    } else if (pathname === "/admin/send-file") {
      setPath("5");
      dispatch(
        getDocumentAction(ACTSENDFILE.GET_DOCUMENT_REQUEST, {
          account_id: user.data.result[0].ACCOUNT_ID,
        })
      );
    } else if (pathname === "/admin/audit") {
      setPath("6");
      dispatch(auditAction(actions.AUDIT_REQUEST));
    } else if (pathname === "/admin/editor") {
      setPath("7");
    }

    if (pathname === "/secretary") {
      setPath("1");
    } else if (pathname === "/secretary/send-file") {
      setPath("5");
      dispatch(
        getDocumentAction(ACTSENDFILE.GET_DOCUMENT_REQUEST, {
          account_id: user?.data?.result[0].ACCOUNT_ID,
        })
      );
    } else if (pathname === "/secretary/editor") {
      setPath("7");
    }

    if (pathname === "/dean") {
      setPath("1");
    } else if (pathname === "/dean/send-file") {
      setPath("5");
      dispatch(
        getDocumentAction(ACTSENDFILE.GET_DOCUMENT_REQUEST, {
          account_id: user?.data?.result[0].ACCOUNT_ID,
        })
      );
    } else if (pathname === "/dean/editor") {
      setPath("7");
    } else if (pathname === "/dean/announcement") {
      setPath("4");
    }
  }, [location]);

  return (
    <>
      <Box component="img" src="/images/logo_anmemo.png" />

      <List sx={{ zIndex: -1 }}>
        {!_.isNil(user.data)
          ? user.data.result.length > 0
            ? user.data.result[0].ACCOUNT_TYPE === 1
              ? listItemData.map((item, i) => (
                  <Button
                    key={i}
                    sx={{ width: "100%" }}
                    size="small"
                    onClick={() => handleDrawerClose()}
                  >
                    <ListItem
                      className={
                        isPath === item.id
                          ? classes.navlinksactive
                          : classes.navlinks
                      }
                      component={NavLink}
                      to={item.link}
                    >
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      <ListItemText>{item.label}</ListItemText>
                    </ListItem>
                  </Button>
                ))
              : null
            : null
          : null}
        {!_.isNil(user.data)
          ? user.data.result.length > 0
            ? user.data.result[0].ACCOUNT_TYPE === 2
              ? listItemData2.map((item, i) => (
                  <Button
                    key={i}
                    sx={{ width: "100%" }}
                    size="small"
                    onClick={() => handleDrawerClose()}
                  >
                    <ListItem
                      className={
                        isPath === item.id
                          ? classes.navlinksactive
                          : classes.navlinks
                      }
                      component={NavLink}
                      to={item.link}
                    >
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      <ListItemText>{item.label}</ListItemText>
                    </ListItem>
                  </Button>
                ))
              : null
            : null
          : null}

        {!_.isNil(user.data)
          ? user.data.result.length > 0
            ? user.data.result[0].ACCOUNT_TYPE === 4
              ? listItemData3.map((item, i) => (
                  <Button
                    key={i}
                    sx={{ width: "100%" }}
                    size="small"
                    onClick={() => handleDrawerClose()}
                  >
                    <ListItem
                      className={
                        isPath === item.id
                          ? classes.navlinksactive
                          : classes.navlinks
                      }
                      component={NavLink}
                      to={item.link}
                    >
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      <ListItemText>{item.label}</ListItemText>
                    </ListItem>
                  </Button>
                ))
              : null
            : null
          : null}
      </List>
    </>
  );
};

export default SidenavMenu;
