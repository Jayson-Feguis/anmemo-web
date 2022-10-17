import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Spin, Radio } from "antd";
import {
  Autocomplete,
  TextField,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import "antd/dist/antd.min.css";
import {
  actions,
  sendFileAction,
} from "../../../redux/action/send-file/actions";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import io from "socket.io-client";
import { HEADER_COLOR } from "../../../utils/constant";

const socket = io.connect(process.env.REACT_APP_SOCKET_SERVER);

function SendFile(props) {
  const dispatch = useDispatch();
  const {
    documentID,
    documentName,
    visibleSendFile,
    handleOkSendFile,
    handleCancelSendFile,
    confirmLoading,
    setConfirmLoading,
    accounts,
    senderID,
    senderName,
  } = props;
  const [accountList, setAccountList] = useState(accounts);
  const [receiver, setReceiver] = useState(null);
  const [urgencyLevel, setUrgencyLevel] = useState(1);
  const [categoryName, setCategoryName] = useState("Document");
  const user = useSelector((state) => state.user);
  const [isClick, setClick] = useState(false);
  const [sendType, setSendType] = useState(1);
  let formData = new FormData();

  const onFinish = (values) => {
    setClick(true);
    socket.emit("send_document", { message: "get_document" });
    socket.emit("send_document", { message: "get_notification" });
    socket.emit("send_document", { message: "get_facultyfiles" });
    dispatch(
      sendFileAction(actions.SEND_FILE_REQUEST, {
        sender_id: senderID,
        sender_name: senderName,
        document_id: documentID,
        document_name: documentName,
        category_name: categoryName,
        account_id: !_.isNil(user.data) ? user.data.result[0].ACCOUNT_ID : null,
        receiver: receiver,
        urgencyLevel,
      })
    );
    setConfirmLoading(true);

    setTimeout(() => {
      handleCancelSendFile();
      setConfirmLoading(false);
    }, 5000);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleChange = (event, newAlignment) => {
    setUrgencyLevel(newAlignment);
  };

  const handleChangeCategoryName = (event, newAlignment) => {
    setCategoryName(newAlignment);
  };

  useEffect(() => {
    if (isClick) {
      alert("Send successfully");
    }
  }, [isClick]);

  useEffect(() => {
    console.log(sendType);
    if (sendType === 2) {
      const newReceiver = accountList?.filter(
        (account) =>
          account?.ACCOUNT_TYPE === 3 &&
          account?.ACCOUNT_ID !== user.data?.result[0]?.ACCOUNT_ID
      );
      setReceiver(newReceiver);
    } else {
      setReceiver(null);
    }
  }, [sendType]);

  return (
    <Modal
      title="Send File"
      visible={visibleSendFile}
      confirmLoading={confirmLoading}
      onCancel={handleCancelSendFile}
      footer={[
        <Button disabled={confirmLoading} onClick={handleCancelSendFile}>
          Cancel
        </Button>,
        <Button
          form="sendFile"
          type="primary"
          key="submit"
          htmlType="submit"
          disabled={
            _.isNil(receiver)
              ? true
              : receiver.length > 0
              ? false
              : true || confirmLoading
          }
        >
          {confirmLoading ? <Spin /> : "Send"}
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
        <Form.Item label="Level of urgency">
          <ToggleButtonGroup
            color="primary"
            value={urgencyLevel}
            exclusive
            onChange={handleChange}
            sx={{
              ".Mui-selected": {
                background: "lightblue",
              },
            }}
          >
            <ToggleButton
              key={1}
              sx={{ fontSize: "12px !important" }}
              value={1}
            >
              Regular
            </ToggleButton>
            <ToggleButton
              key={2}
              sx={{ fontSize: "12px !important" }}
              value={2}
            >
              Priority
            </ToggleButton>
            <ToggleButton
              key={3}
              sx={{ fontSize: "12px !important" }}
              value={3}
            >
              Urgent
            </ToggleButton>
          </ToggleButtonGroup>
        </Form.Item>
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
            {/* <ToggleButton
              key={2}
              sx={{ fontSize: "12px !important" }}
              value="Memorandum"
            >
              Memorandum
            </ToggleButton> */}
          </ToggleButtonGroup>
        </Form.Item>
        <Form.Item label="Send Type">
          <Radio.Group
            defaultValue={sendType}
            onChange={(e) => setSendType(e.target.value)}
            style={{ width: "100%" }}
          >
            <Radio value={1}>Custom send</Radio>
            <Radio value={2}>Send to all</Radio>
          </Radio.Group>
        </Form.Item>
        {sendType === 1 && (
          <Form.Item>
            <Autocomplete
              multiple
              id="tags-standard"
              options={accountList?.filter(
                (account) =>
                  account?.ACCOUNT_TYPE === 3 &&
                  account?.ACCOUNT_ID !== user.data?.result[0]?.ACCOUNT_ID
              )}
              onChange={(event, value) => setReceiver(value)}
              getOptionLabel={(option) =>
                "(" +
                option.ACCOUNT_ID +
                ") : " +
                option.ACCOUNT_FIRSTNAME +
                " " +
                option.ACCOUNT_LASTNAME
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  label="Search Names"
                  placeholder="Ex: (ID) : Juan Dela Cruz"
                />
              )}
            />
          </Form.Item>
        )}
      </Form>
    </Modal>
  );
}

export default SendFile;
