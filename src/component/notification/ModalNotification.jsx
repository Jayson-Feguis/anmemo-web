import React from "react";
import { Button, Modal } from "antd";
import { Typography, Box } from "@mui/material";
import "antd/dist/antd.min.css";
import _ from "lodash";
import moment from "moment";
import { useNavigate } from "react-router-dom";

function ModalNotification(props) {
  const { visible, setVisible, notificationModalContent } = props;
  const navigate = useNavigate();
  const handleOpenFile = (url) => navigate(url);

  return (
    <Modal
      title={
        !_.isNil(notificationModalContent)
          ? notificationModalContent.NOTIF_TITLE
          : null
      }
      visible={visible}
      onCancel={() => setVisible(false)}
      footer={[
        <Button type="primary" onClick={() => setVisible(false)}>
          OK
        </Button>,
      ]}
    >
      <Typography sx={{ color: "gray", fontSize: "14px" }}>
        {!_.isNil(notificationModalContent)
          ? "From: " +
            notificationModalContent.ACCOUNT_FIRSTNAME +
            " " +
            notificationModalContent.ACCOUNT_LASTNAME
          : null}
      </Typography>
      <br />
      <Box
        sx={{ whiteSpace: "pre-wrap" }}
        dangerouslySetInnerHTML={{
          __html: !_.isNil(notificationModalContent)
            ? notificationModalContent.NOTIF_CONTENT
            : null,
        }}
      />
      <br />
      <br />
      <Typography sx={{ color: "gray", fontSize: "12px", fontStyle: "italic" }}>
        {!_.isNil(notificationModalContent)
          ? moment(notificationModalContent.NOTIF_DATETIME).format(
              "MMMM DD, YYYY hh:mm A"
            )
          : null}
      </Typography>
    </Modal>
  );
}

export default ModalNotification;
