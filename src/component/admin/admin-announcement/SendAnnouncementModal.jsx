import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Spin } from "antd";
import "antd/dist/antd.min.css";
import {
  Autocomplete,
  TextField,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import {
  actions as ACTSENDFILE,
  sendFileAction,
} from "../../../redux/action/send-file/actions";
import io from "socket.io-client";
import PropTypes from "prop-types";
import { HEADER_COLOR } from "../../../utils/constant";

const socket = io.connect(process.env.REACT_APP_SOCKET_SERVER);
function SendAnnouncementModal(props) {
  const {
    departments,
    visibleSend,
    confirmLoading,
    setConfirmLoading,
    handleOkSend,
    handleCancelSend,
    user,
    document,
  } = props;
  const dispatch = useDispatch();
  const accounts = useSelector((state) => state.account);
  const [receiver, setReceiver] = useState(null);
  const [urgencyLevel, setUrgencyLevel] = useState(1);
  const [announcement, setAnnouncement] = useState({
    title: null,
    content: null,
  });

  const [isClick, setClick] = useState(false);

  const onFinish = (values) => {
    setConfirmLoading(true);
    setClick(true);
    socket.emit("send_announcement", { message: "get_facultyfiles" });
    socket.emit("send_announcement", { message: "get_notification" });
    let accountList = accounts.data.result;
    let receiverList = [];

    if (!_.isNil(receiver)) {
      try {
        accountList.map((value) =>
          receiver.map((item) =>
            value?.DEPT_ID === item?.DEPT_ID &&
            value?.ACCOUNT_ID !== user?.ACCOUNT_ID
              ? receiverList.push(value)
              : null
          )
        );
      } catch (error) {
        console.log(error);
      }
    }

    dispatch(
      sendFileAction(ACTSENDFILE.SEND_FILE_REQUEST, {
        sender_id: user.ACCOUNT_ID,
        sender_name: user.ACCOUNT_FIRSTNAME + " " + user.ACCOUNT_LASTNAME,
        document_id: document.document_id,
        document_name: document.document_name,
        receiver: receiverList,
        category_name: "Announcement",
        urgencyLevel,
        account_id: !_.isNil(user.data) ? user.data.result[0].ACCOUNT_ID : null,
      })
    );

    setTimeout(() => {
      handleCancelSend();
      setConfirmLoading(false);
      setReceiver(null);
    }, 2000);
  };
  useEffect(() => {
    if (isClick) {
      alert("Sent successfully");
    }
  }, [isClick]);
  const handleChange = (event, newAlignment) => {
    setUrgencyLevel(newAlignment);
  };

  return (
    <Modal
      title="Send Announcement"
      visible={visibleSend}
      onOk={handleOkSend}
      confirmLoading={confirmLoading}
      onCancel={handleCancelSend}
      footer={[
        <Button
          form="createAnnouncement"
          disabled={confirmLoading}
          onClick={handleCancelSend}
        >
          Cancel
        </Button>,
        <Button
          form="createAnnouncement"
          type="primary"
          htmlType="submit"
          disabled={
            _.isNil(receiver)
              ? true
              : receiver.length > 0
              ? false
              : true || confirmLoading
          }
        >
          {confirmLoading ? <Spin /> : "Post"}
        </Button>,
      ]}
    >
      <Form
        name="createAnnouncement"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
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
              value={1}
            >
              Regular
            </ToggleButton>
            <ToggleButton
              key={2}
              sx={{ fontSize: "12px !important", textTransform: "none" }}
              value={2}
            >
              Priority
            </ToggleButton>
            <ToggleButton
              key={3}
              sx={{ fontSize: "12px !important", textTransform: "none" }}
              value={3}
            >
              Urgent
            </ToggleButton>
          </ToggleButtonGroup>
        </Form.Item>
        <Form.Item>
          <Autocomplete
            multiple
            id="tags-standard"
            options={departments}
            onChange={(event, value) =>
              !_.isNil(value) ? setReceiver(value) : ""
            }
            getOptionLabel={(option) =>
              "(" + option.DEPT_ID + ") : " + option.DEPT_NAME
            }
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                label="Search Department"
                placeholder="Ex: (ID) : Department Name"
              />
            )}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}

SendAnnouncementModal.propTypes = {
  departmentList: PropTypes.array,
  visibleSend: PropTypes.bool,
  confirmLoading: PropTypes.bool,
  setConfirmLoading: PropTypes.func,
  handleOkSend: PropTypes.func,
  handleCancelSend: PropTypes.func,
};

export default SendAnnouncementModal;
