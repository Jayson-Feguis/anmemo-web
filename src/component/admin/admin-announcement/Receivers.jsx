import React, { useState } from "react";
import { Button, Modal, Form, Input, Spin } from "antd";
import { Box, Chip, TextField, Typography } from "@mui/material";
import "antd/dist/antd.min.css";
import _ from "lodash";
import { useDispatch } from "react-redux";
import {
  actions,
  deleteAnnouncementReceiversAction,
} from "../../../redux/action/announcement-receivers/actions";
import io from "socket.io-client";
const socket = io.connect(process.env.REACT_APP_SOCKET_SERVER);
function Receivers(props) {
  const {
    visibleReceivers,
    confirmLoading,
    setConfirmLoading,
    handleOkReceivers,
    handleCancelReceivers,
    document,
    announcementReceivers,
  } = props;

  const dispatch = useDispatch();

  const handleDelete = (send_id, announcement_id) => {
    dispatch(
      deleteAnnouncementReceiversAction(
        actions.DELETE_ANNOUNCEMENT_RECEIVERS_REQUEST,
        {
          send_id,
          announcement_id,
        }
      )
    );
    socket.emit("send_announcement", { message: "get_facultyfiles" });
  };

  return (
    <Modal
      title="Receivers of this file"
      visible={visibleReceivers}
      confirmLoading={confirmLoading}
      onCancel={handleCancelReceivers}
      footer={[
        <Button type="primary" onClick={handleCancelReceivers}>
          OK
        </Button>,
      ]}
    >
      <Typography sx={{ fontSize: "12px" }}>
        Announcement Title: <b>{document.document_name}</b>
      </Typography>
      <br />
      <Box display="flex" gap={1} flexWrap="wrap">
        {!_.isNil(announcementReceivers) ? (
          announcementReceivers.map((item, index) => (
            <Chip
              key={index}
              label={item.RECEIVER_NAME}
              variant="outlined"
              onDelete={() => handleDelete(item.SEND_ID, item.DOCUMENT_ID)}
            />
          ))
        ) : (
          <Typography>There isn't anyone who has this announcement.</Typography>
        )}
      </Box>
    </Modal>
  );
}

export default Receivers;
