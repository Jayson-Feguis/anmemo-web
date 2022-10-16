import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import _ from "lodash";
import { useNavigate } from "react-router-dom";
import Routes from "../routes/Routes";
import { setToken } from "../request/axios_instance";
import { actions, logoutAction } from "../redux/action/user/actions";
import { Box } from "@mui/material";
import { DIRTY_WHITE_COLOR } from "../utils/constant";
import { Footer } from "../component/Component";

function Private(props) {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (_.isNil(user.data)) {
      window.location = Routes.LOGIN;
    } else {
      setToken(user.data.token);

      if (user.data.result[0].ACCOUNT_TYPE === 1) {
        if (window.location.pathname.slice(0, 6) !== "/admin") {
          handleLogout();
        }
      } else if (user.data.result[0].ACCOUNT_TYPE === 2) {
        if (window.location.pathname.slice(0, 10) !== "/secretary") {
          handleLogout();
        }
      } else if (
        user.data.result[0].ACCOUNT_TYPE === 3 ||
        user.data.result[0].ACCOUNT_TYPE === 5
      ) {
        if (window.location.pathname.slice(0, 8) !== "/faculty") {
          handleLogout();
        }
      } else if (user.data.result[0].ACCOUNT_TYPE === 4) {
        if (window.location.pathname.slice(0, 5) !== "/dean") {
          handleLogout();
        }
      }
    }
  });

  const handleLogout = () => {
    alert("You have no permission to access other page!");
    dispatch(logoutAction(actions.LOGOUT_REQUEST));
  };

  return (
    <Box
      sx={{
        backgroundImage: "url(/images/main-background1.jpg)",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        height: "calc(100vh-65px)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {props.children}
      <Footer />
    </Box>
  );
}

Private.propTypes = {
  children: PropTypes.element,
};

export default Private;
