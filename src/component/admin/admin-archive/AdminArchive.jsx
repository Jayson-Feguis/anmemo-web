import React, { useEffect, useState } from "react";

import { Box, Typography, Grid } from "@mui/material";
import "antd/dist/antd.css";
import "antd/dist/antd.min.css";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { IoIosAdd } from "react-icons/io";

import {
  actions,
  updateAccountAction,
} from "../../../redux/action/account/actions";
import useStyles from "./style";
import ROUTES from "../../../routes/Routes";

function AdminArchive(props) {
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
    <>
      {" "}
      <Box
        sx={{
          marginLeft: { sm: "10px", md: "10px", lg: "20px" },
          maringRight: { sm: "10px", md: "10px" },
          width: { md: "100%", lg: "96%" },
        }}
        className={classes.welcomeBox}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: "700",
            fontFamily: "Anton",
          }}
          className={classes.welcomeText}
        >
          Archived
        </Typography>
      </Box>
      <Grid
        container
        columnSpacing={{ lg: -2 }}
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{
          marginLeft: { sm: "10px", md: "10px", lg: "20px" },
          maringRight: { sm: "10px", md: "10px" },
        }}
      >
        {!_.isNil(user.data) ? (
          user.data.result.length > 0 ? (
            user.data.result[0].ACCOUNT_TYPE == 1 ? (
              <Grid Item xs={12} sm={12} md={4}>
                <a href={ROUTES.ARCHIVE_ACCOUNT}>
                  <Box
                    sx={{
                      maxWidth: { sm: "96%", md: "96%", lg: "80%" },
                    }}
                    className={classes.mainbox}
                  >
                    <h3>Number of Account</h3>
                    <h1>
                      {!_.isNil(account.data) ? account.data.result.length : 0}
                    </h1>
                  </Box>
                </a>
              </Grid>
            ) : null
          ) : null
        ) : null}
        {!_.isNil(user.data) ? (
          user.data.result.length > 0 ? (
            user.data.result[0].ACCOUNT_TYPE == 1 ? (
              <Grid Item xs={12} sm={12} md={4}>
                <a href={ROUTES.ARCHIVE_DEPARTMENT}>
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
                </a>
              </Grid>
            ) : null
          ) : null
        ) : null}

        <Grid Item xs={12} sm={12} md={4}>
          <Box
            sx={{
              maxWidth: { sm: "96%", md: "96%", lg: "80%" },
            }}
            className={classes.mainbox3}
          >
            <h3>Number of File Upload</h3>
            <h1>{!_.isNil(sendfile.data) ? sendfile.data.result.length : 0}</h1>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default AdminArchive;
