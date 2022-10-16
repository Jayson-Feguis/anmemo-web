import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Input, Spin, message, Upload } from "antd";
import {
  ToggleButtonGroup,
  ToggleButton,
  Box,
  Typography,
} from "@mui/material";
import "antd/dist/antd.min.css";
import {
  actions,
  getDocumentAction,
  sendFileAction,
  uploadFileAction,
} from "../../../redux/action/send-file/actions";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import io from "socket.io-client";
import { UploadOutlined, InboxOutlined } from "@ant-design/icons";
import { HEADER_COLOR } from "../../../utils/constant";

const socket = io.connect(process.env.REACT_APP_SOCKET_SERVER);

function UploadModal({
  visibleUploadModal,
  confirmLoading,
  setConfirmLoading,
  handleOkUploadModal,
  handleCancelUploadModal,
}) {
  const [categoryName, setCategoryName] = useState("Document");
  const dispatch = useDispatch();
  const documents = useSelector((state) => state.sendfile);
  const user = useSelector((state) => state.user);
  const [isClick, setClick] = useState(false);
  const [files, setFiles] = useState([]);
  const [documentList, setDocumentList] = useState();

  const onFinish = (values) => {
    socket.emit("send_document", { message: "get_document" });
    socket.emit("upload_document", { message: "get_document" });

    setClick(true);

    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("files", files[i]);
    }
    data.append("accountid", user.data.result[0].ACCOUNT_ID);
    data.append("categoryname", categoryName);
    dispatch(uploadFileAction(actions.UPLOAD_FILE_REQUEST, data));

    setTimeout(() => {
      handleCancelUploadModal();
      setConfirmLoading(false);
    }, 1000);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleChangeCategoryName = (event, newAlignment) => {
    setCategoryName(newAlignment);
  };

  const onInputChange = (e) => {
    let isTooBig = false;
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

  useEffect(() => {
    if (_.isEqual(documents.success_msg, "FETCHED DOCUMENT!") && isClick) {
      message.success("File upload successfully");
    }
  }, [files, documents, user]);

  return (
    <Modal
      title="Upload File"
      visible={visibleUploadModal}
      confirmLoading={confirmLoading}
      onCancel={handleCancelUploadModal}
      footer={[
        <Button disabled={confirmLoading} onClick={handleCancelUploadModal}>
          Cancel
        </Button>,
        <Button
          form="sendFile"
          disabled={
            _.isNil(files)
              ? true
              : files.length > 0
              ? false
              : true || confirmLoading
          }
          type="primary"
          key="submit"
          htmlType="submit"
        >
          {confirmLoading ? <Spin /> : "Upload"}
        </Button>,
      ]}
    >
      <Form
        name="sendFile"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item label="Type of category">
          <ToggleButtonGroup
            color="primary"
            value={categoryName}
            exclusive
            onChange={handleChangeCategoryName}
            sx={{
              ".Mui-selected": {
                background: `${HEADER_COLOR} !important`,
                color: "white !important",
                "&:hover": {
                  background: `${HEADER_COLOR} !important`,
                  color: "white !important",
                },
              },
            }}
          >
            <ToggleButton
              key={1}
              sx={{ fontSize: "12px !important", textTransform: "none" }}
              value="Document"
            >
              Document
            </ToggleButton>
            <ToggleButton
              key={2}
              sx={{ fontSize: "12px !important", textTransform: "none" }}
              value="Memorandum"
            >
              Memorandum
            </ToggleButton>
          </ToggleButtonGroup>
        </Form.Item>
        <Form.Item label="Insert your file here">
          <Box
            className="form-group files"
            style={{
              display: "flex",
              justifyContent: "start",
              alignItem: "center",
              flexDirection: "row",
            }}
          >
            <input
              type="file"
              onChange={onInputChange}
              className="form-control"
              accept=".xlsx, .xls, .doc, .docx, .ppt, .pptx, .txt, .pdf, image/*"
              multiple
            />
            {_.isNil(files) ? (
              true
            ) : files.length > 0 ? (
              <Button onClick={clearUpload}>Clear</Button>
            ) : null}
          </Box>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default UploadModal;
