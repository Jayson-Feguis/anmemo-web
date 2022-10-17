import React from "react";
import { AdminNavBar } from "../../../component/Component";
import { Box } from "@mui/material";
import SunEditor, { buttonList, toolbar } from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";

function Editor(props) {
  const { mobileOpen, handleDrawerToggle, handleDrawerClose } = props;
  const handleChange = (content) => {
    console.log(content); //Get Content Inside Editor
  };

  function handleImageUploadError(errorMessage, result) {
    alert(errorMessage, result);
  }

  return (
    <>
      <AdminNavBar />
      <Box
        padding={{ xs: "10px", md: "0px 0px 0px 250px" }}
        height="calc(100vh-65px)"
      >
        <h1>Generate File</h1>
        <SunEditor
          height="calc(100vh - 150px)"
          setOptions={{
            height: "100%",
            buttonList: buttonList.complex,
          }}
          placeholder="Please type here..."
          onChange={handleChange}
          setDefaultStyle="font-family: cursive; font-size: 10px;  inline-block; text-align: left"
          onImageUploadError={handleImageUploadError}
        />
      </Box>
    </>
  );
}

export default Editor;
