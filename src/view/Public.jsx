import React from "react";
import { Box } from "@mui/material";
import PropTypes from "prop-types";
import { Footer } from "../component/Component";
function Public(props) {
  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        {props.children}
      </Box>
      <Box>
        <Footer />
      </Box>
    </>
  );
}

Public.propTypes = {
  children: PropTypes.element,
};

export default Public;
