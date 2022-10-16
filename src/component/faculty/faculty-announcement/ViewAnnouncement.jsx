import React from "react";
import { Modal, Button } from "antd";
import "antd/dist/antd.min.css";
import io from "socket.io-client";
import { Box, Typography } from "@mui/material";

const socket = io.connect(process.env.REACT_APP_SOCKET_SERVER);

function ViewAnnouncement(props) {
  const { visible, handleCancel, title, content } = props;

  return (
    <Modal
      title="View Announcement"
      visible={visible}
      onCancel={handleCancel}
      footer={[
        <Button type="primary" onClick={handleCancel}>
          OK
        </Button>,
      ]}
    >
      <Typography sx={{ textAlign: "center", fontWeight: "bold" }}>
        {title}
      </Typography>
      <Box
        sx={{
          whiteSpace: "pre-wrap",
          textAlign: "left",
        }}
        dangerouslySetInnerHTML={{
          __html: content,
        }}
      />
    </Modal>
  );
}

export default ViewAnnouncement;
