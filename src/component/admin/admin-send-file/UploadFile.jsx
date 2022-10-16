import React, { useState } from "react";
import { UploadOutlined, InboxOutlined } from "@ant-design/icons";
import { Button, Upload, message } from "antd";
import "antd/dist/antd.min.css";
import { Box } from "@mui/material";
import { useEffect } from "react";
import io from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import {
  actions,
  uploadFileAction,
} from "../../../redux/action/send-file/actions";
import _ from "lodash";

const socket = io.connect(process.env.REACT_APP_SOCKET_SERVER);

function UploadFile(props) {
  const dispatch = useDispatch();
  const documents = useSelector((state) => state.sendfile);
  const user = useSelector((state) => state.user);
  const [isClick, setClick] = useState(false);
  const [files, setFiles] = useState([]);
  const [documentList, setDocumentList] = useState();

  const onInputChange = (e) => {
    const isTooBig = false;
    for (let i = 0; i < e.target.files.length; i++) {
      if (e.target.files[i].size > 5000000) {
        alert(
          `${e.target.files[i].name} is too big. upload file not more than 5mb`
        );
        e.target.value = null;
        isTooBig = true;
      }
    }

    if (!isTooBig) {
      setFiles(e.target.files);
    }
  };

  const clearUpload = () => {
    setFiles(null);
  };

  const onSubmit = (e) => {
    setClick(true);
    e.preventDefault();
    const data = new FormData();

    for (let i = 0; i < files.length; i++) {
      data.append("files", files[i]);
    }

    data.append("accountid", user.data.result[0].ACCOUNT_ID);

    //dispatch

    dispatch(uploadFileAction(actions.UPLOAD_FILE_REQUEST, data));

    socket.emit("upload_document", { message: "get_document" });
  };

  useEffect(() => {
    if (_.isEqual(documents.success_msg, "FETCHED DOCUMENT!") && isClick) {
      message.success("File upload successfully");
    }
  }, [files, documents, user]);

  return (
    <Box
      width="100%"
      display="flex"
      alignItems="center"
      justifyContent="start"
      padding="10px"
    >
      <form
        method="post"
        onSubmit={onSubmit}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItem: "center",
        }}
      >
        <div
          className="form-group files"
          style={{
            display: "flex",
            justifyContent: "start",
            alignItem: "start",
            flexDirection: "column",
          }}
        >
          <label style={{ textAlign: "start" }}>Upload Your File </label>
          <input
            type="file"
            onChange={onInputChange}
            className="form-control"
            accept=".xlsx, .xls, .doc, .docx, .ppt, .pptx, .txt, .pdf, image/*"
            multiple
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItem: "center",
            padding: "10px",
          }}
        >
          <Button
            type="primary"
            htmlType="submit"
            disabled={_.isNil(files) ? true : files.length > 0 ? false : true}
          >
            Upload
          </Button>
          {_.isNil(files) ? (
            true
          ) : files.length > 0 ? (
            <Button onClick={clearUpload}>Clear</Button>
          ) : null}
        </div>
      </form>
    </Box>
  );
}

export default UploadFile;
