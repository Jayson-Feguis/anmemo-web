import React, { useState } from "react";
import { Button, Modal } from "antd";
import { Box, Typography, Chip } from "@mui/material";
import "antd/dist/antd.min.css";
import {
  actions,
  deleteDocumentReceiversAction,
} from "../../../redux/action/document-receivers/actions";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import io from "socket.io-client";
import { IoClose } from "react-icons/io5";

const socket = io.connect(process.env.REACT_APP_SOCKET_SERVER);

function Receivers(props) {
  const {
    documentID,
    documentName,
    visibleReceivers,
    handleOkReceivers,
    handleCancelReceivers,
    confirmLoading,
    documentReceivers,
  } = props;

  const dispatch = useDispatch();
  const handleDelete = (send_id, document_id, category_name) => {
    socket.emit("delete_receiver", { message: "get_facultyfiles" });
    dispatch(
      deleteDocumentReceiversAction(actions.DELETE_DOCUMENT_RECEIVERS_REQUEST, {
        send_id,
        document_id,
        category_name,
      })
    );
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
        File: <b>{documentName}</b>
      </Typography>
      <br />
      <Box display="flex" gap={1} flexWrap="wrap">
        {!_.isNil(documentReceivers) ? (
          documentReceivers.map((item, index) => (
            <Chip
              key={index}
              label={item.RECEIVER_NAME}
              variant="outlined"
              onDelete={() =>
                handleDelete(item.SEND_ID, item.DOCUMENT_ID, item.CATEGORY_NAME)
              }
            />
          ))
        ) : (
          <Typography>There isn't anyone who has this file.</Typography>
        )}
      </Box>
    </Modal>
  );
}

export default Receivers;
