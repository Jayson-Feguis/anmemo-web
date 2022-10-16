import React, { useEffect, useState } from "react";
import useStyles from "./style";
import { Typography, Grid, Box, Button } from "@mui/material";
import { Drawer, Space, Button as AntButton } from "antd";
import io from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import {
  actions,
  departmentAction,
} from "../../redux/action/department/actions";
import {
  actions as act,
  departmentActionCount,
} from "../../redux/action/countDepartment/actions";
import LoginCard from "./LoginCard";
import RegistrationCard from "./RegistrationCard";
import _ from "lodash";
const socket = io.connect(process.env.REACT_APP_SOCKET_SERVER);

function BodyLogin(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  // const sendMessage = () => {
  //     socket.emit("send_message", {message: 'Hello Jayson'})
  // }

  useEffect(() => {
    dispatch(departmentAction(actions.DEPARTMENT_REQUEST));
    dispatch(departmentActionCount(act.COUNT_DEPARTMENT_REQUEST));
    // socket.on("receive_message", (data) => {
    //     console.log(data);
    // });
  }, []);

  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  useEffect(() => {
    if (!_.isNil(user?.data)) {
      if (!_.isNil(user?.success_msg)) {
        console.log("sdasd");
      }
    }
  }, [user]);

  return (
    <Box className={classes.loginContainer}>
      <LoginCard showDrawer={showDrawer} />
      {/* <Drawer
        title="Create your account"
        placement="top"
        width={500}
        onClose={onClose}
        visible={visible}
        height={600}
        style={{
          display: "flex",
          justifyContent: "center",
        }}
        extra={<Space></Space>}
      >
        <RegistrationCard />
      </Drawer> */}
    </Box>
  );
}

export default BodyLogin;
