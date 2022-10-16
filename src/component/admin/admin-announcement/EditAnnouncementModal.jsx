import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Input, Spin } from "antd";
import "antd/dist/antd.min.css";
import { useDispatch } from "react-redux";
import {
  actions,
  updateAnnouncementAction,
} from "../../../redux/action/announcement/actions";
import PropTypes from "prop-types";
import SunEditor, { buttonList, toolbar } from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";

function EditAnnouncementModal(props) {
  const {
    document,
    setDocument,
    visibleEdit,
    confirmLoading,
    setConfirmLoading,
    handleOkEdit,
    handleCancelEdit,
    accountID,
  } = props;
  const dispatch = useDispatch();
  const [isClick, setClick] = useState(false);
  const submitEdit = (values) => {
    setConfirmLoading(true);
    setClick(true);
    dispatch(
      updateAnnouncementAction(actions.UPDATE_ANNOUNCEMENT_REQUEST, {
        account_id: accountID,
        announcement_id: document.document_id,
        announcement_title: document.document_name,
        announcement_content: document.document_content,
      })
    );
    setTimeout(() => {
      handleCancelEdit();
      setConfirmLoading(false);
    }, 2000);
  };
  useEffect(() => {
    if (isClick) {
      alert("Updated successfully");
    }
  }, [isClick]);
  const handleChange = (content) => {
    console.log(content.length); //Get Content Inside Editor
    if (content.length < 4800) {
      setDocument({
        ...document,
        document_content: content,
      });
    } else {
      alert("You have reached the maximum length of content.");
    }
  };

  return (
    <Modal
      title="Edit Announcement"
      visible={visibleEdit}
      onOk={handleOkEdit}
      confirmLoading={confirmLoading}
      onCancel={handleCancelEdit}
      footer={[
        <Button
          form="editAnnouncement"
          disabled={confirmLoading}
          onClick={handleCancelEdit}
        >
          Cancel
        </Button>,
        <Button
          form="editAnnouncement"
          disabled={confirmLoading}
          type="primary"
          onClick={submitEdit}
        >
          {confirmLoading ? <Spin /> : "Save"}
        </Button>,
      ]}
    >
      <Form
        name="editAnnouncement"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        autoComplete="off"
      >
        <Form.Item label="Title">
          <Input
            placeholder="Ex: My Announcement Title"
            onChange={(e) =>
              setDocument({
                ...document,
                document_name: e.target.value,
              })
            }
            value={document.document_name}
          />
        </Form.Item>
        <Form.Item label="Content">
          <SunEditor
            height="100%"
            setOptions={{
              height: "100%",
              buttonList: buttonList.complex,
            }}
            defaultValue={document.document_content}
            onChange={handleChange}
          />
          {/* <Input.TextArea
            rows={5}
            placeholder="Ex: This is my content"
            onChange={(e) =>
              setDocument({
                ...document,
                document_content: e.target.value,
              })
            }
            value={document.document_content}
          /> */}
        </Form.Item>
      </Form>
    </Modal>
  );
}

EditAnnouncementModal.propTypes = {
  document: PropTypes.object,
  setDocument: PropTypes.func,
  visibleEdit: PropTypes.bool,
  confirmLoading: PropTypes.bool,
  setConfirmLoading: PropTypes.func,
  handleOkEdit: PropTypes.func,
  handleCancelEdit: PropTypes.func,
  accountID: PropTypes.any,
};

export default EditAnnouncementModal;
