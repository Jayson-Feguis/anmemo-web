import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { actions, loginAction } from "../../redux/action/user/actions";
import {
  actions as ACT,
  accountAction,
} from "../../redux/action/account/actions";
import {
  actions as ACTSENDFILE,
  getDocumentAction,
} from "../../redux/action/send-file/actions";
import {
  actions as ACTNOTIFICATION,
  getNotificationAction,
} from "../../redux/action/notification/actions";
import {
  actions as ACTANNOUNCEMENT,
  getAnnouncementAction,
} from "../../redux/action/announcement/actions";
import {
  actions as ACTFACULTYFILES,
  getFacultyFilesAction,
} from "../../redux/action/faculty-files/actions";
import { Form, Input, Row, Col, message } from "antd";
import { Typography, Box, Button } from "@mui/material";
import "antd/dist/antd.min.css";
import useStyles from "./style";
import _ from "lodash";
import { setToken } from "../../request/axios_instance";
import ROUTES from "../../routes/Routes";

function LoginCard(props) {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [isClick, setClick] = useState(false);
  const { showDrawer } = props;

  const onFinish = (values) => {
    setClick(false);
    dispatch(loginAction(actions.LOGIN_REQUEST, values));
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    if (!_.isNil(user?.data)) {
      if (!_.isNil(user.data.token)) {
        if (user.data.auth) {
          setToken(user.data.token);
          dispatch(accountAction(ACT.ACCOUNT_REQUEST));

          if (!_.isNil(user.data.result[0].ACCOUNT_ID)) {
            dispatch(
              getDocumentAction(ACTSENDFILE.GET_DOCUMENT_REQUEST, {
                account_id: user.data.result[0].ACCOUNT_ID,
              })
            );
            dispatch(
              getNotificationAction(
                ACTNOTIFICATION.GET_NOTIFICATION_REQUEST,
                user.data.result[0].ACCOUNT_ID
              )
            );
            dispatch(
              getAnnouncementAction(
                ACTANNOUNCEMENT.GET_ANNOUNCEMENT_REQUEST,
                user.data.result[0].ACCOUNT_ID
              )
            );
            dispatch(
              getFacultyFilesAction(
                ACTFACULTYFILES.GET_FACULTY_FILES_REQUEST,
                user.data.result[0].ACCOUNT_ID
              )
            );
          }
        }
      }

      if (user.data.auth === false) {
        message.warning(user.data.message);
      } else {
        if (user.data.result[0].ACCOUNT_TYPE === 1) {
          navigate(ROUTES.ADMIN);
        } else if (user.data.result[0].ACCOUNT_TYPE === 2) {
          navigate(ROUTES.SECRETARY);
        } else if (
          user.data.result[0].ACCOUNT_TYPE === 3 ||
          user.data.result[0].ACCOUNT_TYPE === 5
        ) {
          navigate(ROUTES.FACULTY_HOME);
        } else if (user.data.result[0].ACCOUNT_TYPE === 4) {
          navigate(ROUTES.DEAN);
        }
      }
    }
  }, [user]);

  function onForgot() {
    window.location = ROUTES.FORGOT;
  }

  return (
    <Box className={classes.loginCard}>
      <Box paddingBottom="20px" paddingTop="20px">
        <Typography fontSize="32px">Login your account</Typography>
      </Box>
      <Form
        name="basic"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className={classes.Form}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
            { whitespace: true },
            { min: 3 },
            { max: 26 },
          ]}
          hasFeedback
        >
          <Input placeholder="Username" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password placeholder="********" />
        </Form.Item>
        {/* <Row gutter={8}>
          <Col span={24}>
            <Form.Item>
              <Typography
                onClick={showDrawer}
                sx={{ "&:hover": { cursor: "pointer" } }}
              >
                Don't have an account? Click here
              </Typography>
            </Form.Item>
          </Col>
        </Row> */}
        <Row gutter={8}>
          <Col span={24}>
            <Form.Item>
              <Typography
                onClick={onForgot}
                sx={{ "&:hover": { cursor: "pointer" } }}
              >
                Forgotten Password?
              </Typography>
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Button type="submit" variant="contained">
            Sign In
          </Button>
        </Form.Item>
      </Form>
    </Box>
  );
}

export default LoginCard;
