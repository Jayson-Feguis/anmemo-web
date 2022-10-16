import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Radio,
  Select,
  Row,
  Col,
  message,
  Modal,
  Spin,
} from "antd";
import { Box, Typography, Grid } from "@mui/material";
import "antd/dist/antd.css";
import "antd/dist/antd.min.css";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { IoIosAdd } from "react-icons/io";
import io from "socket.io-client";
import {
  actions,
  updateAccountAction,
} from "../../../redux/action/account/actions";
import useStyles from "./style";
import CustomTooltip from "./CustomTooltip";
import ExampleChart from "./Bar";
import {
  SECONDARY_COLOR,
  PRIMARY_COLOR,
  DIRTY_WHITE_COLOR,
} from "../../../utils/constant";

function AdminDashboard(props) {
  const classes = useStyles();
  const [isUser, setUser] = useState(null);
  const [isAccount, setAccount] = useState(null);
  const [isSend, setSend] = useState(null);
  const sendfile = useSelector((state) => state.sendfile);
  const account = useSelector((state) => state.account);
  const department = useSelector((state) => state.department);
  const user = useSelector((state) => state.user);
  const [departmentList, setDepartmentList] = useState(null);
  const [chartData, setChartData] = useState([]);
  useEffect(() => {}, [chartData]);

  useEffect(() => {
    if (!_.isNil(user.data)) {
      setUser(user.data.result);
    }
    if (!_.isNil(department.data)) {
      setDepartmentList(department.data.result);
    }
    if (!_.isNil(account.data)) {
      setAccount(account.data.result);
    }
    if (!_.isNil(sendfile.data)) {
      setAccount(sendfile.data.result);
    }
  }, [user]);
  // let departmentName = [];
  // for (var i = 0; i <= department.data.result.length; i++) {
  //   departmentName.push[i];
  // }

  // let countryNum = [];
  // department.data.result.forEach((element) => {
  //   countryNum.push(element.DEPT_ID);
  // });
  // let countryName = [];
  // department.data.result.forEach((element) => {
  //   countryName.push(element.DEPT_NAME);
  // });

  return (
    <Box
      sx={{
        padding: { xs: "0px 20px", md: "0px 20px 0px 250px" },
        position: "relative",
        overflow: "hidden",
        minHeight: "calc(100vh - 65px)",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          botttom: "0 !important",
          right: -150,
          display: "flex",
          transform: "rotateZ(30deg)",
          opacity: 0.3,
          zIndex: 0,
        }}
      >
        <Box
          sx={{
            width: "50px",
            height: "1500px",
            backgroundColor: SECONDARY_COLOR,
            boxShadow: "-5px -5px 10px rgba(0,0,0,0.5)",
          }}
        />
        <Box
          sx={{
            width: "200px",
            height: "1500px",
            backgroundColor: PRIMARY_COLOR,
          }}
        />
      </Box>
      <Box
        sx={{
          position: "absolute",
          top: -400,
          left: { xs: -400, md: -150 },
          display: "flex",
          transform: "rotateZ(45deg)",
          opacity: 0.3,
          zIndex: 0,
        }}
      >
        <Box
          sx={{
            width: "300px",
            height: "1500px",
            backgroundColor: PRIMARY_COLOR,
          }}
        />
        <Box
          sx={{
            width: "100px",
            height: "1500px",
            backgroundColor: SECONDARY_COLOR,
            boxShadow: "5px 5px 10px rgba(0,0,0,0.5)",
          }}
        />
      </Box>
      <Box position="relative" zIndex={4}>
        <Box className={classes.welcomeBox}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: "700",
              fontFamily: "Montserrat",
            }}
            className={classes.welcomeText}
          >
            Welcome{" "}
            {!_.isNil(user.data)
              ? user.data.result.length > 0
                ? user.data.result[0].ACCOUNT_USERNAME
                : user
              : null}
          </Typography>
        </Box>
        <Grid
          container
          display="flex"
          justifyContent="center"
          alignItems="center"
          zIndex={3}
        >
          {!_.isNil(user.data) ? (
            user.data.result.length > 0 ? (
              user.data.result[0].ACCOUNT_TYPE === 1 ? (
                <Grid Item xs={12} sm={6} md={6} padding="10px">
                  <Box className={classes.mainbox}>
                    <Box flexGrow={1}>
                      <h3>Number of Account</h3>
                      <h1>
                        {!_.isNil(account.data)
                          ? account.data.result.length
                          : 0}
                      </h1>
                    </Box>
                    <Box flexGrow={1}>
                      <img
                        src="https://img.icons8.com/external-flaticons-flat-flat-icons/64/000000/external-department-university-flaticons-flat-flat-icons-3.png"
                        style={{ transform: "scale(1.5)" }}
                      />
                    </Box>
                  </Box>
                </Grid>
              ) : null
            ) : null
          ) : null}
          {/* {!_.isNil(user.data) ? (
          user.data.result.length > 0 ? (
            user.data.result[0].ACCOUNT_TYPE == 1 ? (
              <Grid Item xs={12} sm={12} md={4}>
                <Box
                  sx={{
                    maxWidth: { sm: "96%", md: "96%", lg: "80%" },
                  }}
                  className={classes.mainbox2}
                >
                  <h3>Number of Department</h3>
                  <h1>
                    {!_.isNil(department.data)
                      ? department.data.result.length
                      : 0}
                  </h1>
                </Box>
              </Grid>
            ) : null
          ) : null
        ) : null} */}
          <Grid Item xs={12} sm={6} md={6} padding="10px">
            <Box className={classes.mainbox}>
              <Box flexGrow={1}>
                <h3>Number of File Upload</h3>
                <h1>
                  {!_.isNil(sendfile.data) ? sendfile.data.result.length : 0}
                </h1>
              </Box>
              <Box flexGrow={1}>
                <img
                  src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/000000/external-archive-literature-flaticons-lineal-color-flat-icons-3.png"
                  style={{ transform: "scale(1.5)" }}
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
        {/* {!_.isNil(user.data) ? (
        user.data.result.length > 0 ? (
          user.data.result[0].ACCOUNT_TYPE == 1 ? (
            <Box
              sx={{
                marginLeft: { sm: "10px", md: "10px", lg: "250px" },
                maringRight: { sm: "10px", md: "10px" },
                width: { md: "100%", lg: "80%" },
              }}
              className={classes.welcomeBox}
            >
              <Typography
                sx={{
                  fontWeight: "700",
                  fontFamily: "Anton",
                  fontSize: "30px",
                }}
                className={classes.countempTitle}
              >
                Number of employees in each department
              </Typography>
              <CustomTooltip>
                <ExampleChart />
              </CustomTooltip>
            </Box>
          ) : null
        ) : null
      ) : null} */}
      </Box>
    </Box>
  );
}

export default AdminDashboard;
