import React, { useState } from "react";
import { Button, Modal, Form, Input, Spin } from "antd";
import "antd/dist/antd.min.css";
import { useDispatch } from "react-redux";
import _ from "lodash";
import {
  actions,
  addAnnouncementAction,
} from "../../../redux/action/announcement/actions";
import io from "socket.io-client";
import PropTypes from "prop-types";
import SunEditor, { buttonList, toolbar } from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";

function CreateAnnouncementModal(props) {
  const {
    departmentList,
    visibleAnnouncement,
    confirmLoading,
    setConfirmLoading,
    handleOkAnnouncement,
    handleCancelAnnouncement,
    accountID,
  } = props;
  const dispatch = useDispatch();
  const [announcement, setAnnouncement] = useState({
    title: null,
    content: null,
  });

  const onFinish = (values) => {
    setConfirmLoading(true);
    dispatch(
      addAnnouncementAction(actions.ADD_ANNOUNCEMENT_REQUEST, {
        account_id: accountID,
        announcement_title: values.title,
        announcement_content: values.content,
      })
    );
    setTimeout(() => {
      handleCancelAnnouncement();
      setConfirmLoading(false);
    }, 2000);
  };

  const handleChange = (content) => {
    console.log(content); //Get Content Inside Editor
    setAnnouncement({ ...announcement, content: content });
  };

  return (
    <Modal
      title="Create Announcement"
      visible={visibleAnnouncement}
      onOk={handleOkAnnouncement}
      confirmLoading={confirmLoading}
      onCancel={handleCancelAnnouncement}
      width="min(100%, 1000px)"
      footer={[
        <Button
          form="createAnnouncement"
          disabled={confirmLoading}
          onClick={handleCancelAnnouncement}
        >
          Cancel
        </Button>,
        <Button
          form="createAnnouncement"
          disabled={confirmLoading}
          type="primary"
          htmlType="submit"
        >
          {confirmLoading ? <Spin /> : "Create"}
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
        <Form.Item
          label="Title"
          name="title"
          rules={[
            {
              required: true,
              message: "Please input announcement title",
            },
          ]}
        >
          <Input placeholder="Ex: My Announcement Title" />
        </Form.Item>
        <Form.Item
          label="Content"
          name="content"
          rules={[
            {
              required: true,
              message: "Please input announcement content",
            },
          ]}
        >
          <SunEditor
            height="100%"
            setOptions={{
              height: "100%",
              buttonList: buttonList.complex,
            }}
            onChange={handleChange}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}

CreateAnnouncementModal.propTypes = {
  departmentList: PropTypes.array,
  visibleAnnouncement: PropTypes.bool,
  confirmLoading: PropTypes.bool,
  setConfirmLoading: PropTypes.func,
  handleOkAnnouncement: PropTypes.func,
  handleCancelAnnouncement: PropTypes.func,
};

export default CreateAnnouncementModal;
